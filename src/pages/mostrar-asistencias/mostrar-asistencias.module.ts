import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarAsistenciasPage } from './mostrar-asistencias';

@NgModule({
  declarations: [
    MostrarAsistenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarAsistenciasPage),
  ],
})
export class MostrarAsistenciasPageModule {}
