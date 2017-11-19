import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAdministrativoPage } from './modal-administrativo';

@NgModule({
  declarations: [
    ModalAdministrativoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAdministrativoPage),
  ],
})
export class ModalAdministrativoPageModule {}
