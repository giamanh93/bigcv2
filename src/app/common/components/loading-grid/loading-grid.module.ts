import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingGridComponent } from './loading-grid.component';
import {SkeletonModule} from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
@NgModule({
    declarations: [LoadingGridComponent],
    imports: [
        CommonModule,
        RouterModule,
        SkeletonModule,
        TableModule,
        CardModule
    ],
    entryComponents: [],
    exports: [
        LoadingGridComponent
    ],
    providers: []
})
export class LoadingGridModule {}