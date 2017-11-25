import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Home2Page } from '../home2/home2';
import { MiPerfilPage } from '../mi-perfil/mi-perfil';
import { LectorQrPage } from '../lector-qr/lector-qr';
import { AuthProvider } from '../../providers/auth/auth';
import { TomarListaPage } from '../tomar-lista/tomar-lista';
import { CrearEncuestaPage } from '../crear-encuesta/crear-encuesta';
import { RealizarEncuestaPage } from '../realizar-encuesta/realizar-encuesta';
import { ListadoAlumnosPage } from '../listado-alumnos/listado-alumnos';
import { EstadisticasPage } from '../estadisticas/estadisticas';

import { IonicPage,NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ModalAlumnoPage } from '../modal-alumno/modal-alumno';
import { ModalProfesorPage } from '../modal-profesor/modal-profesor';
import { ModalAdministrativoPage } from '../modal-administrativo/modal-administrativo';
//$IMPORTSTATEMENT

/**
 * Generated class for the BotonesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-botones',
  templateUrl: 'botones.html',
})
export class BotonesPage {
usuario:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BotonesPage');
    this.usuario=this.auth.getUser();
  }

  Listado_Fotos(){
    console.log('listado fotos');
    this.navCtrl.push(HomePage);
  }
  Subir_foto(){
    console.log('tomar foto');
    this.navCtrl.push(Home2Page);
  }
  LectorQR(){
    console.log('qr');
    this.navCtrl.push(LectorQrPage);
  }
  TomarLista(){
    console.log('lsita');
    this.navCtrl.push(TomarListaPage);
  }
  Estadisticas(){
    console.log('lsita');
    this.navCtrl.push(EstadisticasPage);
  }
  Lista(){
    console.log('lsita');
    this.navCtrl.push(ListadoAlumnosPage);
  }
  RealizarEncuesta(){
    console.log('lsita');
    this.navCtrl.push(RealizarEncuestaPage);
  }
  Miperfil(){
    console.log('lsita');
    this.navCtrl.push(MiPerfilPage);
  }
  CrearEncuesta(){
    console.log('lsita');
    this.navCtrl.push(CrearEncuestaPage);
    
  }

  CargarAlumno(){
    this.navCtrl.push(ModalAlumnoPage);
  }
  CargarProfesor(){
    this.navCtrl.push(ModalProfesorPage);
  }
  CargarAdministrativo(){
    this.navCtrl.push(ModalAdministrativoPage);
  }
  nada(){
    console.log("nada");

  ingresar(dato:any){
    console.log(dato);
   switch (dato) {
    case "MiPerfil":
      this.navCtrl.push(MiPerfilPage);
        break;
    case "Subir_foto":
        this.navCtrl.push(Home2Page);
          break;
    case "Listado_Fotos":
        this.navCtrl.push(HomePage);
          break;
  case "LectorQR":
      this.navCtrl.push(LectorQrPage);
        break;
    case "TomarLista":
        this.navCtrl.push(TomarListaPage);
          break;
    case "Estadisticas":
        this.navCtrl.push(EstadisticasPage);
          break;
    case "Lista":
          this.navCtrl.push(ListadoAlumnosPage);
            break;
    case "RealizarEncuesta":
          this.navCtrl.push(RealizarEncuestaPage);
            break;
    case "CrearEncuesta":
        this.navCtrl.push(CrearEncuestaPage);
          break;
      case "CargarAlumno":
          this.navCtrl.push(ModalAlumnoPage);
            break;
      case "CargarProfesor":
          this.navCtrl.push(ModalProfesorPage);
            break;
       case "CargarAdministrativo":
            this.navCtrl.push(ModalAdministrativoPage);
              break;

  }
}
 
  cerrarSesion(){
    this.auth.logout();
}
}
