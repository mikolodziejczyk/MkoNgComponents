import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxListPopupComponent } from './check-box-list-popup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ CheckBoxListPopupComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ CheckBoxListPopupComponent ]
})
export class CheckBoxListPopupModule { }
