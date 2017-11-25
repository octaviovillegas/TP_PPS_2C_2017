import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosProfesoresPage } from './datos-profesores';

@NgModule({
  declarations: [
    DatosProfesoresPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosProfesoresPage),
  ],
})
export class DatosProfesoresPageModule {}
