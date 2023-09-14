import {Component, OnInit} from '@angular/core';
import {Event, RouterEvent, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs';
import {menus} from './sidebar-routes.config';
import {AuthService} from '../../services/auth/auth.service';
// import { menus } from './sidebar-routes.config';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  userName = 'Admin';
  items: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.userName = this.auth.getUserName();
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const pathname = window.location.pathname;
      if (this.menuItems.length > 0) {
        this.parseObjectProperties(this.menuItems, e.url);
        this.menuItems = [...this.menuItems];
        localStorage.setItem('menuItems', JSON.stringify(this.menuItems));
      } else {
        this.menuItems = menus.filter(menuItem => menuItem);
      }

    });

    this.items = [
      // {
      //   label: 'Thay đổi mật khẩu',
      //   icon: 'pi pi-user-edit',
      //   command: () => {
      //     this.changePassword();
      //   }
      // },
      {
        label: 'Đăng xuất',
        icon: 'pi pi-refresh',
        command: () => {
          this.logout();
        }

      },
    ];
  }

  changePassword() {

  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    const pathname = window.location.pathname;
    this.menuItems = menus.filter(menuItem => menuItem);
    this.parseObjectProperties(this.menuItems, pathname);
    this.menuItems = [...this.menuItems];
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  parseObjectProperties(obj: any[], pathname: string = '') {
    for (let k of obj) {
      if (k.routerLink) {
        // active menu con
        if (k.isExternalLink) {
          if (k.routerLink && pathname.includes(k.routerLink)) {
            k.styleClass = 'parent_active';
          } else {
            k.styleClass = 'parent_no_active';
          }
        } else {
          if (k.routerLink && pathname.includes(k.routerLink)) {
            k.styleClass = 'active';
          } else {
            k.styleClass = 'no-active';
          }
        }

      } else {
        //active cha
        if (k.code && pathname && pathname.split('/').indexOf(k.code) > -1 && k.class === 'navigation-header') {
          k.styleClass = 'parent_active';
        } else {
          k.styleClass = 'parent_no_active';
        }
      }

      if (k.hasOwnProperty('items') && Array.isArray(k.items) && k.items.length > 0) {
        this.parseObjectProperties(k.items, pathname);
      }
    }
  }


}
