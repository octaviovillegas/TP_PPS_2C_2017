import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, Loading, LoadingController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from 'sweetalert2';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  valid = new  BehaviorSubject<boolean>(false);
  selectedUser: string;
  connection;
  splash = true;
  safeSvg;
  //secondPage = SecondPagePage;

  constructor(
    public toastCtrl: ToastController,
    private authAf : AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public facebook: Facebook,
    private sanitizer: DomSanitizer
    //public socketService: SocketService
  ) {
    
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  facebookLogin(): Promise<any> {
    let loading = this.loadSpinner();
    loading.present();
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            swal({
              title: '¡Bienvenido!',
              type: 'success',
              timer: 1500
            })
            this.navCtrl.setRoot(HomePage);
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      })
      .catch((error) => { 
        loading.dismiss();
        console.log(error)
       });
  }

  githubLogin(){
    let loading = this.loadSpinner();
    loading.present();
    return this.authAf.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then( response => {
          swal({
            title: '¡Bienvenido!',
            type: 'success',
            timer: 1500
          })
        this.navCtrl.setRoot(HomePage);
        console.log("GitHub Login correcto");
         })
        .catch((error) => { 
          loading.dismiss();
      });
  }

  async login(user: User) {
    this.allFilled();
    if(this.valid.value){
      try {
        let loading = this.loadSpinner();
        loading.present();
        await this.authAf.auth.signInWithEmailAndPassword(user.email, user.password)
          .then(result => {
            /*this.socketService.connect(user.email); 
            this.connection = this.socketService.getNotificationObservable().subscribe();*/
            swal({
              title: '¡Bienvenido!',
              text: user.email,
              type: 'success',
              timer: 1500
            })
            this.navCtrl.setRoot(HomePage)})
          .catch(error => {
            loading.dismiss();
            this.showToast(error.message);
          })
        } catch (error) {
            if(error.code == "auth/argument-error"){
              var mailError = "Formato de mail incorrecto";
              console.log(mailError);
              this.showToast(mailError);
            }
        }
    } else {
      this.toastCtrl.create({message: "Debe completar todos los campos", duration: 1500}).present();
    }
  }

  showToast(mensaje: string) {
    switch(mensaje)
    {
      case "The email address is badly formatted.":
      {
        mensaje = "El mail no es correcto";
        break;
      }
      case "The password is invalid or the user does not have a password.":
      {
        mensaje = "Clave incorrecta";
        break;
      }
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
      {
        mensaje = "No existe un usuario con ese email.";
      }
    }
    this.toastCtrl.create({
      message: mensaje,
      cssClass: 'ToastWarning',
      duration: 2000
    }).present();
  }  
  register(){
    this.navCtrl.push(RegisterPage);
  }

  private allFilled(): void {
    this.valid.next(this.user.email != "" && this.user.password != "");
  }

  public isInvalid(): boolean{
    return (this.user.email == undefined || this.user.password == undefined || this.user.password == "" || this.user.email == "");
  }

  SeleccionarUsuario(){
    switch(this.selectedUser){
      case "admin":{
        this.user.email ="administrador@administrador.com";
        this.user.password="111111";
        break;
      }
      case "profesor":{
        this.user.email ="profesor@profesor.com";
        this.user.password="333333";
        break;
      }
      case "administrativo":{
        this.user.email ="administrativo@administrativo.com";
        this.user.password="222222";
        break;
      }                
      case "alumno":{
        this.user.email="alumno@alumno.com";
        this.user.password="444444";
        break;
      }       
    }
  }
  private loadSpinner():Loading
  {
    let img = `<img src="../assets/images/escuela.gif">`;

    //this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(img);

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
      spinner: 'hide',
      cssClass: 'loader',
      content: img,
      duration: 5000
    });
    return loader;
  }

}
