import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestasPage } from './encuestas';

@NgModule({
  declarations: [
    EncuestasPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestasPage),
  ],
})
export class EncuestasPageModule {}
