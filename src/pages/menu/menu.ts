import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Usuario } from "../../clases/usuario";
import { ListadoAlumnosPage } from "../../pages/listado-alumnos/listado-alumnos";
import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";
import { EncuestasHomePage } from "../../pages/encuestas-home/encuestas-home";

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
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();

    this.navCtrl.push("AlumnosFormPage");
  }


  private irAFormProfesores(){
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();
    this.navCtrl.push("ProfesoresFormPage");
  }

  private irABMProfesores(){
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();
    
    this.navCtrl.push("ListaProfesoresPage");
  }

  private irAListaAlumnos(){
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();

    this.navCtrl.push('ListadoAlumnosPage');
  }


  private irAFormAlumnosQrPage(){
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();

    console.log(this.datos["correo"]);
    console.log(this.datos["perfil"]);
    this.navCtrl.push('FormAlumnosQrPage', {'correo':this.datos["correo"], 'perfil':this.datos["perfil"]});
  }

  irABMPEncuestas()
  {
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();
    this.navCtrl.push('EncuestasHomePage');

  }


}
