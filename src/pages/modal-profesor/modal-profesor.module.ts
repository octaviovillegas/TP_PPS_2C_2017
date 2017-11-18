import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProfesorPage } from './modal-profesor';

@NgModule({
  declarations: [
    ModalProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProfesorPage),
  ],
})
export class ModalProfesorPageModule {}
