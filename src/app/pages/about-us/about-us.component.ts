import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  images = [
    {
      itemImageSrc: '/assets/images/about/sl1.png',
      title: 'CUNG CẤP DỊCH VỤ TƯ VẤN',
      alt: '& TRIỂN KHAI IoT, IIoT CHUYÊN NGHIỆP',
    },
    {
      itemImageSrc: '/assets/images/about/sl1.png',
      title: 'CUNG CẤP DỊCH VỤ TƯ VẤN',
      alt: '& TRIỂN KHAI IoT, IIoT CHUYÊN NGHIỆP',
    },

  ];
  displayLogin: boolean = false;
  constructor(private router: Router) {
  }
  onBackLogin() {
    this.displayLogin = true;
  }

  showLogin() {
    this.router.navigate(['/login']);
  }
}
