import {HttpClient} from '@angular/common/http';
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
import {customerManagementSystem} from 'src/app/services/customerManagementSystem.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {AgGridFn} from 'src/app/common/function/lib';
import {ColDef, GridReadyEvent} from 'ag-grid-community';
import {DatasService} from 'src/app/services/datas.service';
import {ExcelService} from 'src/app/services/excel.service';
import {AuthService} from 'src/app/services/auth/auth.service';

const dataGrids = require('./datas.json');

@Component({
  selector: 'app-follow-form-shopping',
  templateUrl: './follow-form-shopping.component.html',
  styleUrls: ['./follow-form-shopping.component.scss']
})
export class FollowFormShoppingComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
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
  public fileName: string = 'Theo dõi theo hình thức mua hàng';
  public query: any = {
    retailerId: this.authService?.getRetailerId(),
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    page: 1,
    size: 20,
    search: '',
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  };

  public cols = [
    {field: 'customerId', header: '#', typeField: 'text', masterDetail: true},
    {field: 'customerName', header: 'Khách hàng', typeField: 'text', rowGroup: true, width: 300},
    {field: 'address', header: 'Địa chỉ', typeField: 'text'},
    {field: 'purchaseDate', header: 'Ngày hóa đơn', typeField: 'text'},
    {field: 'staff', header: 'Nhân viên bán', typeField: 'text'},
    {field: 'salePanel', header: 'Kênh bán', typeField: 'text'},
    {field: 'revenue', header: 'Doanh thu', typeField: 'decimal', aggFunc: 'sum'}
  ];
  times = 0;

  first: number = 1;

  loadjs = 0;
  heightGrid = 0;
  displayFilter = false;

  isExpanded: boolean = true;
  expandedRows: any = {};
  columnDefs: any[] = [];

  public defaultColDef: ColDef = {
    resizable: true,
  };

  constructor(private authService: AuthService) { this.query.retailerId = this.authService?.getRetailerId()
  }

  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  refresh() {
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
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Quản trị khách hàng'},
      {label: `3. ${this.fileName}`},
    ];
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
    // this.getLists();
  }

  getLists() {
    // this.listDatas = [];
    // this.isLoading = true;
    // const params = { ...this.query };
    // params.endDate = this.$datepipe.transform(this.query.endDate, 'yyyy-MM-dd');
    // params.startDate = this.$datepipe.transform(this.query.startDate, 'yyyy-MM-dd');
    // localStorage.setItem('filterDate', JSON.stringify({ endDate: params.endDate, startDate: params.startDate }));
    // const queryParams = queryString.stringify(params);
    // const startTime = new Date().getTime();

    // this.$http.get(`https://api-ecofoods.bigcv.vn/api/customer/v1/getCustomerRevenueByInvoiceCost?branchId=180921&endDate=2022-12-31&page=${this.query.page}&retailerId=717250&search=&size=${this.query.size}&startDate=2022-01-01`)
    //   .subscribe((results: any) => {
    //     console.log("this.listDatas", results.data.content)
    //     this.times = (new Date().getTime() - startTime)/1000;
    //     if (results.success) {
    //       this.listDatas = results.data.content ?? [];
    //       this.isLoading = false;
    //       this.fnCountRecord(results.data);

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
    this.getApi();
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
        const totalHeight = b.clientHeight + c.clientHeight + 12;
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
    if (this.listDatas.length > 0) {
      this.listDatas.forEach(data => {
        this.expandedRows[data.customer.customerName] = this.isExpanded;
      });
    } else {
      this.expandedRows = {};
    }
  }

  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols)
    ];
    this.listDatas = dataGrids;
  }

  exportExcel() {
    const wscols = [
      {wch: 15},
      {wch: 45},
      {wch: 20},
      {wch: 10},
      {wch: 10},
      {wch: 10},
      {wch: 10},
    ];

    // { field: "customerId", header: "#", typeField: 'text', },
    // { field: "customerName", header: "Khách hàng", typeField: 'text', rowGroup: true, width: 300 },
    // { field: "address", header: "Địa chỉ", typeField: 'text' },
    // { field: "purchaseDate", header: "Ngày hóa đơn", typeField: 'text' },
    // { field: "staff", header: "Nhân viên bán", typeField: 'text' },
    // { field: "salePanel", header: "Kênh bán", typeField: 'text' },
    // { field: "revenue", header: "Doanh thu", typeField: 'decimal', aggFunc: 'sum' }
    const dataExcels = this.listDatas.map(item => {
      return {
        '#': item.customerId,
        'Khách hàng': item.customerName,
        'Địa chỉ': item.address,
        'Ngày hóa đơn': item.purchaseDate,
        'Nhân viên bán hàng': item.staff,
        'Kênh bán': item.salePanel,
        'Doanh thu': item.revenue,
      };
    });
    this.$excelService.exportAsExcelFile(dataExcels, 'sample');
    // let element = document.getElementById('my-table');
    // const ws:XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const wb:XLSX.WorkBook = XLSX.utils.book_new();
    // ws['!cols'] = wscols;
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, `${this.fileName}.xlsx`,{ bookType: 'xlsx', type: 'buffer' });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.$datasService.Datas$.subscribe(results => {
      if (results.length > 0) {
        this.listDatas = results;
      } else {
        this.getApi();
      }
      console.log(results);
    });

  }

  getApi() {
    // const startTime = new Date().getTime();
    // this.$http
    //   .get<any[]>(
    //     `https://api-ecofoods.bigcv.vn/api/customer/v1/getCustomerRevenueByInvoiceCost?branchId=180921&endDate=2022-12-31&page=${this.query.page}&retailerId=717250&search=&size=${this.query.size}&startDate=2022-01-01`
    //   )
    //   .subscribe((results: any) => {
    //     this.listDatas = results.data.content;
    //     console.log(JSON.stringify(this.listDatas))
    //     this.$datasService.setStocks(this.listDatas)
    //     this.times = (new Date().getTime() - startTime)/1000;
    //     this.fnCountRecord(results.data);
    //   });
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $datasService = inject(DatasService);
  private $excelService = inject(ExcelService);
  private $service = inject(customerManagementSystem);
  private $http = inject(HttpClient);
  private $datepipe = inject(DatePipe);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);

}
