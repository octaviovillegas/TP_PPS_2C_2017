import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Usuario } from "../../clases/usuario";
import { ListadoAlumnosPage } from "../../pages/listado-alumnos/listado-alumnos";
import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private datos:{};




  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController

  ) { }

  ionViewDidLoad() {

    this.datos = JSON.parse(this.navParams.data);
    console.log(this.navParams.data);

  }


  private irAPerfil():void{

    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();

    if (this.datos["loginSocial"]==true) {
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"], "nombre":this.datos["nombre"], "foto":this.datos["foto"], "isLoginSocial":this.datos["loginSocial"]});
    }else{
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"]});
    }

  }

  private irAFormAlumnos(){
    this.navCtrl.push("AlumnosFormPage");
  }


  private irAFormProfesores(){
    this.navCtrl.push("ProfesoresFormPage");
  }

  private irABMProfesores(){
    this.navCtrl.push("ListaProfesoresPage");
  }

  private irAListaAlumnos(){
    this.navCtrl.push('ListadoAlumnosPage');
  }


  private irAFormAlumnosQrPage(){
    console.log(this.datos["correo"]);
    console.log(this.datos["perfil"]);
    this.navCtrl.push('FormAlumnosQrPage', {'correo':this.datos["correo"], 'perfil':this.datos["perfil"]});
  }


}
