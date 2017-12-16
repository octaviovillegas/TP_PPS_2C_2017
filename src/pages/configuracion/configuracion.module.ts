import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracionPage } from './configuracion';

@NgModule({
  declarations: [
    ConfiguracionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracionPage),
  ],
})
export class ConfiguracionPageModule {}
