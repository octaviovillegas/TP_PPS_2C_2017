import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsistenciasPage } from './asistencias';

@NgModule({
  declarations: [
    AsistenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(AsistenciasPage),
  ],
})
export class AsistenciasPageModule {}
