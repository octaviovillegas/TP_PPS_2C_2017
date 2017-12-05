import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
    ComponentsModule
  ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class MenuPageModule {}
