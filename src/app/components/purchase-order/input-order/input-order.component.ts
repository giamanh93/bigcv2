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
  selector: 'app-input-order',
  templateUrl: './input-order.component.html',
  styleUrls: ['./input-order.component.scss']
})
export class InputOrderComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
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
    // { field: "productName", header: "Tên sản phẩm", typeField: 'text' },
    {field: 'unitName', header: 'Đơn vị', typeField: 'text'},
    // { field: "quantity", header: "Số lượng", editable: true, cellEditor: 'numericCellEditor', typeField: 'decimal' },
    // { field: "price", header: "Đơn giá", editable: true, cellEditor: 'numericCellEditor', typeField: 'decimal' },
    // { field: "amount", header: "Thành tiền", editable: true, cellEditor: 'numericCellEditor', typeField: 'decimal' },
  ];
  components = {numericCellEditor: getNumericCellEditor()};
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
  gridApi: any;
  rowClassRules = {
    // 'cell-bg-red': (params: any) => { return params.data.hasOwnProperty('status') && params.data.status === 0 },
  };
  detailCellRendererParams: any = {};
  listDataSelect: any[] = [];
  supplierFilter: string = '';
  supplierFilterUpdate = new Subject<string>();
  listproducts: any[] = [];
  listSuppliers: any[] = [];
  gridColumnApi: any = null;
  infoCategory: any = null;
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
    ckhh: 0,
    invoiceDiscount: 0,
    haveToPayedAmount: 0,
    totalamount: 0,
    shipAmount: 0,
    debtAmount: 0,
    paidAmount: 0,
    description: '',
    ratio: 1,
    discountRatio: 0,
    ship: [],
    paying: [],
    accountId: null,
    vat: 0
  };
  heightZoom: number = 0;

  isUploadFile = true;
  stateOptions: any[] = [
    {label: 'VND', value: 1},
    {label: '%', value: 2}
  ];
  stateOptionsPayment: any[] = [
    {label: 'Tiền mặt', value: 1},
    {label: 'Thẻ', value: 2},
    {label: 'Chuyển khoản', value: 3}
  ];
  visibleNCCShip: boolean = false;
  visiblePayment: boolean = false;
  resultsProductPrice: any[] = [];
  visibleChangeUnit: boolean = false;
  dataProductItem: any = null;
  imagePurchaseOrderId: string = '';
  purchaseOrderDetail: any = null;

  constructor(private authService: AuthService) {
    this.query.retailerId = this.authService?.getRetailerId();
    // console.log(this.authService?.getRetailerId())
  }

  // public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
  //   return params.data.productName;
  // };

  onChangeMapSuppliers() {
    this.query.filter.status = 1;
  }

  editProductDetail() {
    this.displayEdit = true;
  }

  ngAfterViewInit(): void {
    this.panzoomConfig = this.initPanzoomConfig();
    this.$changeDetech.detectChanges();

    this.apiSubscription = this.panzoomConfig.api.subscribe(
      (api: PanZoomAPI) => {
        return this.panZoomAPI = api;
      }
    );
    this.modelChangedSubscription = this.panzoomConfig.modelChanged.subscribe(
      (model: PanZoomModel) => {
        if (model.zoomLevel < 2 && this.panZoomAPI) {
          this.panZoomAPI.resetView();
        }
      }
    );
    this.initialised = !!this.panzoomConfig; // && initialZoomHeight
    this.$changeDetech.detectChanges();
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleChange(event: any) {
    this.updateItemsAgGrid(event.params, event.rowData.productId);
  }

  getListLastProductPriceBySupplierId() {
    const params = {
      retailerId: this.query.retailerId,
      branchId: this.query.branchId,
      supplierId: this.query.selectSuppliers ? this.query.selectSuppliers.supplierId : '',
    };
    const queryParams = queryString.stringify(params);
    this.$service.getListLastProductPriceBySupplierId(queryParams)
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


  updateItemsAgGrid(params: any, item: any) {
    if (this.resultsProductPrice.length > 0) {
      const listPrices = this.resultsProductPrice;
      this.resultsProductPrice = listPrices;
      const itemPrices = listPrices.filter((i: any) => i.productId === item.productId);
      if (itemPrices.length > 0) {
        const priceUnit: any = params.data.price ? numeral(params.data.price).value() : 0;
        const checkErrorPriceByProductId = itemPrices[0].price === priceUnit ? 0 : priceUnit < itemPrices[0].price ? 1 : 2;
        this.updateProductName(params, item, checkErrorPriceByProductId, itemPrices[0].price);
      } else {
        this.updateProductName(params, item, 0, null);
      }
    } else {
      this.updateProductName(params, item, 0, null);
    }
    // const params1 = {
    //   retailerId: this.query.retailerId,
    //   branchId: this.query.branchId,
    //   supplierId: this.query.selectSuppliers ? this.query.selectSuppliers.supplierId : '',
    // };
    // const queryParams = queryString.stringify(params1);
    // const productPrice = this.$service.getListLastProductPriceBySupplierId(queryParams);
    // forkJoin([productPrice])
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(results => {
    //     if (results[0].success && results[0].data.content.length > 0 && item) {
    //       const listPrices = results[0].data.content;
    //       this.resultsProductPrice = listPrices;
    //       const itemPrices = listPrices.filter((i: any) => i.productId === item.productId);
    //       if (itemPrices.length > 0) {
    //         const checkErrorPriceByProductId = itemPrices[0].price !== numeral(params.data.price).value();
    //         this.updateProductName(params, item, checkErrorPriceByProductId, itemPrices.price);
    //       } else {
    //         this.updateProductName(params, item, true, null);
    //       }
    //     } else {
    //       this.updateProductName(params, item, false, null);
    //     }
    //   });
  }

  updateProductName(params: any, item: any, errorPrice: number, priceOld: any) {
    this.gridApi = params.api;
    const itemUpdate = params.data;
    itemUpdate.unitName = item ? item.unit : '';
    itemUpdate.productId = item ? item : null;
    // itemUpdate.discount = item.discount,
    itemUpdate.status = 1;
    itemUpdate.errorPrice = errorPrice;
    itemUpdate.priceOld = priceOld;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.applyTransaction({update: [itemUpdate]});
    this.autoSizeAll(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

// , 'error-cell'
  onInitGrid() {
    this.columnDefs = [
      {
        maxWidth: 50,
        headerName: '',
        pinned: 'left',
        cellRenderer: (params: any) => params.node.rowPinned !== 'bottom' ? params.rowIndex + 1 : '',
        cellClass: ['border-right', 'no-auto', 'p-0'],
        rowDrag: true,
        field: 'checkbox22',
        menuTabs: [],
        filter: false,
      },
      {
        headerName: 'Tên sản phẩm từ ảnh',
        field: 'imageProductName',
        editable: false,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        filter: false,
        cellClass: (params: any) => {
          return params.data.imageProductName === '' || params.data.imageProductName === null
            ? params.node.rowPinned === 'bottom' ? ['left_sl'] : ['bg-orange-400', 'left_sl'] : ['left_sl'];
        },
        menuTabs: [],
      },
      {
        headerName: 'Tên sản phẩm',
        field: 'productName',
        filter: false,
        menuTabs: [],
        cellClass: (params: any) => {
          const items = params.data.productId && typeof params.data.productId === 'object'
            ? this.listDatas.filter(item => item.productId && item.productId.productId === params.data.productId.productId) : [];
          if (items.length > 1) {
            return ['cell-bg-purple', 'cell-dropdown'];
          } else {
            return params.data.status === 0 || !params.data.productId ? params.node.rowPinned !== 'bottom' ? ['cell-bg-red', 'cell-dropdown'] : [] : ['cell-dropdown'];
          }
        },
        cellRenderer: DropdownRenderComponent,
        cellRendererParams: {
          onClick: this.handleChange.bind(this),
          onFilter: this.handleFilter.bind(this),
          onDropdownClick: this.onDropdownClick.bind(this)
        }
      },
      // {
      //   headerName: 'Đơn vị',
      //   field: 'unitName',
      //   width: 150,
      //   suppressSizeToFit: true,
      //   editable: true,
      //   cellEditor: 'agTextCellEditor',
      //   cellEditorPopup: false,
      //   filter: false,
      //   menuTabs: ['generalMenuTab'],
      // },
      {
        headerName: 'SL',
        filter: false,
        field: 'quantity',
        menuTabs: [],
        editable: true,
        cellRenderer: (params: any) => {
          return params.value ? numeral(params.value).format('0,0[.][000]') : '';
        },
        cellEditor: 'agTextCellEditor',
        cellClass: (params: any) => {
          return this.containsOnlyNumbers(params.data.quantity)
            ? ['left_sl'] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell', 'left_sl'] : ['left_sl'];
        }
      },
      {
        headerName: 'ĐG',
        field: 'price',
        filter: false,
        editable: true,
        menuTabs: [],
        tooltipField: 'price',
        tooltipComponentParams: {color: '#ececec'},
        tooltipComponent: CustomTooltip,
        cellEditor: 'agTextCellEditor',
        cellRenderer: (params: any) => {
          return params.value ? numeral(params.value).format('0,0') : '';
        },
        cellClass: (params: any) => {
          return this.containsOnlyNumbers(params.data.price)
            ? params.data.errorPrice === 0
              ? ['left_sl'] : params.data.errorPrice === 2
                ? ['errorPrice', 'bg-red-400', 'left_sl']
                : ['bg-green-400', 'left_sl']
            : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell', 'left_sl'] : ['left_sl'];
        }
      },
      {
        headerName: 'CK',
        field: 'discount',
        filter: false,
        editable: true,
        menuTabs: [],
        cellRenderer: (params: any) => {
          return params.node.rowPinned !== 'bottom' ? numeral(params.value).format('0,0') : '';
        },
        cellEditor: 'agTextCellEditor',
        cellClass: (params: any) => {
          return this.containsOnlyNumbersEmpty(params.data.discount)
            ? ['left_sl'] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell', 'left_sl'] : ['left_sl'];
        }
      },
      {
        headerName: 'VAT',
        field: 'vat',
        filter: false,
        editable: true,
        menuTabs: [],
        cellRenderer: (params: any) => {
          return params.node.rowPinned !== 'bottom' ? numeral(params.value).format('0,0') : '';
        },
        cellEditor: 'agTextCellEditor',
        cellClass: (params: any) => {
          return this.containsOnlyNumbersEmpty(params.data.discount)
            ? ['left_sl'] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell', 'left_sl'] : ['left_sl'];
        }
      },
      {
        headerName: 'TT',
        field: 'amount',
        editable: true,
        filter: false,
        menuTabs: [],
        // valueGetter: this.ageRangeValueGetter,
        cellRenderer: (params: any) => {
          return params.value ? numeral(params.value).format('0,0') : '';
        },
        cellEditor: 'agTextCellEditor',
        cellClass: (params: any) => {
          return this.containsOnlyNumbers(params.value) ? ['left_sl']
            : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell', 'left_sl'] : ['left_sl'];
        }
      },
      {
        maxWidth: 50,
        headerName: '',
        pinned: 'right',
        menuTabs: [],
        cellClass: ['border-right', 'no-auto', 'cell-center'],
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        field: 'checkbox2',
        suppressSizeToFit: true,
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
  };

  reloadTotal() {
    const newListData = this.listDatas.map((item: any) => {
      if (item.price && item.quantity && this.containsOnlyNumbers(item.price) && this.containsOnlyNumbers(item.quantity)) {
        const price: any = numeral(item.price).value();
        const quantity: any = numeral(item.quantity).value();
        let discount: any = 0;
        if (item.discount === '' || item.discount === null) {
          discount = 0;
        } else {
          discount = this.containsOnlyNumbersEmpty(item.discount) ? numeral(item.discount).value() : 0;
        }
        const amount = (price * quantity) - discount;
        return {
          ...item, amount: numeral(amount).format('0,0')
        };
      }
      return {
        ...item
      };
    });
    this.listDatas = newListData;
    this.gridApi.setRowData(newListData);
    const pinnedBottomData = this.generatePinnedBottomData();
    this.pinnedBottomData = pinnedBottomData;
    this.model.haveToPayedAmount = this.pinnedBottomData.amount;
    this.model.ckhh = this.pinnedBottomData.discount;
    this.model.totalamount = this.model.haveToPayedAmount + this.model.ckhh;
    this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
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

  //
  // async handleFilter(params: any) {
  //   const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId(), branchId: this.query.branchId, categoryId: 0, search: params.event});
  //   const itemUpdate = params.rowData;
  //   const categories$: any = this.$serviceProduct.getListProductToPromise(queryParams);
  //   itemUpdate.product = await lastValueFrom(categories$);
  //   this.gridApi.applyTransaction({update: [itemUpdate]});
  // }


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
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }


  getListSupplier(value: string) {
    const queryParams = queryString.stringify({
      retailerId: this.authService?.getRetailerId(),
      branchId: this.query.branchId,
      search: value
    });
    this.$serviceFinancial.getListSupplier(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const suppliers = results.data.content ?? [];
          this.listSuppliers = [...suppliers];
        } else {
          this.listDatas = [];
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  ngOnInit(): void {
    this.onInitGrid();
    // ['_value'].title
    const titlePage: any = this.$activatedRoute.data;
    this.fileName = titlePage['_value'].title;
    this.screenWidth = window.innerWidth;
    this.heightZoom = window.innerHeight - 350;
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Nhập hóa đơn'},
      {label: `1. ${this.fileName}`},
    ];
    this.getListBranch();
    if (titlePage['_value'].url === 'view-detail-purchase-order') {
      this.handleParams();
    } else {
      this.purchaseOrderDetail = null;
    }

    // this.supplierFilterUpdate.pipe(
    //   debounceTime(800),
    //   distinctUntilChanged())
    //   .subscribe(value => {
    //     this.onFilterSuppliers(value);
    //   });
  }

  handleParams(): void {
    this.$activatedRoute.queryParamMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const paramsObject: any = {...params.keys, ...params};
        const dataRouter: any = paramsObject.params;
        this.imagePurchaseOrderId = dataRouter.imagePurchaseOrderId || '';
        if (this.imagePurchaseOrderId) {
          // this.getListImagePurchaseOrderDetail();
          const queryParams = queryString.stringify({pathToFie: dataRouter.pathToFile, fileName: dataRouter.fileName});
          this.$service.previewImage(queryParams)
            .subscribe((results: any) => {
              const reader = new FileReader();
              reader.addEventListener(
                'load',
                () => {
                  this.$spinner.show();
                  this.contentItems = [{
                    contentFile: dataRouter.fileName,
                    thumbnail: reader.result,
                    id: 1
                  }];
                  this.getListImagePurchaseOrderDetail(dataRouter);
                  // const imageData: any = reader.result;
                  // const base64s = imageData.split(',');
                  // this.query.supplierName = dataRouter;
                  // this.calApiUploadImageOrder(base64s[1]);
                },
                false,
              );
              const image: any = results;
              reader.readAsDataURL(image);
            });
        }
      });
  }

  onBack() {
    this.router.navigate(['/order-purchase/list-image-purchase-order']);
  }

  getListImagePurchaseOrderDetail(dataRouter: any) {
    const params = {
      imagePurchaseOrderId: this.imagePurchaseOrderId,
      uploadDate: dataRouter.uploadDate,
      pathToFile: dataRouter.pathToFile,
      fileName: dataRouter.fileName,
      supplierName: dataRouter.supplierName,
      purchaseDate: dataRouter.purchaseDate,
      imageTotal: dataRouter.imageTotal,
      isProcessed: dataRouter.isProcessed
    };
    this.$service.getListImagePurchaseOrderDetail(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          // this.purchaseOrderDetail = results.data.content;
          this.query.supplierName = {
            imageTotal: results.data.imageTotal,
            purchaseDate: results.data.purchaseDate,
            purchaseOrderDetail: results.data.purchaseOrderDetail,
            supplierName: results.data.supplierName,
          };
          this.listDatas = this.query.supplierName.purchaseOrderDetail;
          this.xacnhan({
            isClose: false
            , product: this.query.supplierName
            , linkBase64: this.contentItems[0].thumbnail
            , contentItems: this.contentItems
          });
        } else {
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  getMappingProduct() {
    // if (this.query.supplierName.supplierName === '' || this.query.supplierName.supplierName === null) {
    //   this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Cần nhập tên nhà cung cấp. !'});
    //   return;
    // }
    // if (!this.query.selectSuppliers || !this.query.selectSuppliers.supplierId) {
    //   this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Tham chiếu nhà cung cấp không tồn tại. !'});
    //   return;
    // }
    const params = {
      retailerId: this.query.retailerId,
      branchId: this.query.branchId,
      supplierId: this.query.selectSuppliers ? this.query.selectSuppliers.supplierId : '',
      purchaseOrderDetail: this.query.supplierName && this.query.supplierName.purchaseOrderDetail
      && this.query.supplierName.purchaseOrderDetail.length > 0 ? this.query.supplierName.purchaseOrderDetail : []
    };

    const params1 = {
      retailerId: this.query.retailerId,
      branchId: this.query.branchId,
      purchaseDate: this.query.supplierName.purchaseDate instanceof Date && !isNaN(this.query.supplierName.purchaseDate.valueOf())
        ? this.$datepipe.transform(this.query.supplierName.purchaseDate, 'yyyy-MM-dd') : this.query.supplierName.purchaseDate,
      supplierId: this.query.selectSuppliers ? this.query.selectSuppliers.supplierId : '',
    };
    const queryParams = queryString.stringify(params1);
    const mappingProduct = this.$service.getMappingProduct(params);
    const listLastProductPrice = this.$service.getListLastProductPriceBySupplierId(queryParams);
    this.$spinner.show();
    forkJoin([mappingProduct, listLastProductPrice])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.length > 0 && results[0].success && results[1].success) {
          const resultsProduct = results[0].data;
          const resultsProductPrice = results[1].data.content;
          this.resultsProductPrice = resultsProductPrice;
          const listDatas = resultsProduct.mappingProduct ?? [];
          this.listDatas = listDatas.map((item: any) => {
            if (item.product.length > 0 && resultsProductPrice.length > 0) {
              if (resultsProductPrice.map((i: any) => i.productId).indexOf(item.product[0].productId) > -1) {
                const itemPrices = resultsProductPrice.filter((i: any) => i.productId === item.product[0].productId);
                if (itemPrices.length > 0) {
                  const priceUnit: any = item.price ? numeral(item.price).value() : 0;
                  return {
                    ...item,
                    product: item.product && item.product.length > 0 ? item.product : []
                    , productId: item.product.length > 0 ? item.product[0] : null
                    , unitName: item.product.length > 0 ? item.product[0].unit : null
                    , errorPrice: itemPrices[0].price === priceUnit ? 0 : priceUnit < itemPrices[0].price ? 1 : 2
                    , priceOld: itemPrices[0].price
                  };
                } else {
                  return {
                    ...item,
                    product: item.product && item.product.length > 0 ? item.product : []
                    , productId: item.product.length > 0 ? item.product[0] : null
                    , unitName: item.product.length > 0 ? item.product[0].unit : null
                    , errorPrice: 0, priceOld: null
                  };
                }
              } else {
                return {
                  ...item,
                  product: item.product && item.product.length > 0 ? item.product : []
                  , productId: item.product.length > 0 ? item.product[0] : null
                  , unitName: item.product.length > 0 ? item.product[0].unit : null
                  , errorPrice: 0, priceOld: null
                };
              }
            } else {
              return {
                ...item,
                product: item.product && item.product.length > 0 ? item.product : []
                , productId: item.product.length > 0 ? item.product[0] : null
                , unitName: item.product.length > 0 ? item.product[0].unit : null
                , errorPrice: 0, priceOld: null
              };
            }
            // if(resultsProductPrice.length > 0 && resultsProductPrice.map((i: any) => i.productId).indexOf())
            // return {
            //   ...item,
            //   product: item.product && item.product.length > 0 ? item.product : []
            //   , productId: item.product.length > 0 ? item.product[0] : null
            //   , unitName: item.product.length > 0 ? item.product[0].unit : null
            // };
          });
          this.gridApi.setRowData(this.listDatas);
          this.pinnedBottomData = {
            amount: resultsProduct.totalAmount,
            discount: resultsProduct.totalDiscount,
            quantity: resultsProduct.totalQuantity,
            vat: resultsProduct.totalVat
          };
          if (this.pinnedBottomData.discount === 0) {
            this.gridColumnApi.setColumnsVisible(['discount'], false);
          } else {
            this.gridColumnApi.setColumnsVisible(['discount'], true);
          }
          if (this.pinnedBottomData.vat === 0) {
            this.gridColumnApi.setColumnsVisible(['vat'], false);
          } else {
            this.gridColumnApi.setColumnsVisible(['vat'], true);
          }
          this.gridApi.setColumnDefs(this.columnDefs);
          this.model.haveToPayedAmount = numeral(this.pinnedBottomData.amount).format('0,0');
          this.model.haveToPayedAmount = numeral(this.model.haveToPayedAmount).value();
          this.model.vat = numeral(resultsProduct.totalVat).format('0,0');
          this.model.vat = numeral(this.model.vat).value();
          this.model.ckhh = numeral(resultsProduct.totalDiscount).format('0,0');
          this.model.ckhh = numeral(this.model.ckhh).value();
          this.model.totalamount = this.model.haveToPayedAmount + this.model.ckhh;
          const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
          this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
          this.gridApi.setPinnedBottomRowData([this.pinnedBottomData]);
          this.autoSizeAll(false);
          this.$spinner.hide();
        } else {
          this.$spinner.hide();
        }
      });


    // this.$service.getMappingProduct(params)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(results => {
    //     if (results.success) {
    //
    //     } else {
    //       this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
    //     }
    //   });
  }

  saveProductOrder() {
    // if (this.query.supplierName.supplierName === '' || this.query.supplierName.supplierName === null) {
    //   this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Cần nhập tên nhà cung cấp. !'});
    //   return;
    // }
    if (!this.query.selectSuppliers || !this.query.selectSuppliers.supplierId) {
      this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Tham chiếu nhà cung cấp không tồn tại. !'});
      return;
    }
    if (document.getElementsByClassName('error-cell').length > 0) {
      this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Dữ liệu không hợp lệ vui lòng kiểm tra lại. !'});
      return;
    }
    const imageTotal = this.query.supplierName.imageTotal ? numeral(this.query.supplierName.imageTotal).value() : 0;
    const amountBottom = this.pinnedBottomData.amount ? numeral(this.pinnedBottomData.amount).value() : 0;
    if (imageTotal !== amountBottom) {
      // this.$messageService.add({
      //   severity: 'warn', summary: 'Thông báo'
      //   , detail: 'Tổng tiền từ phần mềm không đúng với tổng tiền trên hoá đơn giấy. !'
      // });
      // return;
      this._confirmationService.confirm({
        message: 'Tổng tiền từ phần mềm không đúng với tổng tiền trên hoá đơn giấy. !',
        header: 'Cảnh báo',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.callApi();
        },
      });
    } else {
      this.callApi();
    }

  }

  callApi() {
    const params = {
      branchId: this.query.branchId,
      retailerId: this.query.retailerId,
      supplierName: this.query.selectSuppliers.supplierName,
      imageSupplierName: this.query.filter.supplierName === ''
      || this.query.filter.supplierName === null
        ? this.query.selectSuppliers.supplierName : this.query.filter.supplierName,
      purchaseDate: this.$datepipe.transform(this.query.supplierName.purchaseDate, 'yyyy-MM-dd'),
      supplierId: this.query.selectSuppliers.supplierId,
      totalQuantity: this.pinnedBottomData.quantity ? numeral(this.pinnedBottomData.quantity).value() : 0,
      totalamount: this.model.totalamount,
      invoiceDiscount: this.model.invoiceDiscount,
      ship: this.model.ship,
      paying: this.model.paying,
      // shipAmount: this.model.shipAmount,
      haveToPayedAmount: this.model.haveToPayedAmount,
      // paidAmount: this.model.paidAmount,
      debtAmount: this.model.debtAmount,
      description: this.model.description,
      savePurchaseOrderDetail: this.listDatas.map(item => {
        return {
          imageProductName: item.imageProductName === '' || item.imageProductName === null
            ? item.productId.productName
            : item.imageProductName,
          productId: item.productId.productId,
          productName: item.productId.productName,
          unit: item.unitName,
          quantity: numeral(item.quantity).value(),
          price: numeral(item.price).value(),
          discount: numeral(item.discount).value(),
          vat: numeral(item.vat).value(),
          amount: numeral(item.amount).value(),
          exchangeProductId: item.exChange && item.exChange.exchangeProductId ? item.exChange.exchangeProductId.productId : 0,
          exchangeProductName: item.exChange ? item.exChange.exchangeProductName : null,
          exchangeUnit: item.exChange ? item.exChange.exchangeUnit : null,
          exchangeQuantity: item.exChange ? item.exChange.exchangeQuantity : 0,
          exchangePrice: item.exChange ? item.exChange.exchangePrice : 0,
          exchangeAmount: item.exChange ? item.exChange.exchangeAmount : 0,
          isExchange: item.exChange ? item.exChange.isExchange : 0
        };
      })
    };
    this.$spinner.show();
    this.$service.savePurchaseOrder(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.$messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Ghi dữ liệu thành công.'});
          this.$spinner.hide();
        } else {
          this.$messageService.add({severity: 'warn', summary: 'Warn Message', detail: 'Không lấy được dữ liệu'});
          this.$spinner.hide();
        }
      }, error => {
        this.$spinner.hide();
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

  addRow() {
    this.listDatas = [...this.listDatas, {
      'amount': '',
      'price': '',
      'productName': '',
      'imageProductName': '',
      'product': [],
      'quantity': '',
      'status': 0
    }];
    this.gridApi.setRowData(this.listDatas);
  }

  deleteRow() {
    this.gridApi.applyTransaction({remove: this.listDataSelect});
    const c = this.listDatas.filter((objFromA) => {
      return !this.listDataSelect.find((objFromB) => {
        return objFromA.productId === objFromB.productId
          && objFromA.productName === objFromB.productName
          && objFromA.quantity === objFromB.quantity
          && objFromA.price === objFromB.price
          && objFromA.amount === objFromB.amount
          && objFromA.discount === objFromB.discount
          && objFromA.unitName === objFromB.unitName;
      });
    });
    this.listDatas = c;
    this.gridApi.setColumnDefs(this.columnDefs);
    const pinnedBottomData = this.generatePinnedBottomData();
    this.pinnedBottomData = pinnedBottomData;
    this.model.haveToPayedAmount = numeral(this.pinnedBottomData.amount).format('0,0');
    this.model.haveToPayedAmount = numeral(this.model.haveToPayedAmount).value();
    const sum = this.listDatas.reduce((accumulator, object) => {
      if (this.containsOnlyNumbers(object.discount)
        && this.containsOnlyNumbers(object.price) && this.containsOnlyNumbers(object.quantity)) {
        let amount: any = 0;
        if (object.discount < 100) {
          const price: any = numeral(object.price).value();
          const quantity: any = numeral(object.quantity).value();
          const discount: any = numeral(object.discount).value();
          amount = (price * quantity) * (discount / 100.00);
        } else {
          amount = numeral(object.discount).value();
        }
        return accumulator + amount;
      }
    }, 0);
    const sumVat = this.listDatas.reduce((accumulator, object) => {
      if (this.containsOnlyNumbers(object.vat) && this.containsOnlyNumbers(object.amount)) {
        let amount: any = 0;
        if (object.vat < 100) {
          const amountt: any = numeral(object.amount).value();
          const vat: any = numeral(object.vat).value();
          amount = amountt * (vat / 100.00);
        } else {
          amount = numeral(object.vat).value();
        }
        return accumulator + amount;
      }
    }, 0);
    this.model.vat = numeral(sumVat).format('0,0');
    this.model.vat = numeral(this.model.vat).value();
    this.model.ckhh = numeral(sum).format('0,0');
    this.model.ckhh = numeral(this.model.ckhh).value();
    this.model.totalamount = this.model.haveToPayedAmount + this.model.ckhh;
    const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
    this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
    this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    this.autoSizeAll(false);
  }


  generatePinnedBottomData() {
    const result: any = {};
    this.gridColumnApi.getAllGridColumns().forEach((item: any) => {
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    // **list of columns fo aggregation**
    this.fieldsTotal.forEach(element => {
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        // if(rowNode.index < 10){
        // console.log(rowNode);
        // }
        if (element === 'customerName') {
          target[element] = `Khách hàng: ${this.listDatas.length} `;
        } else if (element === 'productName') {
          target[element] = `Sản phẩm: ${this.listDatas.length} `;
        } else if (element === 'areaName') {
          target[element] = `Khu vực: ${this.listDatas.length} `;
        } else if (element === 'purchaseDate') {
          target[element] = `Count: ${this.listDatas.length} `;
        } else {
          if (rowNode.data && rowNode.data[element]) {
            if (this.containsOnlyNumbers(rowNode.data[element])) {
              target[element] += numeral(rowNode.data[element]).value();
            }
          }
        }
      });
      // if (target[element])
      //     target[element] = target[element].toFixed(2);
    });

    return target;
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const pinnedBottomData = this.generatePinnedBottomData();
    pinnedBottomData.quantity = numeral(pinnedBottomData.quantity).format('0,0[.][000]');
    this.pinnedBottomData = pinnedBottomData;
    this.model.haveToPayedAmount = numeral(this.pinnedBottomData.amount).format('0,0');
    this.model.haveToPayedAmount = numeral(this.model.haveToPayedAmount).value();
    const sum = this.listDatas.reduce((accumulator, object) => {
      if (this.containsOnlyNumbers(object.discount)
        && this.containsOnlyNumbers(object.price) && this.containsOnlyNumbers(object.quantity)) {
        let amount: any = 0;
        if (object.discount < 100) {
          const price: any = numeral(object.price).value();
          const quantity: any = numeral(object.quantity).value();
          const discount: any = numeral(object.discount).value();
          amount = (price * quantity) * (discount / 100.00);
        } else {
          amount = numeral(object.discount).value();
        }
        return accumulator + amount;
      }
    }, 0);
    const sumVat = this.listDatas.reduce((accumulator, object) => {
      if (this.containsOnlyNumbers(object.vat) && this.containsOnlyNumbers(object.amount)) {
        let amount: any = 0;
        if (object.vat < 100) {
          const amountt: any = numeral(object.amount).value();
          const vat: any = numeral(object.vat).value();
          amount = amountt * (vat / 100.00);
        } else {
          amount = numeral(object.vat).value();
        }
        return accumulator + amount;
      }
    }, 0);
    this.model.vat = numeral(sumVat).format('0,0');
    this.model.vat = numeral(this.model.vat).value();
    this.model.ckhh = numeral(sum).format('0,0');
    this.model.ckhh = numeral(this.model.ckhh).value();
    this.model.totalamount = this.model.haveToPayedAmount + this.model.ckhh;
    const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
    this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
    this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    if (params.isChangePrice) {
      this.updateItemsPrice(params, params.data);
    }
  }

  updateItemsPrice(params: any, item: any) {
    if (this.resultsProductPrice.length > 0) {
      const listPrices = this.resultsProductPrice;
      const itemPrices = listPrices.filter((i: any) => i.productId === item.productId.productId);
      if (itemPrices.length > 0) {
        const priceUnit: any = item.price ? numeral(item.price).value() : 0;
        const checkErrorPriceByProductId = itemPrices[0].price === priceUnit ? 0 : priceUnit < itemPrices[0].price ? 1 : 2;
        this.updatePrice(params, item, checkErrorPriceByProductId, itemPrices[0].price);
      } else {
        this.updatePrice(params, item, 0, null);
      }
    } else {
      this.updatePrice(params, item, 0, null);
    }


    //
    //
    //
    // const params1 = {
    //   retailerId: this.query.retailerId,
    //   branchId: this.query.branchId,
    //   supplierId: this.query.selectSuppliers ? this.query.selectSuppliers.supplierId : '',
    // };
    //
    //
    //
    //
    // const queryParams = queryString.stringify(params1);
    // const productPrice = this.$service.getListLastProductPriceBySupplierId(queryParams);
    // forkJoin([productPrice])
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(results => {
    //     this.autoSizeAll(false);
    //     if (results[0].success && results[0].data.content.length > 0 && item) {
    //       const listPrices = results[0].data.content;
    //       const itemPrices = listPrices.filter((i: any) => i.productId === item.productId.productId);
    //       if (itemPrices.length > 0) {
    //         const checkErrorPriceByProductId = itemPrices[0].price !== numeral(item.price).value();
    //         this.updatePrice(params, item, checkErrorPriceByProductId, itemPrices.price);
    //       } else {
    //         this.updatePrice(params, item, true, null);
    //       }
    //     } else {
    //       this.updatePrice(params, item, false, null);
    //     }
    //   });
  }

  updatePrice(params: any, item: any, errorPrice: number, priceOld: any) {
    const itemUpdate = params.data;
    itemUpdate.errorPrice = errorPrice;
    itemUpdate.priceOld = priceOld;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.applyTransaction({update: [itemUpdate]});
    this.autoSizeAll(false);
  }


  autoSizeAll(skipHeader: boolean) {
    console.log(this.gridColumnApi)
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

  getMappingSupplier() {
    this.query.selectSuppliers = null;
    const queryParams = queryString.stringify({
      retailerId: this.authService?.getRetailerId(),
      branchId: this.query.branchId,
      supplierName: this.query.supplierName.supplierName
    });
    this.$service.getMappingSupplier(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.query.filter = results.data;
          this.listSuppliers = results.data.supplier ?? [];
          this.query.selectSuppliers = this.listSuppliers.length > 0 ? this.listSuppliers[0] : null;
          this.getMappingProduct();
          if (results.data.supplier.length === 0) {
            this.$messageService.add({
              severity: 'warn',
              summary: 'Thông báo',
              detail: 'Không tìm thấy thông tin nhà cung cấp ' + results.data.supplierName
            });
          }
          if (this.gridColumnApi) {
            this.autoSizeAll(false);
          }
        } else {
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
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

  onClearSuppliers() {
    this.query.selectSuppliers = null;
  }

  onClear() {
    this.infoCategory = null;
    this.query.productCategoryId = null;
  }

  find() {
    this.getMappingSupplier();
    this.displayFilter = false;
    this.displayEdit = false;
  }

  getLists() {
    // this.listDatas = [];
    // this.isLoading = true;
    // const params = { ...this.query };
    // params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    // params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    // localStorage.setItem('filterDate',
    // JSON.stringify({ endDate: params.endDate
    // , startDate: params.startDate
    // , productproductCategoryId: params.productCategoryId }));
    // const queryParams = queryString.stringify(params);
    // this.$service.getTrackCustomerByProductCategory(queryParams)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(results => {
    //     if (results.success) {
    //       this.listDatas = results.data.content ?? [];
    //       this.isLoading = false;
    //       this.fnCountRecord(results.data);
    //       this.expandAll(false);
    //     } else {
    //       this.listDatas = [];
    //       this.isLoading = false;
    //       this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.code });
    //     }
    //   })
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
        const totalHeight = b.clientHeight + c.clientHeight + 200;
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

  xacnhan(event: any) {
    if (event.isClose) {
      this.displayEdit = false;
    } else {
      this.query.supplierName = event.product;
      if (this.query.supplierName.purchaseDate && this.query.supplierName.purchaseDate.includes('/')) {
        this.query.supplierName.purchaseDate = new Date(this.convertDate(this.query.supplierName.purchaseDate));
      } else {
        this.query.supplierName.purchaseDate = new Date(this.convertDate2(this.query.supplierName.purchaseDate));
      }
      this.linkBase64 = event.linkBase64;
      this.contentItems = event.contentItems;
      this.listDatas = [];
      this.find();
    }

  }

  rotate() {
    this.state = this.state === 'default'
      ? 'rotated180'
      : this.state === 'rotated180'
        ? 'rotated90'
        : this.state === 'rotated90' ? 'rotated' : 'default';
  }

  onChageCKHD() {
    const ckhh: any = numeral(this.model.ckhh).value();
    const totalAmountColumn: any = this.pinnedBottomData.amount ? numeral(this.pinnedBottomData.amount).value() : 0;
    const discountRatio: any = numeral(this.model.discountRatio).value();
    if (this.model.ratio === 2) {
      this.model.invoiceDiscount = discountRatio * totalAmountColumn / 100;
    } else {
      const invoiceDiscount1: any = numeral(this.model.invoiceDiscount).value();
      this.model.discountRatio = totalAmountColumn > 0 ? invoiceDiscount1 * 100 / totalAmountColumn : 0;
    }
    const invoiceDiscount: any = numeral(this.model.invoiceDiscount).value();
    const amount: any = this.model.totalamount ? numeral(this.model.totalamount).value() : 0;
    const shipAmount: any = this.model.shipAmount ? numeral(this.model.shipAmount).value() : 0;
    this.model.haveToPayedAmount = amount + shipAmount - ckhh - invoiceDiscount;
    const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
    this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
  }

  onChageshipAmount() {
    const haveToPayedAmount: any = numeral(this.model.haveToPayedAmount).value();
    const shipAmount: any = numeral(this.model.shipAmount).value();
    this.model.haveToPayedAmount = haveToPayedAmount + shipAmount;
    const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
    this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
  }

  onChagePaidAmount() {
    const paidAmount: any = this.model.paidAmount ? numeral(this.model.paidAmount).value() : 0;
    this.model.debtAmount = this.model.haveToPayedAmount - paidAmount;
  }


  // phần chọn ảnh

  onUpload(event: UploadEvent) {
    this.handleUpload(event.currentFiles);
  }

  handleUpload(files: any) {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.isUploadFile = false;
      this.$spinner.show();
      const datas: any = reader.result;
      // this.linkImagebase64 = reader.result || null;
      this.contentItems = [{
        contentFile: file.name,
        thumbnail: reader.result,
        id: 1
      }];
      const base64s = datas.split(',');
      this.calApiUploadImageOrder(base64s[1]);
    };
  }

  calApiUploadImageOrder(base64s: string) {
    this.$service.getInfoFromImage({base64: `${base64s}`})
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.query.supplierName = results.data;
          this.listDatas = this.query.supplierName.purchaseOrderDetail;
          this.xacnhan({
            isClose: false
            , product: this.query.supplierName
            , linkBase64: this.contentItems[0].thumbnail
            , contentItems: this.contentItems
          });
          this.isUploadFile = true;
          this.$messageService.add({severity: 'success', summary: 'Error Message', detail: 'Xử lý dữ liệu thành công'});
          this.$spinner.hide();
        } else {
          this.isUploadFile = true;
          this.$messageService.add({severity: 'warn', summary: 'Error Message', detail: 'Xử lý dữ liệu thất bại'});
          this.$spinner.hide();
        }
      });
  }

  onDropdownClick(event: any) {
    console.log(event);
    this.dataProductItem = event.rowData;
    this.dataProductItem.rowIndex = event.index;
    this.visibleChangeUnit = true;
  }

  closeUnitChange() {
    this.visibleChangeUnit = false;
  }

  saveUnitChange(event: any) {
    this.listDatas[this.dataProductItem.rowIndex].exChange = event;
    this.gridApi.setColumnDefs(this.columnDefs);
    this.autoSizeAll(false);
    this.visibleChangeUnit = false;
  }

  closeNCCShip() {
    this.visibleNCCShip = false;
  }

  saveNCCShip(event: any) {
    this.model.ship = event;
    if (this.model.ship.length > 0) {
      this.model.shipAmount = this.model.ship[0].amount;
      this.onChageCKHD();
    } else {
      this.model.shipAmount = 0;
      this.onChageCKHD();
    }
    this.visibleNCCShip = false;
  }

  closePayment() {
    this.visiblePayment = false;
  }

  savePayment(event: any) {
    this.model = event.model;
    this.visiblePayment = false;
  }

  private $datepipe = inject(DatePipe);
  private _confirmationService = inject(ConfirmationService);
  private panZoomAPI!: PanZoomAPI;
  private apiSubscription!: Subscription;
  private modelChangedSubscription!: Subscription;
  private $spinner = inject(NgxSpinnerService);
  private $serviceFinancial = inject(financialControlSystemService);
  private $serviceProduct = inject(ProductManagerService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
  private $activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private initPanzoomConfig(): PanZoomConfig {
    return {
      ...new PanZoomConfig(this.panZoomConfigOptions),
      // initialZoomToFit: this.getInitialZoomToFit()
    };
  }

  private getCssScale(zoomLevel: any): number {
    return Math.pow(this.panzoomConfig.scalePerZoomLevel, zoomLevel - this.panzoomConfig.neutralZoomLevel);
  }


}
