import {DatePipe} from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  HostListener,
  OnDestroy, AfterViewChecked
} from '@angular/core';
import {MessageService} from 'primeng/api';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {ColDef, GetRowIdFunc, GetRowIdParams, RowGroupingDisplayType} from 'ag-grid-community';
import {AgGridFn, autoSizeAllGrid} from 'src/app/common/function/lib';
import {NgxSpinnerService} from 'ngx-spinner';
import {RevenueWithFlowOfMoney} from 'src/app/models/financial-control-system';
import {ProductManagerService} from 'src/app/services/productManager.serivce';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-track-customer-by-product-category',
  templateUrl: './track-customer-by-product-category.component.html',
  styleUrls: ['./track-customer-by-product-category.component.scss']
})

export class TrackCustomerByProductCategoryComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  screenWidth: number = 0;
  countRecord: CountRecord = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  };
  public listBranchs: Branch[] = [];
  public listDatas: RevenueWithFlowOfMoney[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public fileName = 'Theo dõi sản phẩm chu kỳ khách hàng';
  ProductCategorys: any[] = [];
  public query: any = {
    retailerId: this.authService?.getRetailerId(),
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    productCategoryId: null,
    endDate: new Date(),
    page: 1,
    size: 20,
    search: '',
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  };
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

  public cols: any[] = [
    {field: 'productName', header: 'Tên SP', typeField: 'text'},
    {field: 'customerCode', header: 'Mã KH', typeField: 'text'},
    {field: 'customerName', header: 'Tên KH', typeField: 'text', suppressSizeToFit: true, width: 250},
    {field: 'invoiceCount', header: 'Số lượng HĐ', typeField: 'decimal'},
    {field: 'averageDay', header: 'Số ngày TB', typeField: 'decimal'},
    {field: 'unitName', header: 'Đơn vị', typeField: 'text'},
    {field: 'quantity', header: 'Số lượng', typeField: 'decimal'},
    {field: 'buy_price', header: 'Đơn giá mua', typeField: 'decimal'},
    {field: 'sell_price', header: 'Đơn giá bán', typeField: 'decimal'},
    {field: 'amount', header: 'Thành tiền', typeField: 'decimal'},
    {field: 'profit', header: 'Lợi nhuận', typeField: 'decimal'},
  ];

  public colsDetail: any[] = [
    {
      field: 'invoiceNo',
      header: '#',
      typeField: 'text',
      masterDetail: true,
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'revenue',
      header: `Doanh thu`,
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'transfer',
      header: 'Chuyển khoản',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'card',
      header: 'Quẹt thẻ',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'cash',
      header: 'Tiền mặt',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'point',
      header: 'Điểm',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'voucher',
      header: 'Voucher',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'debt',
      header: 'Công nợ',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
    {
      field: 'diff',
      header: 'Chênh lệnh',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    },
  ];
  detailCellRendererParams: any = {};
  infoCategory: any = null;

  first: number = 1;

  loadjs = 0;
  heightGrid = 0;
  displayFilter = false;

  isExpanded: boolean = true;
  treeSelects: any[] = [];

  constructor(private authService: AuthService) { this.query.retailerId = this.authService?.getRetailerId()
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return Math.random() + ' ' + params.data.productName;
  };

  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  Onchange(event: any) {
    console.log('event', event);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  refresh() {
    this.query.startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.query.endDate = new Date();
    this.getLists();
  }

  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols)
    ];
    this.detailCellRendererParams = {
      refreshStrategy: 'everything',
      detailGridOptions: {
        headerHeight: 35,
        frameworkComponents: {},
        defaultColDef: {
          filter: true,
          // floatingFilter: true,
        },
        onGridReady: (params: any) => {
          params.api.setDomLayout('autoHeight');
          params.api.showLoadingOverlay();
        },
        getRowHeight: (params: any) => {
          return 37;
        },
        columnDefs: [
          ...AgGridFn(this.colsDetail),
        ],

        enableCellTextSelection: true,
        onFirstDataRendered(params: any) {
          // params.api.sizeColumnsToFit();
          autoSizeAllGrid(false, params.columnApi);
          params.api.hideOverlay();
        },
      },
      getDetailRowData(params: any) {
        params.successCallback(params.data.childrens);
      },
      excelStyles: [
        {
          id: 'stringType',
          dataType: 'string'
        }
      ],
      template: function (params: any) {
        const personName = params.data.purchaseDate;
        // const total = eval(params.data.childrens.map((item: any) => item.revenue).join('+'))
        return (
          '<div style="height: 100%; background-color: none; border: 1px solid #d5d7d9; box-shadow: 0 3px 10px rgb(0 0 0 / 0.2) ;padding: 20px; box-sizing: border-box;">' +
          `  <div style="height: 10%; padding: 2px; font-weight: bold;">Danh sách ${personName} (${params.data.childrens.length})` +
          '</div>' +
          '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
          '</div>'
        );
      },
    };
  }

  ngOnInit(): void {
    this.onInitGrid();
    const filterDate = localStorage.hasOwnProperty('filterDate')
    && localStorage.getItem('filterDate') ? localStorage.getItem('filterDate') : null;
    if (filterDate) {
      this.query.endDate = JSON.parse(filterDate).endDate;
      this.query.startDate = JSON.parse(filterDate).startDate;
      // this.query.productCategoryId    = JSON.parse(filterDate).productCategoryId    || null;
    } else {
      this.query.startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      this.query.endDate = new Date();
      // this.query.productCategoryId    = 0;
    }
    this.screenWidth = window.innerWidth;
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Quản trị sản phẩm'},
      {label: `1. ${this.fileName}`},
    ];
    this.getListBranch();
    this.getListProductCategory();
    // this.$messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Xin hãy chọn nhóm sản phẩm bạn quan tâm.!'});
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

  getListProductCategory() {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId(), branchId: this.query.branchId});
    this.$service.getListProductCategory(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const ProductCategorys = results.data.content ?? [];
          this.ProductCategorys = [...ProductCategorys];
          this.getTreeNodeCategorys();
          this.displayFilter = true;
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

  changeProductCategory() {
    this.query.productCategoryId = this.infoCategory.categoryId;
    this.query.page = 1;
    this.query.size = 20;
    this.first = 1;
    this.countRecord = {
      totalRecord: 0,
      currentRecordStart: 0,
      currentRecordEnd: 0
    };
  }

  onClear() {
    this.infoCategory = null;
    this.query.productCategoryId = null;
  }

  find() {
    if (!this.infoCategory) {
      this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Bạn cần chọn nhóm sản phẩm để tìm kiếm .'});
      return;
    }
    this.getLists();
    this.displayFilter = false;
  }

  getLists() {
    // this.$https.get('https://primeng.org/assets/showcase/data/customers-medium.json').subscribe((results: any) => {
    //   this.listDatas = results.data ?? [];
    //   this.isLoading = false;
    // })
    this.listDatas = [];
    this.isLoading = true;
    const params = {...this.query};
    params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    localStorage.setItem('filterDate', JSON.stringify({
      endDate: params.endDate,
      startDate: params.startDate,
      productproductCategoryId: params.productCategoryId
    }));
    const queryParams = queryString.stringify(params);
    this.$service.getTrackCustomerByProductCategory(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
          this.fnCountRecord(results.data);
          this.expandAll(false);
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
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
    // const e: any = document.querySelector(".paginator");
    this.loadjs++;
    if (this.loadjs === 5) {
      if (b && b.clientHeight) {
        const totalHeight = b.clientHeight + c.clientHeight + 50;
        this.heightGrid = window.innerHeight - totalHeight;
        console.log(this.heightGrid);
        this.$changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
  }

  expandAll(type: boolean = false) {
    this.isExpanded = type ? !this.isExpanded : this.isExpanded;
  }

  getContextMenuItems(params: any) {
    const result = [
      'copy',
      'paste',
      'separator',
      'excelExport'
    ];
    return result;
  }

  rowGroupOpenedCallback(event: any) {
    if (event.data.childrens && event.data.childrens.length === 0) {
      const index = this.listDatas.findIndex(d => d.purchaseDate === event.data.purchaseDate);
      this.getDaitel(event.data.purchaseDate, event);
    }
  }

  getDaitel(purchaseDate: string, event: any) {
    // const params = { ...this.query, selectedDate: purchaseDate };
    // params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    // params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    // localStorage.setItem('filterDate', JSON.stringify({ endDate: params.endDate, startDate: params.startDate }));
    // const queryParams = queryString.stringify(params);
    // this.$service.getReviewRevenueWithFlowOfMoneyDetail(queryParams)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(results => {
    //     if (results.success) {
    //       const itemsToUpdate: any[] = [];
    //       event.api.forEachNodeAfterFilterAndSort((rowNode: any, index: number) => {
    //         const data = rowNode.data;
    //         if (rowNode.data.purchaseDate === purchaseDate) {
    //           data.childrens = results.data.content;
    //           itemsToUpdate.push(data);
    //         }
    //       });
    //       event.api.applyTransaction({ update: itemsToUpdate })!;
    //       setTimeout(() => {
    //         event.api.resetRowHeights();
    //         // event.api.refreshServerSide({ route: productCategoryId  , purge: true })
    //         event.api.getDisplayedRowAtIndex(event.rowIndex)!.setExpanded(true);
    //       }, 0);
    //     } else {
    //       this.listDatas = [];
    //       this.isLoading = false;
    //       this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
    //     }
    //   })
  }

  getTreeNodeCategorys() {
    this.treeSelects = this.ProductCategorys.map((item, index) => {
      return {
        key: `${index}`,
        label: item.categoryName,
        data: item,
        children: [{key: 'reload', styleClass: 'hidden'}]
      };
    });
  }

  nodeExpand(event: any) {
    if (event.node.children[0].key === 'reload') {
      const queryParams = queryString.stringify({
        retailerId: this.authService?.getRetailerId()
        , branchId: this.query.branchId, parentId: event.node.data.categoryId
      });
      this.$service.getListProductCategory(queryParams)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(results => {
          if (results.success && results.data && results.data.content.length > 0) {
            event.node.children = results.data.content.map((item: any, index: number) => {
              return {
                key: `${event.node.key}-${index}`,
                label: item.categoryName,
                data: item,
                children: [{key: 'reload', styleClass: 'hidden'}]
              };
            });
          }
        });
    }
  }

  nodeSelect(event: any) {
    this.query.productCategoryId = event.node.data.categoryId;
  }

  nodeUnselect(event: any) {
    this.infoCategory = null;
    this.query.productCategoryId = null;
  }

  reloadNodetree() {
    this.infoCategory = null;
    this.query.productCategoryId = null;
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(ProductManagerService);
  private $spinner = inject(NgxSpinnerService);
  private $datepipe = inject(DatePipe);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);


  //   getTreeNodesData() {
  //     return [
  //         {
  //             key: '0',
  //             label: 'Documents',
  //             data: 'Documents Folder',
  //             icon: 'pi pi-fw pi-inbox',
  //             children: [
  //                 {
  //                     key: '0-0',
  //                     label: 'Work',
  //                     data: 'Work Folder',
  //                     icon: 'pi pi-fw pi-cog',
  //                     children: [
  //                         { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
  //                         { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
  //                     ]
  //                 },
  //                 {
  //                     key: '0-1',
  //                     label: 'Home',
  //                     data: 'Home Folder',
  //                     icon: 'pi pi-fw pi-home',
  //                     children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
  //                 }
  //             ]
  //         },
  //         {
  //             key: '1',
  //             label: 'Events',
  //             data: 'Events Folder',
  //             icon: 'pi pi-fw pi-calendar',
  //             children: [
  //                 { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
  //                 { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
  //                 { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
  //             ]
  //         },
  //         {
  //             key: '2',
  //             label: 'Movies',
  //             data: 'Movies Folder',
  //             icon: 'pi pi-fw pi-star-fill',
  //             children: [
  //                 {
  //                     key: '2-0',
  //                     icon: 'pi pi-fw pi-star-fill',
  //                     label: 'Al Pacino',
  //                     data: 'Pacino Movies',
  //                     children: [
  //                         { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
  //                         { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
  //                     ]
  //                 },
  //                 {
  //                     key: '2-1',
  //                     label: 'Robert De Niro',
  //                     icon: 'pi pi-fw pi-star-fill',
  //                     data: 'De Niro Movies',
  //                     children: [
  //                         { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
  //                         { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
  //                     ]
  //                 }
  //             ]
  //         }
  //     ];
  // }
}
