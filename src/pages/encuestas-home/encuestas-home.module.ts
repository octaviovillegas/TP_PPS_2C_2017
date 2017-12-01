import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestasHomePage } from './encuestas-home';

@NgModule({
  declarations: [
    EncuestasHomePage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestasHomePage),
  ],
})
export class EncuestasHomePageModule {}
