import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-loading-grid',
  templateUrl: './loading-grid.component.html',
  styleUrls: ['./loading-grid.component.css']
})
export class LoadingGridComponent implements OnInit {
  private $errorService = inject(ErrorService)
  @Input() gridtype = 'hsns';
  @Input() cols: any[] = [];
  @Input() lists = 20;
  listThs: any[] = [];
  isLoad = true;
  public listDatasLoading: any[] = [];
  async ngOnInit() {
    this.listDatasLoading = Array(this.lists).fill(1).map((x, i) => i)
    this.$errorService.fetchError().subscribe((res: number) => {
      if (res === 404 || res === 500) {
        this.isLoad = false;
      }
    })

  }
}

