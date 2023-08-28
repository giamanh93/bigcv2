import {Component, OnInit, inject, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {finalize} from 'rxjs';
import {AuthService} from 'src/app/services/auth/auth.service';
import {parseJwt} from '../../services/auth/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() displayLogin: boolean = false;
  public options: FormlyFormOptions = {
    formState: {
      submitted: false,
    },
  };
  form = new FormGroup({});
  // model = {
  //   userName: '0983732396',
  //   password: 'Kiot@2023',
  //   retailer: 'ecofoods'
  // };
  model = {
    userName: '',
    password: '',
    retailer: ''
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    // translate.addLangs(['vi', 'en']);
    //     if (localStorage.hasOwnProperty('currentLang') && localStorage.getItem('currentLang') != null) {
    //         const getLang = localStorage.getItem('currentLang');
    //         translate.use(`${getLang}`);
    //     } else {
    //         translate.setDefaultLang('vi');
    //         translate.use('vi');
    //     }
  }


  handleLogin(): void {
    this.options.formState.submitted = true;
    if (this.form.valid) {
      const dataLogin: any = this.model;
      this.spinner.show();
      this.authService.login(dataLogin)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe({
          next: (response: any) => {
            if (response.success && response.data.access_token) {
              this.authService.loginSuccess(response.data);
              // this.router.navigateByUrl('/');
              this.spinner.hide();
              this.router.navigate(['/home']);
              this.options.formState.submitted = false;
              this.displayLogin = false;
              // this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đăng nhập thành công' });
            } else {
              this.spinner.hide();
              // this.isShowNotification = true;
              // this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đăng nhập thất bại'});
            }
          },
          error: (err: any) => {
            this.spinner.hide();
            // this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Đăng nhập thất bại'});
            setTimeout(() => {
            }, 3000);
            console.error(err);
          }
        });
    }

  }

  close() {
    this.callback.emit();
  }

  ngOnInit(): void {
    // if (this.authService.getToken()) {
    //   this.router.navigateByUrl('/');
    // }
    this.fields = [
      {
        key: 'retailer',
        type: 'nzInput',
        className: 'inputt show-label',
        defaultValue: '',
        focus: true,
        hooks: {
          onInit: (field) => {
            return field.className = this.model.retailer ? 'inputt show-label show-placeholder' : 'inputt show-label';
          },
        },
        templateOptions: {
          label: 'Mã cửa hàng',
          placeholder: 'Mã cửa hàng',
          required: true,
          value: 'vannd',
          type: 'text',
          focus: (field, event) => {
            field.className = field.className?.includes(' show-placeholder')
              ? field.className :  field.className + ' show-placeholder';
          },
          blur: (field, event) => {
            field.className = this.model.retailer
              ? field.className : field.className
                ? field.className.replace(' show-placeholder', '') : '';
          }
        }
      },
      {
        key: 'userName',
        className: 'inputt show-label',
        type: 'nzInput',
        defaultValue: '',
        hooks: {
          onInit: (field) => {
            return field.className = this.model.userName ? 'inputt show-label show-placeholder' : 'inputt show-label';
          },
        },
        templateOptions: {
          label: 'Tên đăng nhập',
          placeholder: 'Tên đăng nhập',
          required: true,
          value: 'vannd',
          type: 'text',
          focus: (field, event) => {
            field.className = field.className?.includes(' show-placeholder')
              ? field.className :  field.className + ' show-placeholder';
          },
          blur: (field, event) => {
            field.className = this.model.userName
              ? field.className : field.className
                ? field.className.replace(' show-placeholder', '') : '';
          }
        }
      },
      {
        key: 'password',
        className: 'inputt show-label',
        type: 'nzPassword',
        defaultValue: '',
        hooks: {
          onInit: (field) => {
            return field.className = this.model.password ? 'inputt show-label show-placeholder' : 'inputt show-label';
          },
        },
        templateOptions: {
          label: 'Mật khẩu',
          placeholder: 'Mật khẩu',
          required: true,
          value: 'vannd',
          type: 'password',
          focus: (field, event) => {
            field.className = field.className?.includes(' show-placeholder')
              ? field.className :  field.className + ' show-placeholder';
          },
          blur: (field, event) => {
            field.className = this.model.password
              ? field.className : field.className
                ? field.className.replace(' show-placeholder', '') : '';
          }
        }
      },
      {
        key: '',
        type: 'nzCheckbox',
        className: 'checkbox-login',
        defaultValue: '!Q2w3e4r5t',
        templateOptions: {
          label: 'Ghi nhớ đăng nhập',
          placeholder: '',
          required: false,
          value: '',
          type: 'checkbox'
        }
      },
      // {
      //   fieldGroupClassName: 'col-12',
      //   fieldGroup: [
      //     {
      //       key: 'phone',
      //       type: 'nzDropdown',
      //       className: 'col-8',
      //       templateOptions: {
      //         label: 'Select',
      //         placeholder: 'Select placeholder',
      //         required: true,
      //         options: [
      //           { label: 'Option 1', value: '1' },
      //           { label: 'Option 2', value: '2' },
      //           { label: 'Option 3', value: '3' },
      //         ]
      //       }
      //     },
      //     {
      //       key: 'password',
      //       type: 'nzInput',
      //       className: 'col-16',
      //       templateOptions: {
      //         label: 'Mật khẩu',
      //         placeholder: 'Mật khẩu',
      //         required: true,
      //         value: '123456a@',
      //       }
      //     },
      //   ]

      // },

      // {
      //   key: "offerings",
      //   type: "nzText",
      //   templateOptions: {
      //     addText: `<p>Bằng cách bấm vào nút đăng ký, bạn đã đồng ý với <a>Điều khoản dịch vụ và chính sách bảo mật</a> của Bizzone Cloud.</p?`,
      //   }
      // },

    ];
  }

  resetLoginError(): void {
    // this.isLoginFail = '';
  }

  forgotPassword(): void {
    this.router.navigateByUrl('/quen-mat-khau');
  }

  showPassword(): void {
    // this.isShoweyes = !this.isShoweyes
  }

  saveLang(lang: string) {
    localStorage.setItem('currentLang', lang);
    window.location.reload();
  }


  private _messageService = inject(MessageService);
}
