import {Component, OnInit} from '@angular/core';
import {InvoiceService} from './services/invoice/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular 15 CRUD example';
  constructor(
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit() {
    // this.invoiceService.fetchInvoices();
  }
}
