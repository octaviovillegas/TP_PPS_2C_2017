import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCursoPage } from './listaCurso';

@NgModule({
  declarations: [
    ListaCursoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCursoPage),
  ],
})
export class ListaCursoPageModule {}
