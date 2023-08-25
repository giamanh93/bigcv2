import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})

export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
 
  constructor(
    private router: Router) {
  }
  ngOnInit() {
   
  }

  changeTheme(theme: string) {
}
  
}
