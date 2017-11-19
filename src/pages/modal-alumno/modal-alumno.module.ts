import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAlumnoPage } from './modal-alumno';

@NgModule({
  declarations: [
    ModalAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAlumnoPage),
  ],
})
export class ModalAlumnoPageModule {}
