import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdministradorPage } from '../pages/administrador/administrador';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  user: string = "Administrador";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    if (this.user == "Alumno") {
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'List', component: ListPage }
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
        { title: 'Administrador', component: AdministradorPage }
     ];
   }  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
