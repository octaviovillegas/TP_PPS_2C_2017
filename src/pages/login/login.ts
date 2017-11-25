
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';
import firebase from "firebase";
import { Platform } from 'ionic-angular/platform/platform';
import { BotonesPage } from '../botones/botones';
import { LoginProvider } from '../../providers/login/login';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

seleccionado : string = "";

  user= { email : '', password : ''};
  private provider = {
    mail: '',
    nombre:'',
    foto:'',
    loggedin:false
  }


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth1 : AuthProvider,
    public toastCtrl : ToastController,
    public auth:AngularFireAuth,
    public platform: Platform,
  public loginProvider : LoginProvider ) {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth1 : AuthProvider,
    public alertCtrl : AlertController,
    public auth:AngularFireAuth ) {

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){
    this.auth1.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{

      let toast = this.toastCtrl.create({
        message: 'Error',
        duration: 2000
      });
      toast.present();

    })

  }

  login() 
  {
    console.log("algo");
      this.auth1.loginUser(this.user.email,this.user.password ).then((user) => {
        console.log("algo2"); }
      )
       .catch(err=>{
 
        let toast = this.toastCtrl.create({
          message: 'Error',
          duration: 2000
        });
        toast.present();
  
      })
    }




  private loginSocial(proveedor: string): any
  {
    
    localStorage.setItem("tipoUsuario","Alumno");
    this.loginProvider.loginRedSocial(proveedor);
    
  }
    






    cambiar(evento : any)
    {

      switch(this.seleccionado)
    {
      case "administrador":
      {
        this.user.email='admin@admin.com';
        this.user.password='111111';
        break;
      }
      case "administrativo":
      {
        this.user.email='administrativo@administrativo.com';
        this.user.password='123456';
        break;
      }
      case "alumno":
      {
        this.user.email='alumno@alumno.com';
        this.user.password='123456';
        break;
      }
      case "profesor":
      {
        this.user.email='profesor@profesor.com';
        this.user.password='123456';
        break;
      }
      case "":
      {
        this.user.email='';
        this.user.password='';
        break; 
      }
      default: { 
        break; 
     } 
     
    }
 








    public loginGitHub():any{
      let proveedor = new firebase.auth.GithubAuthProvider();
  
      this.auth.auth.signInWithRedirect(proveedor).then(res =>{
        console.log('res: '+ JSON.stringify(res));
        /*this.provider.loggedin = true;
        this.provider.mail = res.user.email;
        this.provider.foto = res.user.photoURL;
        this.provider.nombre = res.user.displayName;*/
        return this.provider;
      });
  
    }
    administrador(){
      this.user.email='admin@admin.com';
      this.user.password='111111';
    }
    administrativo(){
      this.user.email='administrativo@administrativo.com';
      this.user.password='123456';
    }
    profesor(){
      this.user.email='profesor@profesor.com';
      this.user.password='123456';
    }
    alumno(){
      this.user.email='alumno@alumno.com';
      this.user.password='123456';

    }

}