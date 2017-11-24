import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoAlumnosPage } from './listado-alumnos';

@NgModule({
  declarations: [
    ListadoAlumnosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoAlumnosPage),
  ],
})
export class ListadoAlumnosPageModule {}
