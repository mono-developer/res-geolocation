import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewComponentPage } from './view-component';

@NgModule({
  declarations: [
    ViewComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewComponentPage),
  ],
})
export class ViewComponentPageModule {}
