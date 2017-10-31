import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MateriaPrincipalPage } from './materia-principal';

@NgModule({
  declarations: [
    MateriaPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(MateriaPrincipalPage),
  ],
})
export class MateriaPrincipalPageModule {}
