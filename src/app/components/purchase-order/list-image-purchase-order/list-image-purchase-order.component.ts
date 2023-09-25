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
import {WebsocketService2} from 'src/app/services/websocket.service';
import {environment} from 'src/environments/environment';

export interface ContentBase64 {
  name: string;
  file: number;
  base64: string;
  type: string;
  size: number;
  status: boolean;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}

@Component({
  selector: 'app-list-image-purchase-order',
  templateUrl: './list-image-purchase-order.component.html',
  styleUrls: ['./list-image-purchase-order.component.scss']
})
export class ListImagePurchaseOrderComponent implements OnInit, OnDestroy, AfterViewChecked {
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
  query: any = {
    retailerId: null,
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
    uploadDate: null
  };
  first: number = 0;
  isUploadFile: boolean = true;
  displayFilter: boolean = false;
  ListUploadDates: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.query.retailerId = this.authService?.getRetailerId();
    this.onInitGrid();

  }


  onChangeMapSuppliers() {
    this.query.filter.status = 1;
  }

  editProductDetail() {
    this.displayEdit = true;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleChange(event: any) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  onInitGrid() {
    this.columnDefs = this.columnDefs = [
      // {
      //   maxWidth: 50,
      //   headerName: '',
      //   pinned: 'left',
      //   cellRenderer: (params: any) => params.node.rowPinned !== 'bottom' ? params.rowIndex + 1 : '',
      //   cellClass: ['border-right', 'no-auto', 'p-0'],
      //   rowDrag: true,
      //   field: 'checkbox22',
      //   menuTabs: [],
      //   filter: false,
      // },
      // {
      //   headerName: 'Ảnh hóa đơn',
      //   field: 'base64',
      //   editable: false,
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: [],
      //   cellRenderer: AgGridImageComponent,
      // },
      // {
      //   headerName: 'Ngày hóa đơn',
      //   field: 'uploadDate',
      //   editable: false,
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: [],
      // },
      {
        headerName: 'Ngày hóa đơn',
        field: 'purchaseDate',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Đường dẫn',
        field: 'pathToFile',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Tên file',
        field: 'fileName',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Nhà cung cấp',
        field: 'supplierName',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },

      {
        headerName: 'Tổng tiền',
        field: 'imageTotal',
        cellClass: 'flex',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Trạng thái',
        field: 'isProcessed',
        editable: false,
        cellClass: 'flex',
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
        cellRenderer: (params) => {
          return params.data.isProcessed === 1 ? '<span class="bg-success noti-number">Đã lưu</span>' : '<span class="bg-secondary noti-number">Chưa lưu</span>';
        }
      },
      // {
      //   headerName: 'Trạng thái',
      //   field: 'isProcessed',
      //   editable: false,
      //   cellRenderer: (params: any) => {
      //     return params.value === 1 ? 'Thành công' : '';
      //   },
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: [],
      // },
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
          onClick: this.viewDetail.bind(this),
          label: 'Xem',
          icon: 'fa fa-edit',
          class: 'btn-primary mr5',
        },
      ]
    };
  }

  viewDetail(event: any) {
    this.router.navigate(['/order-purchase/view-detail-purchase-order']
      , {queryParams: {...event.rowData}});
  }

  ageRangeValueGetter = (params: any) => {
    if (this.containsOnlyNumbers(params.data.price) && this.containsOnlyNumbers(params.data.quantity)) {
      const price = numeral(params.getValue('price')).value() || 0;
      const quantity = numeral(params.getValue('quantity')).value() || 0;
      return numeral(price * quantity).format('0,0');
    }
    return null;
  };

  getSelectedRows(event: any[]) {
    this.listDataSelect = event;
  }

  containsOnlyNumbers(str: any) {
    // return /^[\0-9,.]\S*$/g.test(str);
    return !isNaN(parseFloat(str)) && isFinite(str) && !/\s/g.test(str);
  }

  containsOnlyNumbersEmpty(str: any) {
    if (str === '' || str === null || str === undefined) {
      return true;
    }
    // return /^[\0-9,.]\S*$/g.test(str);
    return !isNaN(parseFloat(str)) && isFinite(str) && !/\s/g.test(str);
  }

  handleFilter(params: any) {
    const queryParams = queryString.stringify({
      retailerId: this.authService?.getRetailerId(),
      branchId: this.query.branchId,
      categoryId: 0,
      search: params.event
    });
    this.$serviceProduct.getListProduct(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const itemUpdate = params.rowData;
          const products = results.data.content ?? [];
          itemUpdate.product = products;
          this.gridApi.applyTransaction({update: [itemUpdate]});
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  ngOnInit(): void {
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Nhập hóa đơn'},
      {label: `Upload ảnh`},
    ];
    this.getListBranch();
  }

  saveProductOrder() {

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
          if (this.query.branchId === 0 && this.listBranchs.length > 0) {
            setTimeout(() => {
              this.query.branchId = this.listBranchs[2].branchId;
              localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
              this.getListUploadDate();
            }, 10);
          } else {
            this.getListUploadDate();
          }
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  getListUploadDate() {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId(), branchId: this.query.branchId});
    this.$service.getListUploadDate(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.ListUploadDates = results.data.content ?? [];
          if (!this.query.uploadDate) {
            setTimeout(() => {
              this.query.uploadDate = this.ListUploadDates[0].uploadDate;
              this.getListImagePurchaseOrder();
            }, 10);
          }
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  getListImagePurchaseOrder() {
    this.query.retailerId = this.authService?.getRetailerId();
    const queryParams = queryString.stringify({...this.query});
    this.$service.getListImagePurchaseOrder(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.contentItems = results.data.content;
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

  changeDate() {
    // localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
    this.query.page = 1;
    this.query.size = 20;
    this.first = 1;
    this.countRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    };
    this.getListImagePurchaseOrder();
  }

  changeBranch() {
    this.query.uploadDate = null;
    localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
    this.query.page = 1;
    this.query.size = 20;
    this.first = 1;
    this.countRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    };
    this.getListUploadDate();
  }

  onClearSuppliers() {
    this.query.selectSuppliers = null;
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
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
}
