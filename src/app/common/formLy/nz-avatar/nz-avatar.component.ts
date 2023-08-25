
import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-avatar',
  templateUrl: './nz-avatar.component.html',
  styleUrls: ['./nz-avatar.component.scss']
})
export class NzAvatarComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  isLinkUrl : boolean = true;
  ngOnInit(): void {
    console.log(this.props)
    if(this.field.className && this.field.className?.includes('base64')) {
        this.isLinkUrl = false;
    }

  }


}
