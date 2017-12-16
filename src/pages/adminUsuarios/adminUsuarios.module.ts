import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUsuariosPage } from './adminUsuarios';

@NgModule({
  declarations: [
    AdminUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUsuariosPage),
  ],
})
export class AdminUsuariosPageModule {}
