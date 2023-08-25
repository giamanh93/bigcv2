/* tslint:disable */
import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'tooltip-component',
  template: ` <div  class="custom-tooltip" *ngIf="data.errorPrice" [style.background-color]="color">
<!--      <h3 style="">{{ data.productId.productName }}</h3>-->
    <span>Đơn giá cuối: <span class="price">{{data.priceOld | number}}</span> </span>
<!--    <p><span>Total: </span>{{ data.total }}</p>-->
  </div>`,
  styles: [
    `
      :host {
        z-index: 9999999;
        position: absolute;
        width: 150px;
        height: 70px;
        pointer-events: none;
        transition: opacity 1s;
      }
      .custom-tooltip{
        h3{
          background: #ccc;
          font-size: 12px;
          color: #2d2d2d !important;
          padding: 8px !important;
          margin-bottom: 0px !important;
        }
        &>span{
          padding: 14px 5px;
          display: block;
        }
        .price{
          font-weight: 600;
        }
      }
      :host.ag-tooltip-hiding {
        opacity: 0;

      }

      .custom-tooltip p {
        margin: 5px;
        padding-bottom: 5px

      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  public data!: any;
  public color!: string;

  agInit(params: { color: string } & ITooltipParams): void {
    this.params = params;

    this.data = params.api!.getDisplayedRowAtIndex(params.rowIndex!)!.data;
    this.color = this.params.color || 'white';
  }
  private params!: { color: string } & ITooltipParams;
}
