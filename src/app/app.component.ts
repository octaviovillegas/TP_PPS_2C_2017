import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { MateriasPage } from '../pages/materias/materias';
import { MateriaPrincipalPage } from '../pages/materia-principal/materia-principal';
import { PersonasPage } from '../pages/personas/personas';
import {PerfilPage} from '../pages/perfil/perfil';
import {EncuestaPage} from '../pages/encuesta/encuesta';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('contenidoPrincipal') main: Nav;
  rootPage:any = EncuestaPage;

  public pages: Array<{titulo: string, component:any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
        {titulo: 'Inicio', component:LoginPage},
        {titulo: 'Perfil', component:PerfilPage}

    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  irPagina(pagina){
    this.main.setRoot(pagina);
  }


}

