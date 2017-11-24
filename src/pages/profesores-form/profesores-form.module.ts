import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesoresFormPage } from './profesores-form';

@NgModule({
  declarations: [
    ProfesoresFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesoresFormPage),
  ],
})
export class ProfesoresFormPageModule {}
