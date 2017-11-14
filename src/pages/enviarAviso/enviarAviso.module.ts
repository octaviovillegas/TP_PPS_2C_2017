import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarAvisoPage } from './enviarAviso';

@NgModule({
  declarations: [
    EnviarAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarAvisoPage),
  ],
})
export class EnviarAvisoPageModule {}
