// Author: T4professor

import {Component, OnInit} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {MenuItem} from 'primeng/api';

// import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: `
<!--    <p-splitButton *ngIf="items.length > 0" [label]="this.params.buttons[0].label" styleClass="p-button-sm p-button-outlined"-->
<!--                   (onClick)="onClick($event, 0)" [model]="items" [appendTo]="'body'"></p-splitButton>-->



<ng-container *ngIf="this.params.data.syncMessage === 'PROCESSING'; else buttonOther">
  <div class="flex justify-content-center align-items-center">
    <p-progressSpinner styleClass="w-2rem h-2rem" strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s"></p-progressSpinner>
  </div>
</ng-container>
<ng-template #buttonOther>
  <p-button *ngIf="items.length > 0" [label]="this.params.buttons[0].label"  (onClick)="onClick($event, 0)"
            styleClass="p-button-sm p-button-outlined"></p-button>
</ng-template>
  `
})

export class ButtonAgGridComponent implements ICellRendererAngularComp {

  params: any;
  items: MenuItem[] = [];
  label: string = '';

  agInit(params: any): void {
    this.params = params;
    console.log(this.params.buttons[0].disabled)
    for (const index in this.params.buttons) {
      if (!this.params.buttons[index].hide) {
        const object = {
          label: this.params.buttons[index].label,
          icon: this.params.buttons[index].icon,
          key: this.params.buttons[index].key,
          command: ($event: any) => {
            this.onClick($event, index);
          }
        };
        this.items.push(object);
      }

    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any, idx: any) {
    if (this.params.buttons[idx].onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        index: this.params.rowIndex
        // ...something
      };
      this.params.buttons[idx].onClick(params);
    }
  }
}
