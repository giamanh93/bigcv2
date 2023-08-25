import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'total-value-component',
  template: `<span style="color: {{ color }}; font-weight: {{ fontWeight }};"
    >{{ prefix }} {{ cellValue }}</span
  >`,
})
export class TotalValueFooterComponent implements ICellRendererAngularComp {
  public cellValue = '';
  public color = '';
  public fontWeight = '';
  public prefix = '';

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    
    this.cellValue = params.value;
    this.color = params.node.footer ? 'navy' : '';
    console.log("params", params)

    this.fontWeight =  params.node.footer && params.node.level === -1 ? 'bold' : '';
    if (params.node.footer) {
    console.log("params1", params)

      this.prefix = params.node.level === -1 ? 'Grand Total' : 'Sub Total';
    }
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
