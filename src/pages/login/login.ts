
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

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

  user= { email : '', password : ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth : AuthProvider,
    public alertCtrl : AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }

  login() 
  {
    console.log("algo");
      this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
        console.log("algo2"); }
      )
       .catch(err=>{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
    }

    administrador(){
      this.user.email='admin@admin.com';
      this.user.password='111111';
    }
    invitado(){
      this.user.email='invitado@invitado.com';
      this.user.password='222222';
    }
    usuario(){
      this.user.email='usuario@usuario.com';
      this.user.password='333333';
    }

}