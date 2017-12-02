import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { PersonasServiceProvider } from "../../providers/personas-service/personas-service";

import { Usuario } from "../../clases/usuario";

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";

import { MenuPage } from "../menu/menu";

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
  private datosLoginGitHub:any;
  private provider = {
    correo: '',
    nombre:'',
    foto:'',
    perfil:'alumno',
    loggedin:false
  }

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,
              public alertCtrl:AlertController, public loadingCtrl:LoadingController,
              private auth:LoginServiceProvider, private servicioDB:PersonasServiceProvider,
              public platform:Platform, public authe:AngularFireAuth
  ) {}

  ionViewDidLoad() {
    this.correo = "";
    this.passw = null;
    this.loginUsuario = new Usuario();
  }
  toastOk(x) {
    let toast = this.toastCtrl.create({
      message: x + ' correctamente',
      position: 'middle',
      duration: 1000
    });
    toast.present();
  }

  login():void{
    if(this.correo =="" )
    {

      let toast = this.toastCtrl.create({
        message: ' Error Acceso denegado.Verifique sus datos',
      position: 'middle',
      duration: 1000
    });
    toast.present();



    }
    else
    {
      const loading = this.loadingCtrl.create({
        content: 'Verificando datos. Espere...',
        dismissOnPageChange: true,
        spinner:"bubbles"
      });
      loading.present();
      this.loginUsuario.setCorreo(this.correo);
      this.loginUsuario.setClave(this.passw);

      this.auth.loginUser(this.loginUsuario.getCorreo(), this.loginUsuario.getClave().toString())
        .then(user=>{

          this.listaUsuarios = this.servicioDB.getUsuariosLista();
          this.listaUsuarios.subscribe(lista=>{
            lista.forEach(usuario => {
              console.log(usuario);
              if (usuario['correo'] == this.loginUsuario.getCorreo()) {
                  this.loginUsuario.setPerfil(usuario['perfil']);
                  this.loginUsuario.setNombre(usuario['nombre']);
                  console.log('set nombre: ', usuario['perfil']);
                  this.loginUsuario.setPerfil(usuario['perfil']);
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
        case "alumno@alumno.com.ar":
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


    validarCantDigitos(event){

    }

    validarNum(event){

    }


    crearAlumno(){
      const loading = this.loadingCtrl.create({
        content: 'Ingresando. Espere...',
        dismissOnPageChange: true,
        spinner:"bubbles"
      });
      loading.present();

      this.navCtrl.push('AlumnosFormPage');
    }

    salir(){
      this.platform.exitApp();
    }


   public logearEnGitHub(){
    let proveedor = new firebase.auth.GithubAuthProvider();

        let res = this.authe.auth.signInWithPopup(proveedor)
          .then(res =>{
            console.log('res: '+ JSON.stringify(res));

            this.loginUsuario.setCorreo(res.user.email);
            this.loginUsuario.setPerfil('alumno');
            this.loginUsuario.setNombre(res.user.displayName);
            this.loginUsuario.setFoto(res.user.photoURL);
            this.loginUsuario.setLoginSocial(true);
            //console.log('usuarios: ', this.loginUsuario);
            this.navCtrl.push(MenuPage, {'usuario':this.loginUsuario});
          });

}







}
