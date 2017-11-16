import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnosFormPage } from './alumnos-form';

@NgModule({
  declarations: [
    AlumnosFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnosFormPage),
  ],
})
export class AlumnosFormPageModule {}
