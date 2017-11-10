import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';


//import { MainPage, SignupPage } from '../pages'; #Estas páginas ya no existen

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
    user= { email : '', password : ''};

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    
    public toastCtrl: ToastController) {

  
  }


  registro()
    {
      //this.navCtrl.push(SignupPage);
    }
  // Attempt to login in through our User service
  login() {/*
    this.user.login(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
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
