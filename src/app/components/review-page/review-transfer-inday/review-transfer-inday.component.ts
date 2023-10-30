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
import {forkJoin, lastValueFrom, Subject, Subscription, takeUntil} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {ColDef, GetRowIdFunc, GetRowIdParams, RowGroupingDisplayType, RowNode} from 'ag-grid-community';
import {AgGridFn} from 'src/app/common/function/lib';
import {PurchaseOrderService} from 'src/app/services/purcher-order.service';
import {DropdownRenderComponent} from 'src/app/common/components/list-grid-angular/dropdown-render/dropdown-render.component';
import {getNumericCellEditor} from 'src/app/common/function/function-common';
import numeral from 'numeral';
import {ProductManagerService} from 'src/app/services/productManager.serivce';
import {financialControlSystemService} from 'src/app/services/financialControlSystem.service';
import {
  PanZoomAPI,
  PanZoomConfig,
  PanZoomConfigOptions, PanZoomModel,
} from 'ngx-panzoom';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomTooltip} from 'src/app/common/components/list-grid-angular/tooltip-render/tooltip-render';
import {Account, Ship} from '../../../models/account';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewService} from '../../../services/review.service';

export interface ContentBase64 {
  contentFile: string;
  thumbnail: any;
  id: number;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}


@Component({
  selector: 'app-review-transfer-inday',
  templateUrl: './review-transfer-inday.component.html',
  styleUrls: ['./review-transfer-inday.component.scss']
})
export class ReviewTransferIndayComponent implements OnInit, OnDestroy, AfterViewChecked {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  screenWidth: number = 0;
  fieldsTotal: any[] = ['invoiceAmount', 'excelAmount', 'diff', 'code'];
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
  products = [
    {
      'supplierName': 'thuc pham Revofood',
      'value': 20,
      'purchaseOrderDetail':
        [
          {
            'productName': 'mong gio',
            'quantity': 2,
            'price': 10,
            'amount': 20
          },
          {
            'productName': 'suon',
            'quantity': 2,
            'price': 10,
            'amount': 20
          },
          {
            'productName': 'ba chi',
            'quantity': 2,
            'price': 10,
            'amount': 20
          }
        ]
    }
  ];
  ProductCategorys: any[] = [];
  public query: any = {
    retailerId: this.authService?.getRetailerId(),
    filter: {
      status: 0
    },
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
    supplierName: {
      'supplierName': '',
      'value': 0,
      'purchaseOrderDetail': []
    },
    selectSuppliers: null

  };
  checkDate = new Date();
  public autoGroupColumnDef: ColDef = {
    minWidth: 300,
    cellRendererParams: {
      footerValueGetter: (params: any) => {
        const isRootLevel = params.node.level === -1;
        if (isRootLevel) {
          return 'Grand Total';
        }
        return `Sub Total (${params.value})`;
      },
    }
  };
  public columnDefs: ColDef[] = [];
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';


  components = {numericCellEditor: getNumericCellEditor()};
  public cols: any[] = [
    {
      field: 'code',
      header: '#',
      typeField: 'text',
      masterDetail: false,
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },
    {
      field: 'invoiceDate',
      header: 'Ngày hóa đơn',
      typeField: 'text',
      masterDetail: false,
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },
    {
      field: 'invoiceAmount',
      header: `Tổng tiền`,
      typeField: 'decimal',
      aggFunc: 'sum',
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },
    {
      field: 'excelDate',
      header: 'excelDate',
      typeField: 'text',
      masterDetail: false,
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },
    {
      field: 'excelAmount',
      header: 'excelAmount',
      typeField: 'decimal',
      aggFunc: 'sum',
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },
    {
      field: 'diff',
      header: 'Chênh lệnh',
      typeField: 'decimal',
      aggFunc: 'sum',
      // headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'description',
      header: 'Mô tả',
      typeField: 'text',
      masterDetail: false,
      // headerClass: 'bg-primary-reverse',
      // cellClass: ['bg-primary-reverse']
    },

  ];
  gridApi: any;
  rowClassRules = {
    // 'cell-bg-red': (params: any) => { return params.data.hasOwnProperty('status') && params.data.status === 0 },
  };
  detailCellRendererParams: any = {};
  gridColumnApi: any = null;
  first: number = 1;
  loadjs = 0;
  heightGrid = 0;
  displayFilter = false;
  isExpanded: boolean = true;
  public linkBase64: string | ArrayBuffer | null = null;
  public panZoomConfigOptions: PanZoomConfigOptions = {
    zoomLevels: 10,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.01,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'left',
  };
  panzoomConfig: PanZoomConfig = new PanZoomConfig(this.panZoomConfigOptions);
  contentItems: ContentBase64[] = [];
  state: string = '';
  initialised = false;
  pinnedBottomData: any = null;


  model: any = {
    retailerId: null,
    branchId: null,
    checkDate: null,
    startRow: null,
    dateColumn: null,
    amountColumn: null,
    descriptionColumn: null,
    page: null,
    size: null,
  };
  isUploadFile = true;

