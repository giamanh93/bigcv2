import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-our-customer',
  templateUrl: './our-customer.component.html',
  styleUrls: ['./our-customer.component.scss']
})
export class OurCustomerComponent implements OnInit {

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

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  onBackLogin() {
    this.displayLogin = true;
  }

  showLogin() {
    this.router.navigate(['/login']);
  }

}
