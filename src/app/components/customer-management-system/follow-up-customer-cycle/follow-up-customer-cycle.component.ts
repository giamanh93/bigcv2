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
import {STATUS} from 'src/app/models/customer-management-system';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {customerManagementSystem} from 'src/app/services/customerManagementSystem.service';
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community';
import {AgGridFn, autoSizeAllGrid} from 'src/app/common/function/lib';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follow-up-customer-cycle',
  templateUrl: './follow-up-customer-cycle.component.html',
  styleUrls: ['./follow-up-customer-cycle.component.scss']
})

export class FollowUpCustomerCycleComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  screenWidth: number = 0;
  countRecord: CountRecord = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  };
  public listBranchs: Branch[] = [];
  public listDatas: any[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public fileName: string = '';
  public query: any = {
    retailerId: this.authService?.getRetailerId(),
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    period: 2,
    page: 1,
    size: 20,
    search: '',
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  };
  detailCellRendererParams: any = null;
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
  public colsDetail: any[] = [
    {field: 'period', header: `Tháng`, typeField: 'decimal', headerClass: 'bg-primary-reverse', cellClass: ['bg-primary-reverse']},
    {
      field: 'revenue',
      header: 'Doanh thu',
      typeField: 'decimal',
      aggFunc: 'sum',
      headerClass: 'bg-primary-reverse',
      cellClass: ['bg-primary-reverse']
    }
  ];
  public cols: any[] = [
    {field: 'customerId', header: '#', typeField: 'text', masterDetail: true},
    {field: 'customerName', header: 'Khách hàng', typeField: 'text', width: 300},
    {field: 'revenue', header: 'Doanh thu', typeField: 'decimal', aggFunc: 'sum'},
  ];

  listPeriod: STATUS[] = [
    {
      label: 'Theo tuần',
      value: 1
    },
    {
      label: 'Theo tháng',
      value: 2
    },
    {
      label: 'Theo quý',
      value: 3
    }
  ];

  first: number = 1;

  loadjs = 0;
  heightGrid = 0;
  displayFilter = false;

  isExpanded: boolean = true;

  constructor(private authService: AuthService) { this.query.retailerId = this.authService?.getRetailerId();
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.customerId + params.data.customerName;
  }

  initCols() {
    this.cols = [
      {field: 'customerId', header: '#', typeField: 'text', masterDetail: true},
      {field: 'customerName', header: 'Khách hàng', typeField: 'text', rowGroup: true, width: 300},
      {field: 'revenue', header: 'Doanh thu', typeField: 'decimal', aggFunc: 'sum'},
    ];
    this.onInitGrid();
  }

  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  refresh() {
    this.initCols();
    this.query.startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.query.endDate = new Date();
    this.query.period = 2;
    this.getLists();
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
          const colDefs = params.api.getColumnDefs();
          colDefs[0].headerName = `${this.query.period === 1 ? 'Tuần' : this.query.period === 2 ? 'Tháng' : 'Quý'}`;
          params.api.setColumnDefs(colDefs);
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
          autoSizeAllGrid(false, params.columnApi);
          // params.api.sizeColumnsToFit();
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
        const personName = params.data.customerName;
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
    } else {
      this.query.startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      this.query.endDate = new Date();
    }
    this.screenWidth = window.innerWidth;
    const _route: any = this.route.data;
    const titlePage = _route['_value'].title;
    this.fileName = titlePage;
    // this.itemsBreadcrumb = [
    //   {label: 'Trang chủ', routerLink: '/home'},
    //   {label: 'Quản trị khách hàng'},
    //   {label: `2. ${this.fileName}`},
    // ];
    this.getListBranch();
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

  search() {
    // this.initCols();
    this.getLists();
  }

  getLists() {
    this.listDatas = [];
    this.isLoading = true;
    const params = {...this.query};
    delete params.period;
    params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    localStorage.setItem('filterDate', JSON.stringify({endDate: params.endDate, startDate: params.startDate}));
    const queryParams = queryString.stringify(params);
    this.$service.getRevenueByCustomer(queryParams)
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
    if (event.data && event.data.childrens.length === 0) {
      const index = this.listDatas.findIndex(d => d.customerId === event.data.customerId);
      this.getDaitel(event.data.customerId, event);
    }
  }

  getDaitel(customerId: string, event: any) {
    const params = {...this.query, customerId: customerId};
    params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    localStorage.setItem('filterDate', JSON.stringify({endDate: params.endDate, startDate: params.startDate}));
    const queryParams = queryString.stringify(params);
    this.$service.getCustomerRevenueInPeriodDetail(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const itemsToUpdate: any[] = [];
          event.api.forEachNodeAfterFilterAndSort((rowNode: any, index: number) => {
            const data = rowNode.data;
            if (rowNode.data.customerId === customerId) {
              data.childrens = results.data.content;
              itemsToUpdate.push(data);
            }
          });
          event.api.applyTransaction({update: itemsToUpdate})!;
          setTimeout(() => {
            // console.log(event.api.getColumnDefs())
            // event.api.refreshHeader();
            event.api.resetRowHeights();
            // event.api.refreshServerSide({ route: customerId, purge: true })
            event.api.getDisplayedRowAtIndex(event.rowIndex)!.setExpanded(true);
          }, 0);
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $spinner = inject(NgxSpinnerService);
  private route = inject(ActivatedRoute);
  private $service = inject(customerManagementSystem);
  private $datepipe = inject(DatePipe);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);


}
