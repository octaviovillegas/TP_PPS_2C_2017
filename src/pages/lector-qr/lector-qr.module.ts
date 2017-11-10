import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LectorQrPage } from './lector-qr';

@NgModule({
  declarations: [
    LectorQrPage,
  ],
  imports: [
    IonicPageModule.forChild(LectorQrPage),
  ],
})
export class LectorQrPageModule {}
