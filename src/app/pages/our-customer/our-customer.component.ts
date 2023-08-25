import {Component} from '@angular/core';

@Component({
  selector: 'app-our-customer',
  templateUrl: './our-customer.component.html',
  styleUrls: ['./our-customer.component.scss']
})
export class OurCustomerComponent {
  displayLogin: boolean = false;
  images = [
    {
      itemImageSrc: '/assets/images/customer/sl1.png',
      title: 'Ứng dụng công nghệ',
      alt: 'TRÍ TUỆ NHÂN TẠO',
    },
    {
      itemImageSrc: '/assets/images/customer/sl1.png',
      title: 'Ứng dụng công nghệ',
      alt: 'TRÍ TUỆ NHÂN TẠO',
    },

  ];

  onBackLogin() {
    this.displayLogin = true;
  }
}