  constructor(private authService: AuthService) {
    this.query.retailerId = this.authService?.getRetailerId();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }


  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols)
    ];
  }

  ngOnInit(): void {
    this.onInitGrid();
    // ['_value'].title
    const titlePage: any = this.$activatedRoute.data;
    this.fileName = titlePage['_value'].title;
    this.screenWidth = window.innerWidth;
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Đối soát thu ngân'},
      {label: `1. ${this.fileName}`},
    ];
    this.getListBranch();
  }

  onBack() {
    this.router.navigate(['/order-purchase/list-image-purchase-order']);
  }


  convertDate(stringDate: any) {
    if (stringDate) {
      const string = stringDate.split('/');
      return new Date(`${string[2]}-${parseFloat(string[1]) < 10 ? '0' + string[1] : string[1]}-${string[0]} ${new Date().getHours()}: ${new Date().getMinutes()}`);
    }
    return new Date();
  }

  convertDate2(stringDate: any) {
    if (stringDate) {
      const string = stringDate.split('-');
      return new Date(`${string[2]}-${parseFloat(string[1]) < 10 ? '0' + string[1] : string[1]}-${string[0]} ${new Date().getHours()}: ${new Date().getMinutes()}`);
    }
    return new Date();
  }


  generatePinnedBottomData() {
    const result: any = {};
    this.gridColumnApi.getAllGridColumns().forEach((item: any) => {
      result[item.colId] = null;
    });
    // return this.calculatePinnedBottomData(result);
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
              // this.getLists();
            }, 10);
          } else {
            // this.getLists();
          }
        } else {
          this.listDatas = [];
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
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

  getLists() {

  }


  paginate(event: any) {
    this.query.page = event.page + 1;
    this.first = event.first;
    this.query.size = event.rows;
    this.getLists();
  }

  fnCountRecord(results: any) {
    this.countRecord.totalRecord = results.totalElements;
    this.countRecord.currentRecordStart = this.query.page === 1 ? this.query.page = 1 : this.countRecord.currentRecordEnd;
    this.countRecord.currentRecordEnd = this.query.page === 1 ? this.query.size : this.query.page * Number(this.query.size);
  }

  ngAfterViewChecked(): void {
    const b: any = document.querySelector('.sidebarBody1');
    const c: any = document.querySelector('.breadcrumb');
    const d: any = document.querySelector('.toolbar');
    // const e: any = document.querySelector(".paginator");
    this.loadjs++;
    if (this.loadjs === 5) {
      if (b && b.clientHeight) {
        const totalHeight = b.clientHeight + c.clientHeight + d.clientHeight + 60;
        this.heightGrid = window.innerHeight - totalHeight;
        this.$changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
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

  // phần chọn ảnh

  onUpload(event: UploadEvent) {
    this.handleUpload(event.currentFiles);
  }

  handleUpload(files: any) {
    const file = files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.isUploadFile = false;
    //   this.$spinner.show();
    //   const datas: any = reader.result;
    //   // this.linkImagebase64 = reader.result || null;
    //   this.contentItems = [{
    //     contentFile: file.name,
    //     thumbnail: reader.result,
    //     id: 1
    //   }];
    //   const base64s = datas.split(',');
    //   // this.calApiUploadImageOrder(base64s[1]);
    // };
    this.listDatas = [];
    const formData = new FormData();
    const retailerId: string = this.authService?.getRetailerId() ? this.authService?.getRetailerId().toString() : '';
    const checkDate: any = this.checkDate ? this.$datepipe.transform(this.checkDate, 'yyyy-MM-dd') : '';
    formData.append('retailerId', retailerId);
    formData.append('branchId', this.query.branchId);
    formData.append('checkDate', checkDate);
    formData.append('startRow', '14');
    formData.append('dateColumn', '1');
    formData.append('amountColumn', '2');
    formData.append('descriptionColumn', '4');
    formData.append('page', '1');
    formData.append('size', '10000');
    formData.append('excelFile', file);
    this.$spinner.show();
    this.$serviceReview.getReviewTransferInDay(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content;
          this.gridApi.setRowData(this.listDatas);
          this.$spinner.hide();
        } else {
          this.listDatas = [];
          this.$spinner.hide();
          this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Hệ thông đang bảo trì.'});
        }
      });
  }

  getMappingProduct() {

  }

  // calApiUploadImageOrder(base64s: string) {
  //   this.$service.getInfoFromImage({base64: `${base64s}`})
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(results => {
  //       if (results.success) {
  //         this.query.supplierName = results.data;
  //         this.listDatas = this.query.supplierName.purchaseOrderDetail;
  //         this.xacnhan({
  //           isClose: false
  //           , product: this.query.supplierName
  //           , linkBase64: this.contentItems[0].thumbnail
  //           , contentItems: this.contentItems
  //         });
  //         this.isUploadFile = true;
  //         this.$messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Xử lý dữ liệu thành công'});
  //         this.$spinner.hide();
  //       } else {
  //         this.isUploadFile = true;
  //         this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Xử lý dữ liệu thất bại'});
  //         this.$spinner.hide();
  //       }
  //     });
  // }


  private $datepipe = inject(DatePipe);
  private _confirmationService = inject(ConfirmationService);
  private $spinner = inject(NgxSpinnerService);
  private $serviceFinancial = inject(financialControlSystemService);
  private $serviceProduct = inject(ProductManagerService);
  private $serviceReview = inject(ReviewService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
  private $activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


}

