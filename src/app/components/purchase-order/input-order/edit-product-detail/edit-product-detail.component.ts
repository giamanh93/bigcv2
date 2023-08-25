import {
  AfterViewInit
  , ChangeDetectorRef
  , Component, ElementRef
  , EventEmitter
  , inject
  , Input
  , OnDestroy
  , OnInit
  , Output
} from '@angular/core';
import {ColDef, GetRowIdFunc, GetRowIdParams, RowNode} from 'ag-grid-community';
import {NgxSpinnerService} from 'ngx-spinner';
import {getNumericCellEditor} from 'src/app/common/function/function-common';
import {AgGridFn, cellRendererSanPham, formatMargin, TextFormatter} from 'src/app/common/function/lib';
import {PurchaseOrderService} from 'src/app/services/purcher-order.service';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {MessageService} from 'primeng/api';
import numeral from 'numeral';
import {ContentBase64} from '../input-order.component';
import {PanZoomAPI, PanZoomConfig, PanZoomConfigOptions, PanZoomModel} from 'ngx-panzoom';
import {Rect} from 'ngx-panzoom/lib/types/rect';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}

@Component({
  selector: 'app-edit-product-detail',
  templateUrl: './edit-product-detail.component.html',
  styleUrls: ['./edit-product-detail.component.scss'],

})
export class EditProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() displayEdit = false;
  @Output() callBack = new EventEmitter<any>();
  @Input() product: any = null;
  @Input() contentItems: ContentBase64[] = [];
  public columnDefs: ColDef[] = [];
  public listDatas: any[] = [];
  heightGrid: number = 240;
  linkImagebase64: string | ArrayBuffer | null = '';
  isUploadFile: boolean = false;
  public panZoomConfigOptions: PanZoomConfigOptions = {
    zoomLevels: 10,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.01,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'left',
  };
  panzoomConfig: PanZoomConfig = new PanZoomConfig(this.panZoomConfigOptions);
  public cols: any[] = [
    {field: 'productName', header: 'Tên sản phẩm', typeField: 'text', editable: true, cellEditor: 'agTextCellEditor'},
    {field: 'quantity', header: 'Số lượng', editable: true, cellEditor: 'agTextCellEditor', typeField: 'text'},
    {field: 'price', header: 'Đơn giá', editable: true, cellEditor: 'agTextCellEditor', typeField: 'text'},
  ];
  components = {numericCellEditor: getNumericCellEditor()};

  listDataSelect: any[] = [];
  gridApi: any = null;
  gridColumnApi: any = null;
  state: string = '';
  canvasWidth = 600;
  initialZoomHeight!: number; // set in resetZoomToFit()
  scale!: number;
  initialised = false;
  fieldsTotal: any[] = ['quantity', 'amount', 'discount'];

  constructor(
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.modelChangedSubscription.unsubscribe();
    this.apiSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.panzoomConfig = this.initPanzoomConfig();
    this.changeDetector.detectChanges();

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
    this.changeDetector.detectChanges();
  }
  ngOnInit(): void {
    this.isUploadFile = true;
    this.heightGrid = window.innerHeight - 220;
    this.listDatas = [...this.product.purchaseOrderDetail];
    this.onInitGrid();
  }

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
    this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
  }

  onInitGrid() {
    this.columnDefs = [
      // ...AgGridFn(this.cols),
      {
        maxWidth: 80,
        headerName: '',
        pinned: 'left',
        cellRenderer: (params: any) => params.rowIndex + 1,
        cellClass: ['border-right', 'no-auto', 'p-0'],
        rowDrag: true,
        field: 'checkbox22',
      },
      {
        headerName: 'Tên sản phẩm',
        field: 'productName',
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
      },
      {
        headerName: 'Số lượng',
        field: 'quantity',
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellEditorPopup: false,
        cellClass: (params: any) => {;
          return this.containsOnlyNumbers(params.data.quantity)
            ? [] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell'] : [];
        }
      },
      {
        headerName: 'Đơn giá',
        field: 'price',
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellRenderer: (params: any) => {
          return params.node.rowPinned !== 'bottom' ? numeral(params.value).format('0,0') : '';
        },
        cellClass: (params: any) => {
          return this.containsOnlyNumbers(params.data.price)
            ? [] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell'] : [];
        }
      },
      {
        headerName: 'Chiết khấu',
        field: 'discount',
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellRenderer: (params: any) => {
          return params.node.rowPinned !== 'bottom' ? numeral(params.value).format('0,0') : '';
        },
        cellClass: (params: any) => {
          return this.containsOnlyNumbersEmpty(params.data.discount)
            ? [] : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell'] : [];
        }
      },
      {
        headerName: 'Thành tiền',
        field: 'amount',
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellRenderer: (params: any) => {
         return  numeral(params.value).format('0,0');
        },
        cellClass: (params: any) => {
          return this.containsOnlyNumbers(params.value) ? []
            : params.node.rowPinned !== 'bottom' ? ['bg-orange-400', 'error-cell'] : [];
        }
      },
      {
        maxWidth: 50,
        headerName: '',
        pinned: 'right',
        cellClass: ['border-right', 'no-auto'],
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        field: 'checkbox2',
        suppressSizeToFit: true,
      },
    ];
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

  deleteRow() {
    this.gridApi.applyTransaction({remove: this.listDataSelect});
    const pinnedBottomData = this.generatePinnedBottomData();
    this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    //
    //
    //
    // const filtered = this.listDatas.filter((value, index, arr) => {
    //   return this.listDataSelect.map(d => d.productName).indexOf(value.productName) < 0;
    // });
    // this.listDatas = [];
    // setTimeout(() => {
    //   if (this.gridApi) {
    //     this.listDatas = [...filtered];
    //     this.gridApi.sizeColumnsToFit();
    //   }
    // }, 500);
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


  ageRangeValueGetter = (params: any) => {
    if (this.containsOnlyNumbers(params.data.price) && this.containsOnlyNumbers(params.data.quantity)) {
      const price = numeral(params.getValue('price')).value() || 0;
      const quantity = numeral(params.getValue('quantity')).value() || 0;
      return numeral(price * quantity).format('0,0[.][000]');
    }
    return null;
  }

  xacnhan() {
    const id: any = document.getElementById('my-table2');
    if (id.getElementsByClassName('p-sidebar-content error-cell').length > 0) {
      this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Dữ liệu không hợp lệ vui lòng kiểm tra lại. !'});
      return;
    }
    this.product.purchaseOrderDetail = this.listDatas.filter(item => item.productName);
    this.callBack.emit({isClose: false, product: this.product, linkBase64: this.linkImagebase64, contentItems: this.contentItems});
    this.displayEdit = false;
  }

  close() {
    this.callBack.emit({isClose: true, product: this.product});
    this.displayEdit = false;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      const pinnedBottomData = this.generatePinnedBottomData();
      pinnedBottomData.quantity = numeral(pinnedBottomData.quantity).format('0,0[.][000]');
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    }, 300);
  }


  addRow() {
    this.listDatas = [{
      'productName': '',
      'quantity': 2,
      'price': 10,
      'amount': 20
    }, ...this.listDatas];
    this.gridApi.setRowData(this.listDatas);
  }

  onUpload(event: UploadEvent) {
    this.handleUpload(event.currentFiles);
  }

  handleUpload(files: any) {
    const file = files[0];
    const reader = new FileReader();
    this.listDatas = [];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.isUploadFile = false;
      this.$spinner.show();
      const datas: any = reader.result;
      this.linkImagebase64 = reader.result || null;
      this.contentItems = [{
        contentFile: file.name,
        thumbnail: reader.result,
        id: 1
      }];
      const base64s = datas.split(',');
      this.$service.getInfoFromImage({base64: `${base64s[1]}`})
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(results => {
          if (results.success) {
            this.product = results.data;
            this.listDatas = this.product.purchaseOrderDetail;
            if (this.gridApi) {
              this.gridApi.setRowData(this.listDatas);
            }
            setTimeout(() => {
              if (this.gridApi) {
                // this.gridColumnApi.autoSizeAllColumns(false);
              } else {
                this.autoSizeAll(false);
              }
              this.isUploadFile = true;
            }, 200);
            this.$messageService.add({severity: 'success', summary: 'Error Message', detail: 'Xử lý dữ liệu thành công'});
            this.$spinner.hide();
          } else {
            // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
            this.$spinner.hide();
          }
        });
    };
  }

  autoSizeAll(skipHeader: boolean) {
    // const allColumnIds: string[] = [];
    // this.gridColumnApi.getColumns()!.forEach((column: any) => {
    //   allColumnIds.push(column);
    // });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  rotate() {
    this.state = this.state === 'default'
      ? 'rotated180'
      : this.state === 'rotated180'
        ? 'rotated90'
        : this.state === 'rotated90' ? 'rotated' : 'default';
  }

  private modelChangedSubscription!: Subscription;
  private panZoomAPI!: PanZoomAPI;
  private apiSubscription!: Subscription;

  private $messageService = inject(MessageService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $spinner = inject(NgxSpinnerService);

  private getCssScale(zoomLevel: any): number {
    return Math.pow(this.panzoomConfig.scalePerZoomLevel, zoomLevel - this.panzoomConfig.neutralZoomLevel);
  }

  private initPanzoomConfig(): PanZoomConfig {
    return {
      ...new PanZoomConfig(this.panZoomConfigOptions),
    };
  }

}
