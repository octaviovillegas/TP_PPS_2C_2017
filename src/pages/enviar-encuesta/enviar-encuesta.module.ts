import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarEncuestaPage } from './enviar-encuesta';

@NgModule({
  declarations: [
    EnviarEncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarEncuestaPage),
  ],
})
export class EnviarEncuestaPageModule {}
