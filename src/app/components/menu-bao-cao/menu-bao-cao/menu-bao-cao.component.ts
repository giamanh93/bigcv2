import {Component, inject, OnInit} from '@angular/core';
import {HrmBreadcrumb} from '../../../common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {financialControlSystemService} from '../../../services/financialControlSystem.service';
import {Branch} from '../../../models/early-warning';
import {AuthService} from '../../../services/auth/auth.service';
import {MenuItem} from 'primeng/api';

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
        label: 'File',
        icon: 'pi pi-fw pi-file',
        routerLink: '/bao-cao/#/customer-mgmt-system',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
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
