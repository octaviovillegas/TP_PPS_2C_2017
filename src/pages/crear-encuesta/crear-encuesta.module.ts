import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearEncuestaPage } from './crear-encuesta';

@NgModule({
  declarations: [
    CrearEncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearEncuestaPage),
  ],
})
export class CrearEncuestaPageModule {}
