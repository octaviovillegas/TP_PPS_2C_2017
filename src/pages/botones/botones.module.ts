import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BotonesPage } from './botones';

@NgModule({
  declarations: [
    BotonesPage,
  ],
  imports: [
    IonicPageModule.forChild(BotonesPage),
  ],
})
export class BotonesPageModule {}
