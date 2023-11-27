import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CellValueChangedEvent, ColDef, RowNode} from 'ag-grid-community';
import numeral from 'numeral';
import {MessageService} from 'primeng/api';
import {Subject,} from 'rxjs';
import {TotalValueFooterComponent} from '../total-value-component/total-value-component';
import {DropdownRenderComponent} from './dropdown-render/dropdown-render.component';

@Component({
  selector: 'app-list-grid-angular',
  templateUrl: './list-grid-angular.component.html',
  styleUrls: ['./list-grid-angular.component.css']
})
export class ListGridAngularComponent implements OnInit, OnChanges {
  @Input() listsData: Array<any> = [];
  @Output() FnClick = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() firstDataRendered = new EventEmitter<any>();
  @Output() cellDoubleClicked = new EventEmitter<any>();
  @Output() onRowSelectedCallback = new EventEmitter<any>();
  @Output() rowGroupOpenedCallback = new EventEmitter<any>();
  @Output() onCellClicked = new EventEmitter<any>();
  @Output() cellValueChanged = new EventEmitter<any>();
  @Output() callback = new EventEmitter<any>();
  @Output() callbackGridReady = new EventEmitter<any>();
  @Output() showConfig = new EventEmitter<any>();
  @Input() columnDefs: Array<any> = [];
  @Input() masterDetail: boolean = false;
  @Input() isConfig: boolean = true;
  @Input() rowDragManaged: boolean = true;
  @Input() rowSelection: string = 'single';
  @Input() frameworkComponents = {
    dropdownRender: DropdownRenderComponent
  };
  columnTypes: {
    [key: string]: ColDef;
  } = {
    valueColumn: {
      editable: true,
      valueParser: 'Number(newValue)',
      filter: 'agNumberColumnFilter',
    },
  };
  @Input() getRowId: any = null;
  @Input() groupDisplayType: any = '';
  @Input() detailCellRendererParams: any = null;
  @Input() autoGroupColumnDef: any = {};
  @Input() noRowsTemplate: any = 'Không có kết quả phù hợp';
  @Input() floatingFilter: boolean = false;
  @Input() groupDefaultExpanded: number = 1;
  @Input() buttons = [];
  @Input() isShowButton: boolean = false;
  @Input() isShowTotalBottom: boolean = false;
  @Input() title: string = '';
  @Input() idGrid: string = 'myGrid';
  @Input() typeConfig: string = 'myGrid';
  @Input() columnsWithAggregation: any[] = []; // danh sách sum bottom
  @Input() defaultColDef: any = {
    tooltipComponent: 'customTooltip',
    resizable: true,
    suppressSorting: false,
    sortable: false,
    suppressColumnMove: false,
    lockPosition: 'left',
    filter: true,
    // floatingFilter: true,
    flex: 1,
    rowHeight: 90,
    cellClass: [],
    tooltipComponentParams: {color: '#ececec'},
  };
  @Input() domLayout: string = '';
  @Input() components: any;
  @Input() height: number = 0;
  @Input() heightRow: number = 37;
  @Input() headerHeight: number = 35;
  @Input() floatingFiltersHeight: number = 35;
  @Input() getContextMenuItems: any = null;
  @Input() pinnedBottomData: any[] = [];
  @Input() excelStyles: any[] = [
    {
      id: 'stringType',
      dataType: 'string'
    },
    {
      id: 'dateFormat',
      dataType: 'dateTime',
      numberFormat: {format: 'mm/dd/yyyy;@'},
    },
    {
      id: 'text-right',
      dataType: 'number',
      numberFormat: {format: '#,##0'},
    }
  ];
  sideBar: any;
  gridApi: any;
  getRowHeight: any;
  gridColumnApi: any;
  heightAuto = 0;
  tooltipShowDelay = 0;
  titlePage = '';
  listsDataCloone = [];
  isRowMaster: any;
  @Input() rowClassRules: any = {
    'border-row': (params: any) => {
      if (params.data.hasOwnProperty('color') && params.data.color === '#495057') {
        return true;
      } else if (params.data.hasOwnProperty('color') && params.data.color == '#495057') {
        return true;
      } else {
        return false;
      }
    },
    'bg-green-400': (params: any) => params.data.hasOwnProperty('color') && params.data.color === 'bg-green-400',
    'bg-orange-400': (params: any) => params.data.hasOwnProperty('color') && params.data.color === 'bg-orange-400'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private elem: ElementRef,
    private messageService: MessageService,
  ) {


    this.tooltipShowDelay = 0;
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Ẩn hiện cột',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: false,
            suppressValues: false,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
            suppressSyncLayoutWithGrid: true,
            suppressColumnMove: false,
          },
        },
      ],
      defaultToolPanel: '',
    };

    this.getRowHeight = (params: any) => {
      if (params.node && params.node.detail) {
        const offset = 80;
        const allDetailRowHeight = params.data.childrens.length > 5 ? params.data.childrens.length * 37 : 200;
        return allDetailRowHeight + offset;
      } else {
        return this.heightRow;
      }
    };

    this.isRowMaster = (dataItem: any) => {
      if (dataItem) {
        if (dataItem.Details) {
          return dataItem && dataItem.Details ? dataItem.Details.length > 0 : false;
        } else {
          return false;
        }
      } else {
        return false;
      }

    };
  }

  ngOnInit(): void {
  }

  CellClicked(event: any) {
    // this.onCellClicked.emit(event);
  }

  rowGroupOpened(event: any) {
    if (this.groupDisplayType !== 'groupRows') {
      event.node.setSelected(true);
      this.rowGroupOpenedCallback.emit(event);
    }
  }

  onRowSelected(event: any) {
    // if (this.groupDisplayType !== 'groupRows') {
    //   event.node.setSelected(true)
    //   this.rowGroupOpenedCallback.emit(event);
    // }
    this.callback.emit(this.gridApi.getSelectedRows());
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.callbackGridReady.emit(params);
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
    this.columnsWithAggregation.forEach(element => {
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        // if(rowNode.index < 10){
        // console.log(rowNode);
        // }
        if (element === 'customerName') {
          target[element] = `Khách hàng: ${this.listsData.length} `;
        } else if (element === 'productName') {
          target[element] = `Sản phẩm: ${this.listsData.length} `;
        } else if (element === 'supplierName') {
          target[element] = `NCC: ${this.listsData.length} `;
        } else if (element === 'areaName') {
          target[element] = `Khu vực: ${this.listsData.length} `;
        } else if (element === 'purchaseDate') {
          target[element] = `Count: ${this.listsData.length} `;
        } else if (element === 'code') {
          target[element] = `Count: ${this.listsData.length} `;
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

  // containsOnlyNumbers(str: string) {
  //   // return /^-?\\d/.test(str);
  //   return /^[\0-9,.]\S*$/g.test(str);
  // }
  //
  // containsOnlyNumbersEmpty(str: string) {
  //   // return /^-?\\d/.test(str);
  //   if (str === '' || str === null) {
  //     return true;
  //   }
  //   return /^[\0-9,.]\S*$/g.test(str);
  // }

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
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('groupDefaultExpanded') && this.gridApi) {
      changes['groupDefaultExpanded']['currentValue'] === 1 ? this.gridApi.expandAll() : this.gridApi.collapseAll();
    }
    this.heightAuto = this.height;
  }

  onGridSizeChanged(params: any) {
    console.log(params);
    // // option chưa dùng được
    // // get the current grids width
    // var gridWidth: any = document.getElementById(this.idGrid);
    // var columnsToShow = [];
    // var columnsToHide = [];
    // var totalColsWidth = 0;
    // var allColumns = params.columnApi.getAllColumns();
    // for (var i = 0; i < allColumns.length; i++) {
    //   let column = allColumns[i];
    //   totalColsWidth += column.getMinWidth();
    //   if (totalColsWidth > gridWidth.offsetWidth) {
    //     columnsToHide.push(column.colId);
    //   } else {
    //     columnsToShow.push(column.colId);
    //   }
    // }

    // // show/hide columns based on current grid width
    // params.columnApi.setColumnsVisible(columnsToShow, true);
    // params.columnApi.setColumnsVisible(columnsToHide, false);

    // // fill out any available space to ensure there are no gaps
    // params.api.sizeColumnsToFit();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  FncellEditingStopped(event: any) {
    if (event.value && ((event.column.colId === 'price')
      || (event.column.colId === 'discount')
      || (event.column.colId === 'vat')
      || (event.column.colId === 'quantity'))) {
      const newData = event.data;
      if (this.containsOnlyNumbers(newData.price) && this.containsOnlyNumbers(newData.quantity)) {
        const price: any = numeral(newData.price).value();
        const quantity: any = numeral(newData.quantity).value();
        let discount: any = 0;
        let vat: any = 0;
        if (newData.discount === '' || newData.discount === null) {
          discount = 0;
        } else {
          discount = this.containsOnlyNumbersEmpty(newData.discount) ? numeral(newData.discount).value() : 0;
        }
        if (newData.vat === '' || newData.vat === null) {
          vat = 0;
        } else {
          vat = this.containsOnlyNumbersEmpty(newData.vat) ? numeral(newData.vat).value() : 0;
        }
        let amount = 0;
        if (discount < 100) {
          amount = (price * quantity) * (1 - discount / 100.00);
        } else {
          amount = (price * quantity) - discount;
        }
        let amountt = 0;
        if (vat < 100) {
          amountt = amount * (1 + vat / 100.00);
        } else {
          amountt = amount + vat;
        }
        newData.amount = numeral(amountt).format('0,0');
        newData.amount = numeral(newData.amount).value();
        this.gridApi.applyTransaction({update: [newData]});
        event.isChangePrice = event.column.colId === 'price' ? true : false;
        this.callbackGridReady.emit(event);
      }
    } else {
      this.callbackGridReady.emit(event);
    }
  }

  fnCellValueChanged(event: any) {
    // cập nhật lại dữ liệu bottom
    // if (event.value && ((event.column.colId === 'price') || (event.column.colId === 'quantity')) && event.value !== event.oldValue) {
    // if (this.isShowTotalBottom) {
    //   const pinnedBottomData = this.generatePinnedBottomData();
    //   this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    // }
  }

  onFirstDataRendered(event: any) {
    this.autoSizeAll(false);
    if (this.isShowTotalBottom) {
      const pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedTopRowData([pinnedBottomData]);
    }
    // let allColumnIds: any = [];
    // this.gridColumnApi.getAllColumns()
    //   .forEach((column: any) => {
    //     if (column.colDef.cellClass && column.colDef.cellClass.indexOf('not-auto') < 0) {
    //       allColumnIds.push(column)
    //     } else {
    //       column.colDef.resizable = false;
    //     }
    //   });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    // this.autosizeAll2();
  }

  onCellValueChanged(params: CellValueChangedEvent) {
    const changedData = [params.data];
    console.log(changedData);
    params.api.applyTransaction({update: changedData});
  }


  handleScroll(event: any) {
    // const grid = document.getElementById(`${this.idGrid}`);
    // if (grid && this.gridColumnApi) {
    //   if ((event.left > 0) || (event.left > 200 && event.left < 220)
    //     || (event.left > 400 && event.left < 420)
    //     || (event.left > 600 && event.left < 620)
    //     || (event.left > 800 && event.left < 820)
    //     || (event.left > 1200)) {
    //     const gridBody = grid.querySelector('.ag-body-viewport') as any;
    //     this.autoSizeAll(false);
    //   }
    // }
  }

  autosizeAll2() {
    setTimeout(() => {
      this.gridApi.hideOverlay();
      const grid = document.getElementById(`${this.idGrid}`);
      if (grid) {
        const container = this.elem.nativeElement.querySelectorAll(`#${this.idGrid}`);
        if (container[0] && (this.gridColumnApi.columnModel.scrollWidth >= this.gridColumnApi.columnModel.bodyWidth) && this.gridApi) {
          this.gridApi.sizeColumnsToFit();
        } else {
          const allColumnIds: any = [];
          this.gridColumnApi.getAllColumns()
            .forEach((column: any) => {
              if (column.colDef.cellClass && column.colDef.cellClass.indexOf('not-auto') < 0) {
                allColumnIds.push(column);
              } else {
                column.colDef.resizable = false;
              }
            });
          this.gridColumnApi.autoSizeColumns(allColumnIds, false);
        }
      }
    }, 100);
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column: any) => {
      allColumnIds.push(column);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  private readonly unsubscribe$: Subject<void> = new Subject();


}
