import {DatePipe} from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  HostListener,
  OnDestroy, AfterViewChecked
} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import queryString from 'query-string';
import {AsyncSubject, Observable, Subject, takeUntil, zip} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {ColDef, RowGroupingDisplayType} from 'ag-grid-community';
import {PurchaseOrderService} from 'src/app/services/purcher-order.service';
import {getNumericCellEditor} from 'src/app/common/function/function-common';
import numeral from 'numeral';
import {ProductManagerService} from 'src/app/services/productManager.serivce';
import {financialControlSystemService} from 'src/app/services/financialControlSystem.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../services/auth/auth.service';
import {ButtonAgGridComponent} from 'src/app/common/components/list-grid-angular/ag-buttons';
import {Router} from '@angular/router';
import {SyncService} from '../../../services/sync.service';
import {WebsocketService2} from '../../../services/websocket.service';
import {environment} from '../../../../environments/environment';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}

@Component({
  selector: 'app-list-sync',
  templateUrl: './list-sync.component.html',
  styleUrls: ['./list-sync.component.scss']
})
export class ListSyncComponent implements OnInit, OnDestroy, AfterViewChecked {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  screenWidth: number = 0;
  fieldsTotal: any[] = ['quantity', 'amount', 'discount'];
  countRecord: CountRecord = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  };

  public listBranchs: Branch[] = [];
  public listDatas: any[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public fileName = 'Nhập hóa đơn từ tệp ảnh';
  displayEdit: boolean = false;
  public columnDefs: ColDef[] = [];
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  public cols: any[] = [
    {field: 'unitName', header: 'Đơn vị', typeField: 'text'},
  ];
  components = {numericCellEditor: getNumericCellEditor()};
  gridApi: any;
  rowClassRules = {
    // 'cell-bg-red': (params: any) => { return params.data.hasOwnProperty('status') && params.data.status === 0 },
  };
  detailCellRendererParams: any = {};
  listDataSelect: any[] = [];
  gridColumnApi: any = null;
  loadjs = 0;
  heightGrid = 0;
  isExpanded: boolean = true;
  contentItems: any[] = [];
  state: string = '';
  initialised = false;
  pinnedBottomData: any = null;
  querySyncData: any = {
    retailerId: null,
    retailerCode: null,
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
    syncCode: null,
    syncType: null,
    startDate: new Date(),
    endDate: new Date(),
  };
  first: number = 0;
  isUploadFile: boolean = true;
  displayFilter: boolean = false;
  ListUploadDates: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.querySyncData.retailerId = this.authService?.getRetailerId();
    this.querySyncData.retailerCode = this.authService?.getRetailerName();
    this.onInitGrid();
    this.$webSocketService.connect(`${environment.socketServer}?username=0983732396`);
    this.$webSocketService.emit2(['/user/0983732396/sync/notify']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.$webSocketService.closeConnection();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  onInitGrid() {
    this.columnDefs = this.columnDefs = [
      {
        headerName: 'Stt',
        field: 'stt',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
        cellRenderer: (params) => {
          return params.rowIndex + 1;
        }
      },
      {
        headerName: 'Hạng mục',
        field: 'syncItem',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      // {
      //   headerName: 'syncCode',
      //   field: 'syncCode',
      //   cellClass: 'flex',
      //   editable: false,
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: [],
      // },
      // {
      //   headerName: 'syncType',
      //   field: 'syncType',
      //   cellClass: 'flex',
      //   editable: false,
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: [],
      // },
      //
      {
        headerName: 'Trạng thái',
        field: 'syncMessage',
        editable: false,
        cellClass: 'flex',
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
        cellRenderer: (params) => {
          return params.data.syncMessage === '' || params.data.syncMessage === null || params.data.syncMessage === undefined
            ? '' : `<span class="bg-warning noti-number">${params.data.syncMessage}</span>`;
        }
      },
      {
        headerName: 'Thao tác',
        filter: '',
        width: 100,
        pinned: 'right',
        cellRenderer: ButtonAgGridComponent,
        cellClass: ['border-right', 'no-auto'],
        cellRendererParams: (params: any) => this.showButtons(params),
        checkboxSelection: false,
        field: 'checkbox'
      }
    ];
  }

  showButtons(params: any) {
    return {
      buttons: [
        {
          onClick: this.dongbo.bind(this),
          label: 'Đồng bộ',
          icon: 'fa fa-edit',
          class: 'btn-primary mr5',
        },
      ]
    };
  }

  dongbo(event: any) {
    this.querySyncData.syncCode = event.rowData.syncCode;
    this.querySyncData.syncType = event.rowData.syncType;
    this._confirmationService.confirm({
      message: '',
      key: 'key-confirm',
      accept: () => {
        const object: any = {...this.querySyncData};
        object.endDate = this.$datepipe.transform(this.querySyncData.endDate, 'yyyy-MM-dd');
        object.startDate = this.$datepipe.transform(this.querySyncData.startDate, 'yyyy-MM-dd');
        this.$syncService.syncData(object).subscribe((results: any) => {
          if (results.success) {
            const itemUpdate = event.rowData;
            itemUpdate.syncMessage = results.data.syncMessage;
            this.gridApi.applyTransaction({update: [itemUpdate]});
          } else {
            this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: results.message ? results.message : 'Lỗi !!'});
          }
        });
      }
    });
  }

  getSelectedRows(event: any[]) {
    this.listDataSelect = event;
  }

  ngOnInit(): void {
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Danh sách đồng bộ'},
    ];
    this.getListImagePurchaseOrder();
    this.getListBranch();
    this.$webSocketService.myWebSocket
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(repon => {
            console.log(repon)
        },
        err => {
          console.log(err);
        });

  }

  convertDate(stringDate: any) {
    if (stringDate) {
      const string = stringDate.split('/');
      return new Date(`${string[2]}-${parseFloat(string[1]) < 10 ? '0' + string[1] : string[1]}-${string[0]}`);
    }
    return new Date();
  }

  convertDate2(stringDate: any) {
    if (stringDate) {
      const string = stringDate.split('-');
      return new Date(`${string[2]}-${parseFloat(string[1]) < 10 ? '0' + string[1] : string[1]}-${string[0]}`);
    }
    return new Date();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  autoSizeAll(skipHeader: boolean) {
    const notAutoSizes = ['productName', 'imageProductName'];
    const allColumnIds: string[] = [];
    // tslint:disable-next-line:no-non-null-assertion
    if (this.gridColumnApi && this.gridColumnApi.getColumns()) {
      this.gridColumnApi.getColumns()!.forEach((column: any) => {
        if (notAutoSizes.indexOf(column.colId) < 0) {
          allColumnIds.push(column.colId);
        } else {
          column.minWidth = 220;
          column.width = 220;
        }
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    }

  }

  getListBranch() {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId()});
    this.$service.getListBranch(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listBranchs = results.data.content ?? [];
          if (this.querySyncData.branchId === 0 && this.listBranchs.length > 0) {
            setTimeout(() => {
              this.querySyncData.branchId = this.listBranchs[2].branchId;
              localStorage.setItem('branchId', this.querySyncData.branchId?.toString() ?? '');
              // this.getListUploadDate();
            }, 10);
          } else {
            // this.getListUploadDate();
          }
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  getListImagePurchaseOrder() {
    this.querySyncData.retailerId = this.authService?.getRetailerId();
    const queryParams = queryString.stringify({page: 0, size: 100000000});
    this.$syncService.getListSync(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.contentItems = results.data.content.map(item => {
            return {...item, syncMessage: ''};
          });
          if (this.gridApi) {
            this.gridApi.setRowData(this.contentItems);
            this.gridApi.setColumnDefs(this.columnDefs);
          }
          this.autoSizeAll(false);
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  ngAfterViewChecked(): void {
    const b: any = document.querySelector('.sidebarBody1');
    const c: any = document.querySelector('.breadcrumb');
    // const e: any = document.querySelector(".paginator");
    this.loadjs++;
    if (this.loadjs === 5) {
      if (b && b.clientHeight) {
        const totalHeight = b.clientHeight + c.clientHeight + 80;
        this.heightGrid = window.innerHeight - totalHeight;
        this.$changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
  }

  expandAll(type: boolean = false) {
    this.isExpanded = type ? !this.isExpanded : this.isExpanded;
  }

  getContextMenuItems = (params: any) => {
    const result = [
      {
        name: 'Hiển thị CK',
        action: () => {
          this.gridColumnApi.setColumnsVisible(['discount'], true);
          this.autoSizeAll(false);
        },
      },
      {
        name: 'Hiển thị VAT',
        action: () => {
          this.gridColumnApi.setColumnsVisible(['vat'], true);
          this.autoSizeAll(false);
        },
      },
      'separator',
      'copy',
      'paste',
      'separator',
      'excelExport',
    ];
    return result;
  };

  private $datepipe = inject(DatePipe);
  private _confirmationService = inject(ConfirmationService);
  private $spinner = inject(NgxSpinnerService);
  private $serviceFinancial = inject(financialControlSystemService);
  private $serviceProduct = inject(ProductManagerService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $syncService = inject(SyncService);
  private $webSocketService = inject(WebsocketService2);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
}
