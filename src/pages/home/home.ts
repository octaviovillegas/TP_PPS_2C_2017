import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export enum NavRoutes {
  TomarAsistencia,
  Encuestas,
  EnviarAviso,
  AdminUsuarios,
  MiPerfil,
  Configuracion
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  navigate(route: NavRoutes){
    this.navCtrl.push("AdminUsuariosPage");
  }

  cerrarSesion()
  {
    alert('HACER LOGOUT');
  }

}
