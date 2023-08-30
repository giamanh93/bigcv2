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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90]
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
