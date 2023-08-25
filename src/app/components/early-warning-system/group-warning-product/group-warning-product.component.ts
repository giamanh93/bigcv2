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
import {ColDef} from 'ag-grid-community';
import {MessageService} from 'primeng/api';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {AgGridFn} from 'src/app/common/function/lib';
import {Branch, CountRecord, ProductWarning, SearchEarlyWarning} from 'src/app/models/early-warning';
import {AuthService} from 'src/app/services/auth/auth.service';
import {EarlyWarningSystemService} from 'src/app/services/earlyWarningSystem.service';

@Component({
  selector: 'app-group-warning-product',
  templateUrl: './group-warning-product.component.html',
  styleUrls: ['./group-warning-product.component.scss']
})

export class GroupWarningProductComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  indexTab: number = 0;
  screenWidth: number = 0;
  countRecord: CountRecord = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  };
  public listBranchs: Branch[] = [];
  public listDatas: ProductWarning[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public query: SearchEarlyWarning = {
    retailerId: 0,
    search: '',
    page: 1,
    size: 20,
    branchId: localStorage.hasOwnProperty('branchId') && localStorage.getItem('branchId') ? Number(localStorage.getItem('branchId')) : 0,
  };
  public columnDefs: ColDef[] = [];
  public cols: any[] = [
    {field: 'productName', header: 'Sản phẩm', typeField: 'text'},
    {field: 'barCode', header: 'Mã', typeField: 'text'},
    {field: 'unit', header: 'Đơn vị', typeField: 'text'},
    {field: 'branchName', header: 'Chi nhánh', typeField: 'text'},
    {field: 'buyPrice', header: 'Giá mua', typeField: 'decimal'},
    {field: 'sellPrice', header: 'Giá bán', typeField: 'decimal'},
    {field: 'realMargin', header: 'Real margin', typeField: 'decimal'},
    {field: 'standardMargin', header: 'Standard margin', typeField: 'decimal'},
  ];

  first: number = 1;

  loadjs = 0;
  heightGrid = 0;
  displayFilter = false;

  constructor(private authService: AuthService) {
    this.query.retailerId = this.authService?.getRetailerId() ? this.authService?.getRetailerId() : 0;
  }

  ngAfterViewInit() {
    this.$changeDetech.detectChanges();
  }

  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols)
    ];
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
    this.screenWidth = window.innerWidth;
    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Cảnh báo sớm'},
      {label: '1. Nhóm cảnh báo liên quan đến sản phẩm'},
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
    this.isLoading = true;
    this.listDatas = [];
    switch (this.indexTab) {
      case 0:
        this.loadTab1();
        break;
      case 1:
        this.loadTab2();
        break;
      case 2:
        this.loadTab3();
        break;
      case 3:
        this.loadTab4();
        break;

      default:
        // this.loadTab1();
        break;
    }
  }

  loadTab1() {
    const queryParams = queryString.stringify(this.query);
    this.$service.getListProductNotProfitMargin(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
          this.fnCountRecord(results.data);
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  loadTab2() {
    const queryParams = queryString.stringify(this.query);
    this.$service.getListProductNotProfitMargin(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  loadTab3() {
    const queryParams = queryString.stringify(this.query);
    this.$service.getListProductNotProfitMargin(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  loadTab4() {
    const queryParams = queryString.stringify(this.query);
    this.$service.getListProductNotProfitMargin(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listDatas = results.data.content ?? [];
          this.isLoading = false;
        } else {
          this.listDatas = [];
          this.isLoading = false;
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  handleChange(index: number) {
    this.indexTab = index;
    this.getLists();
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
    const e: any = document.querySelector('.paginator');
    this.loadjs++;
    if (this.loadjs === 5) {
      if (b && b.clientHeight) {
        const totalHeight = b.clientHeight + c.clientHeight + e.clientHeight + 85;
        this.heightGrid = window.innerHeight - totalHeight;
        console.log(this.heightGrid);
        this.$changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
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

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(EarlyWarningSystemService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);

}
