import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { PersonasServiceProvider } from "../../providers/personas-service/personas-service";

import { Usuario } from "../../clases/usuario";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private correo:string
  private passw: any;
  private loginUsuario:Usuario;
  private listaUsuarios:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, public loadingCtrl:LoadingController,
              private auth:LoginServiceProvider, private servicioDB:PersonasServiceProvider
  ) {}

  ionViewDidLoad() {
    this.correo = "";
    this.passw = null;
    this.loginUsuario = new Usuario();
  }


  login():void{
    const loading = this.loadingCtrl.create({
      content: 'Verificando datos. Espere...',
      dismissOnPageChange: true
    });
    loading.present();
    this.loginUsuario.setCorreo(this.correo);
    this.loginUsuario.setClave(this.passw);

    this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave().toString())
      .then(user=>{

        this.listaUsuarios = this.servicioDB.getUsuariosLista();
        this.listaUsuarios.subscribe(lista=>{
          lista.forEach(usuario => {
            if (usuario['correo'] == this.loginUsuario.getCorreo()) {
                this.loginUsuario.setPerfil(usuario['perfil']);
                this.loginUsuario.setNombre(usuario['nombre']);
                this.loginUsuario.setClave(-1); //no necesito guardar la passw
                this.navCtrl.push("MenuPage", JSON.stringify(this.loginUsuario));
            }
          });
        });
      }, err=>{
        let msjAlert = this.alertCtrl.create({
          subTitle: 'Error al validar usuario. Verifique sus datos',
          buttons: ['Volver']
        });
      })

    }



    private writePassw():void{
      if(this.correo == ""){
        //this.mostrarCardRegistro = true;
        this.passw = "";
      }
      switch (this.correo) {
        case "admin@admin.com":
          this.passw = 444444;
          //this.errCred = false;
          //this.registrar= false;
          //this.mostrarCardRegistro = false;
        break;
        case "administrativo@administrativo.com":
          this.passw = 333333;
          //this.errCred = false;
          //this.registrar= false;
          //this.mostrarCardRegistro = false;

        break;
        case "alumno@alumno.com":
          this.passw = 222222;
          //this.errCred = false;
          //this.registrar= false;
          //this.mostrarCardRegistro = false;

        break;
        case "profesor@profesor.com":
          this.passw = 111111;
          //this.errCred = false;
          //this.registrar= false;
          //this.mostrarCardRegistro = false;

        break;

        default:
        break;
      }
    }















}
