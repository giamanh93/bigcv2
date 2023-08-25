import {DatePipe} from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener,
  OnDestroy, AfterViewChecked
} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import queryString from 'query-string';
import {AsyncSubject, forkJoin, lastValueFrom, Observable, Subject, Subscription, takeUntil, zip} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {ColDef, RowGroupingDisplayType, RowNode} from 'ag-grid-community';
import {PurchaseOrderService} from 'src/app/services/purcher-order.service';
import {getNumericCellEditor} from 'src/app/common/function/function-common';
import numeral from 'numeral';
import {ProductManagerService} from 'src/app/services/productManager.serivce';
import {financialControlSystemService} from 'src/app/services/financialControlSystem.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../services/auth/auth.service';
import {DropdownRenderComponent} from '../../../common/components/list-grid-angular/dropdown-render/dropdown-render.component';
import {AgGridImageComponent} from '../../../common/components/list-grid-angular/aggrid-image';

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
  selector: 'app-upload-image-order',
  templateUrl: './upload-image-order.component.html',
  styleUrls: ['./upload-image-order.component.scss']
})
export class UploadImageOrderComponent implements OnInit, OnDestroy, AfterViewChecked {
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
  contentItems: ContentBase64[] = [];
  state: string = '';
  initialised = false;
  pinnedBottomData: any = null;
  query: any = {
    retailerId: null,
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  };
  first: number = 0;
  isUploadFile: boolean = true;
  displayFilter: boolean = false;

  constructor(private authService: AuthService) {
    this.query.retailerId = this.authService?.getRetailerId();
    // console.log(this.authService?.getRetailerId())
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
      {
        headerName: 'Ảnh hóa đơn',
        field: 'base64',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
        cellRenderer: AgGridImageComponent,
      },
      {
        headerName: 'Tên file',
        field: 'name',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Loại file',
        field: 'type',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Kích thước',
        field: 'size',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        editable: false,
        cellRenderer: (params: any) => {
          return params.value ? 'Thành công' : '';
        },
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        menuTabs: [],
      },
    ];
  }

  ageRangeValueGetter = (params: any) => {
    if (this.containsOnlyNumbers(params.data.price) && this.containsOnlyNumbers(params.data.quantity)) {
      const price = numeral(params.getValue('price')).value() || 0;
      const quantity = numeral(params.getValue('quantity')).value() || 0;
      return numeral(price * quantity).format('0,0');
    }
    return null;
  }

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
    this.onInitGrid();
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
            }, 10);
          } else {
          }
        } else {
          this.listDatas = [];
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  changeBranch() {
    localStorage.setItem('branchId', this.query.branchId?.toString() ?? '');
    this.query.page = 1;
    this.query.size = 20;
    this.first = 1;
    this.countRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    };
    // this.getLists();
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
        const totalHeight = b.clientHeight + c.clientHeight + 150;
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
  }

  // phần chọn ảnh

  onUpload(event: UploadEvent) {

    this.toFilesBase64(event.currentFiles, this.contentItems).subscribe((res: any[]) => {
      this.contentItems = res;
      this.isUploadFile = false;
      const fileCallApi = this.contentItems.filter(f => !f.status);
      const callApis: any[] = fileCallApi.map((a: any) => a.linkapi);
      zip(callApis)
        .subscribe(results => {
          if (results.length > 0 && results[0].success) {
            Object.keys(this.contentItems)?.forEach(async (file, i) => {
              if (results.map(item => item.data.fileName).indexOf(this.contentItems[i].name) > -1) {
                this.contentItems[i].status = true;
              }
            });
            this.gridApi.setRowData(this.contentItems);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.autoSizeAll(false);
            this.isUploadFile = true;
          } else {
            this.gridApi.setRowData(this.contentItems);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.autoSizeAll(false);
            this.isUploadFile = true;
          }

        });
    });
  }

  toFilesBase64(files: File[], selectedFiles: any[]): Observable<any[]> {
    const result = new AsyncSubject<any[]>();
    if (files?.length) {
      Object.keys(files)?.forEach(async (file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter((f: any) => f?.name !== files[i]?.name);
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('branchId', this.query.branchId);
          selectedFiles.push({
            name: files[i]?.name, file: files[i], type: files[i]?.type
            , base64: reader?.result as string, status: false, size: files[i]?.size,
            linkapi: this.$service.uploadFileOrder(formData)
          });
          result.next(selectedFiles);
          if (files?.length === (i + 1)) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

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
