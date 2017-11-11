import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TomarListaPage } from './tomar-lista';

@NgModule({
  declarations: [
    TomarListaPage,
  ],
  imports: [
    IonicPageModule.forChild(TomarListaPage),
  ],
})
export class TomarListaPageModule {}
