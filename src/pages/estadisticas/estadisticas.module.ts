import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadisticasPage } from './estadisticas';

@NgModule({
  declarations: [
    EstadisticasPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadisticasPage),
  ],
})
export class EstadisticasPageModule {}
