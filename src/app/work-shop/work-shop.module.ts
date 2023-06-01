import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkShopComponent } from './work-shop.component';
import { EditorComponent } from './editor/editor.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';




@NgModule({
  declarations: [WorkShopComponent, EditorComponent],
  imports: [
    CommonModule,

    CardModule,
    ButtonModule,
    FieldsetModule,
    MessagesModule,
    TimelineModule,
    AccordionModule,
  ],
  exports: [WorkShopComponent]
})
export class WorkShopModule { }
