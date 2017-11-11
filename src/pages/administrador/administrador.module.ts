import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministradorPage } from './administrador';

@NgModule({
  declarations: [
    AdministradorPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministradorPage),
  ],
})
export class AdministradorPageModule {}
