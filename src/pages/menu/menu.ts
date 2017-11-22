import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from "../../clases/usuario";
import { ListadoAlumnosPage } from "../../pages/listado-alumnos/listado-alumnos";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private datos:{};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController

  ) {}

  ionViewDidLoad() {
    this.datos = JSON.parse(this.navParams.data);
    console.log(this.navParams.data);

   }



  private irAPerfil():void{
    if (this.datos["loginSocial"]==true) {
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"], "nombre":this.datos["nombre"], "foto":this.datos["foto"], "isLoginSocial":this.datos["loginSocial"]});
    }else{
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"]});
    }

  }

  private irAFormAlumnos(){
    this.navCtrl.push("AlumnosFormPage");
  }

  private irAListaAlumnos(){
    this.navCtrl.push('ListadoAlumnosPage');
  }



}
