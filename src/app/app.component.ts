import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AdminUsuariosPage } from '../pages/adminUsuarios/adminUsuarios';
import { AbmAlumnoPage } from '../pages/adminUsuarios/abms/abmalumno/abmalumno';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { EncuestasPage } from '../pages/encuestas/encuestas';
import { EnviarAvisoPage } from '../pages/enviarAviso/enviarAviso';
import { MiPerfilPage } from '../pages/miPerfil/miPerfil';
import { TomarAsistenciaPage } from '../pages/tomarAsistencia/tomarAsistencia';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  user: string = "Administrador";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    if (this.user == "Alumno") {
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'List', component: ListPage },
        {title: 'ABM Alumno', component: AbmAlumnoPage },
      ];
    }

    if (this.user == "Profesor") {
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'List', component: ListPage }
      ];
    }

    if (this.user == "Administrativo") {
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'List', component: ListPage }
      ];
    }

    if (this.user == "Administrador") {
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'List', component: ListPage },
        { title: 'Administrador', component: AdminUsuariosPage },
        {title: 'ABM Alumno', component: AbmAlumnoPage },
        {title: 'Configuracion', component: ConfiguracionPage },
        {title: 'Encuestas', component: EncuestasPage },
        {title: 'Enviar Aviso', component: EnviarAvisoPage },
        {title: 'Mi Perfil', component: MiPerfilPage },
        {title: 'Tomar Asistencia', component: TomarAsistenciaPage }
     ];
   }  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
