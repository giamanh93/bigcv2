import {DatePipe} from '@angular/common';
import {Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener} from '@angular/core';
import {MessageService} from 'primeng/api';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {HrmBreadcrumb} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import {Branch, CountRecord} from 'src/app/models/early-warning';
import {customerManagementSystem} from 'src/app/services/customerManagementSystem.service';
import {AgGridFn, autoSizeAllGrid} from 'src/app/common/function/lib';
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  dataChart: any;

  options: any;
  ngOnInit(): void {

    this.itemsBreadcrumb = [
      {label: 'Trang chủ', routerLink: '/home'},
      {label: 'Giới thiệu', routerLink: '/home'}
    ];

    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataChart = {
      labels: ['20/08', '21/08', '22/08', '23/08', '24/08', 'Hôm qua', 'Hôm nay'],
      datasets: [
        {
          label: 'Số lượng đơn theo ngày',
          backgroundColor: documentStyle.getPropertyValue('--primary-600'),
          borderColor: documentStyle.getPropertyValue('--primary-600'),
          data: [30, 70, 130, 160, 90, 10, 70]
        },
        {
          label: 'Doanh thu theo ngày',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [70, 210, 90, 160, 135, 20, 160]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }


}
