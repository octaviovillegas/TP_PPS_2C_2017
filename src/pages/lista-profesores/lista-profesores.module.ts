import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProfesoresPage } from './lista-profesores';

@NgModule({
  declarations: [
    ListaProfesoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProfesoresPage),
  ],
})
export class ListaProfesoresPageModule {}
