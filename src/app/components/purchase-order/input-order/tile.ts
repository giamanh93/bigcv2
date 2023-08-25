import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tile',
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated180', style({ transform: 'rotate(90deg)' })),
      state('rotated90', style({ transform: 'rotate(-90deg)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ],
  template: `
<div class="thumbnail-container">
  <div style="display: flex;
    flex-direction: column;">
    <img [@rotatedState]='state' [src]="content.thumbnail" class="thumbnail" [attr.tileId]="content.id">
  </div>
</div>
  `,
  styles: [
    `
    .thumbnail-container {
      position:relative;
      margin: 2px 10px 0 0;
      width: 100%;
      height: 770px;
      //cursor: pointer;
      //overflow:auto;
      text-align:center;
      line-height:700px;
    }
    .thumbnail {
      max-width: 100%;
      height: 660px;
      max-height: 660px;
      vertical-align: middle;
    }
  `,
  ],
})
export class TileComponent implements OnChanges{
  @Input() content: any;
  public showHighRes = false;

  @Input() state: string = 'default';
  ngOnChanges(changes: SimpleChanges) {
    this.state = this.state === 'default'
      ? 'rotated180'
      : this.state === 'rotated180'
        ? 'rotated90'
        : this.state === 'rotated90' ? 'rotated' :  'default';
  }
}
