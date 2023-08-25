import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../services/auth/auth.service';

const queryString = require('query-string');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userName = 'Admin';
  avatarUrl = '';
  items: MenuItem[] = [];
  isShowChangePassword = false;
  modelPass = {
    userLogin: '',
    userPassword: '',
    userPassCf: ''
  };
  chooseOrga = false;
  confimPassword = false;
  submitPass = false;
  organizeRole = null;
  listmenuChecks = [];
  menuItems: any[] = [];
  urlsForDisableOrgan = [];
  isShowPass = false;
  isShowRepass = false;

  // changeTheme(theme: string) {
  //     this.themeService.switchTheme(theme);
  // }

  detailOrganizes = [];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {
    this.userName = this.auth.getUserName();
    this.items = [
      {
        label: 'Thay đổi mật khẩu',
        icon: 'pi pi-user-edit',
        command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-refresh',
        command: () => {
          this.logout();
        }

      },
    ];
  }

  logout() {

  }

  changePassword() {

  }

  ngOnInit() {
  }

  update() {

  }

  delete() {

  }

  goToHome() {
    this.router.navigate(['/home']);
    // const pathname = window.location.pathname;
    //   let pathUrl = pathname.split("/");
    //   let pathUrl1 = '/';
    //   pathUrl1 = pathUrl1.concat(pathUrl["1"])
    //   if(pathUrl[2]){
    //       pathUrl1 = pathUrl1.concat("/").concat(pathUrl["2"])
    //   }
    //   this.organizeInfoService.organizeInfo$.subscribe((results: any) => {
    //       if(results && results.length>0){
    //        const queryParams = queryString.stringify({ organizeIds: results });
    //         this.apiService.getUserMenus(queryParams).subscribe(results => {
    //              if (results.status === 'success') {
    //                  this.menuItems = results.data;
    //                  this.convetArry(this.menuItems);
    //                   if(this.listmenuChecks.map(d => d.path).indexOf(pathUrl1) < 0) {
    //                       this.router.navigate(['/404']);
    //                   }else{
    //                     // this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Không có quyền truy cập' });
    //                     this.router.navigate(['/home']);
    //                   }
    //                  this.menuItems = [...this.menuItems];
    //              }
    //          });
    //       }else{
    //           this.router.navigate(['/404']);
    //       }
    //   });

  }


}
