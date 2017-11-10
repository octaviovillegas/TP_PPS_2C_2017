import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';


//import { MainPage, SignupPage } from '../pages'; #Estas páginas ya no existen

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: any,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


  registro()
    {
      //this.navCtrl.push(SignupPage);
    }
  // Attempt to login in through our User service
  doLogin() {
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
    });
  }
}
