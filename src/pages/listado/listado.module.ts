import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoPage } from './listado';

@NgModule({
  declarations: [
    ListadoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoPage),
  ],
})
export class ListadoPageModule {}
