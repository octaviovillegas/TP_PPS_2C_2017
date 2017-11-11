import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiPerfilPage } from './mi-perfil';

@NgModule({
  declarations: [
    MiPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(MiPerfilPage),
  ],
})
export class MiPerfilPageModule {}
