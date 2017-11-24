import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, AlertController, Loading, LoadingController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  passRepetido: string;
  spinner

  constructor(private authAf: AngularFireAuth,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
  }

  async register(user: User, passRepetido: string){
    if(passRepetido != user.password){
      swal({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        type: 'error',
        timer: 2000
    })
    } else if(passRepetido == "" || user.password == "" || user.email == ""){
      this.toastCtrl.create({
        message: "Debe completar todos los campos",
        duration: 2000
      }).present();
    } else {
        let loading = this.loadSpinner();
        loading.present();
        await this.authAf.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(r => { 
          swal({
            title: '¡Registro exitoso!',
            text: 'Usuario registrado con exito',
            type: 'success',
            timer: 1500
          }) 
          this.navCtrl.setRoot(LoginPage);
        })
        .catch(e => {
          this.toastCtrl.create({message: "Error al registrarse:" + e.message, duration: 3000}).present();
        });
      }
    }
    private loadSpinner():Loading
    {
      let loader = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content:"Registrando Usuario..",
        duration: 2500
      });
      return loader;
    }
}
