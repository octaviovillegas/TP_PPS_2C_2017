import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosAlumnosPage } from './datos-alumnos';

@NgModule({
  declarations: [
    DatosAlumnosPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosAlumnosPage),
  ],
})
export class DatosAlumnosPageModule {}
