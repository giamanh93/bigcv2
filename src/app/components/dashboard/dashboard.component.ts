import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { Branch, CountRecord } from 'src/app/models/early-warning';
import { customerManagementSystem } from 'src/app/services/customerManagementSystem.service';
import { AgGridFn, autoSizeAllGrid } from 'src/app/common/function/lib';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  ngOnInit(): void {
   
    this.itemsBreadcrumb = [
      { label: 'Trang chủ', routerLink: '/home' },
      { label: 'Giới thiệu', routerLink: '/home' }
    ];
  }


}
