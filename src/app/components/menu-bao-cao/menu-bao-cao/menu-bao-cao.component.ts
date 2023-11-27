import {Component, inject, OnInit} from '@angular/core';
import {HrmBreadcrumb} from '../../../common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {financialControlSystemService} from '../../../services/financialControlSystem.service';
import {Branch} from '../../../models/early-warning';
import {AuthService} from '../../../services/auth/auth.service';
import {MenuItem} from 'primeng/api';
import {ProfitMarginReportComponent} from '../../customer-management-system/profit-margin-report/profit-margin-report.component';
import {UnProfitTableReportComponent} from '../../customer-management-system/un-profit-table-report/un-profit-table-report.component';
import {DamageRateExceedsNormComponent} from '../../customer-management-system/damage-rate-exceeds-norm/damage-rate-exceeds-norm.component';
import {
  DecreaseRevenueByCustomerComponent
} from '../../customer-management-system/decrease-revenue-by-customer/decrease-revenue-by-customer.component';

@Component({
  selector: 'app-menu-bao-cao',
  templateUrl: './menu-bao-cao.component.html',
  styleUrls: ['./menu-bao-cao.component.scss']
})
export class MenuBaoCaoComponent implements OnInit {

  itemsBreadcrumb: HrmBreadcrumb[] = [];
  public listBranchs: Branch[] = [];
  public itemsPanelMenu: MenuItem[] = [];

  ngOnInit() {
    this.itemsBreadcrumb = [
      {label: 'Tổng quan', routerLink: '/home'},
      {label: 'Báo cáo'},
    ];

    this.itemsPanelMenu = [
      {
        label: 'KHÁCH HÀNG',
        icon: 'pi pi-fw pi-file',
        routerLink: '/bao-cao/v1/customer-mgmt-system',
        expanded: true,
        items: [
          {
            label: 'Chu kỳ khách hàng',
            routerLink: '/bao-cao/v1/report/follow-up-customer-cycle',
          },
          {
            label: 'Chu kỳ doanh thu',
            routerLink: '/bao-cao/v1/report/follow-order-value',
          },
          {
            label: 'Chu kỳ sản phẩm',
            routerLink: '/bao-cao/v1/report/follow-up-customer-sales-product',
          },
          {
            label: 'Công nợ vượt định mức',
            routerLink: '/bao-cao/v1/report/debt-customer-report',
          },
        ]
      },
      {
        label: 'SẢN PHẨM',
        icon: 'pi pi-fw pi-pencil',
        expanded: true,
        items: [
          {
            label: 'Không đạt biên lợi nhuận',
            routerLink: '/bao-cao/v1/report/profit-margin-report',
          },
          {
            label: 'Không có lãi',
            routerLink: '/bao-cao/v1/report/un-profit-table-report',
          },
          {
            label: 'Hỏng, hủy',
            routerLink: '/bao-cao/v1/report/damage-rate-exceeds-norm',
          },
          {
            label: 'Giảm theo chu kỳ',
            routerLink: '/bao-cao/v1/report/decrease-revenue-by-customer',
          }
        ]
      },
      {
        label: 'NHÀ CUNG CẤP',
        icon: 'pi pi-fw pi-user',
        expanded: true,
        items: [
          {
            label: 'Có số lượng hàng hỏng, hủy',
          },
          {
            label: 'Có công nợ đến kỳ',
          },
        ]
      },
      {
        label: 'TÀI CHÍNH',
        icon: 'pi pi-fw pi-calendar',
        expanded: true,
        items: [
          {
            label: 'Lệch quỹ tiền mặt quá định mức',
          },
          {
            label: 'Lệch tiền chuyển về tài khoản',
          },
          {
            label: 'Lệch tiền chuyển về ngân hàng',
          }
        ]
      }
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
        } else {
          // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });

  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(financialControlSystemService);
  private authService = inject(AuthService);


}
