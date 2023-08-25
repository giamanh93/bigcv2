import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import queryString from 'query-string';
import {Subject, takeUntil} from 'rxjs';
import {PurchaseOrderService} from '../../../services/purcher-order.service';

@Component({
  selector: 'child-avatar',
  template: `
    <div *ngIf="isImage">
      <p-image *ngIf="value" [src]="value" alt="Image" width="50" [appendTo]="'body'"
               [preview]="true"></p-image>

      <!--      <p-avatar *ngIf="!value" icon="pi pi-user" styleClass="mr-2" [style]="{'background-color': '#0a58ca', 'color': '#f68c1f'}"-->
      <!--                styleClass="d-flex" [shape]="isCircle ? 'circle' : ''"></p-avatar>-->
    </div>
    <div *ngIf="!isImage">
      <p-avatar image="{{value}}" [style]="{'display': 'flex'}" size="large" [shape]="isCircle ? 'circle' : ''"
                styleClass="d-flex"></p-avatar>
    </div>
  `
})
export class AgGridImageComponent implements OnInit {
  public value: any = '';
  isImage = true;
  isCircle = true;

  agInit(params: any) {
    const queryParams = queryString.stringify({pathToFie: params.data.pathToFile, fileName: params.data.fileName});
    this.$service.previewImage(queryParams)
      .subscribe((results: any) => {
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            this.value = reader.result;
          },
          false,
        );
        const image: any = results;
        reader.readAsDataURL(image);
      });

    if (params.colDef.cellClass && params.colDef.cellClass.length > 0) {
      this.isCircle = params.colDef.cellClass.indexOf('square') > -1 ? false : true;
    } else {
      this.isCircle = true;
    }
    if (params.data && params.data.hasOwnProperty('back_url') && params.data.hasOwnProperty('front_url')) {
      this.isImage = false;
    } else {
      this.isImage = true;
    }
  }

  ngOnInit() {
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);

}
