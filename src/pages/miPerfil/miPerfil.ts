import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import swal from 'sweetalert2';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-miPerfil',
  templateUrl: 'miPerfil.html',
})
export class MiPerfilPage implements OnInit{
  
  userloggued = {} as User;
  user = this.authAf.auth.currentUser;
  name;
  email;
  oldPassword;
  newPassword;
  repeatNewPassword;
  photoUrl;
  uid;
  emailVerified;

  ngOnInit(): void {
    this.datosUsuario();
  }

  constructor(public navCtrl: NavController,
    public authAf: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  datosUsuario(){
    if (this.user != null) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photoUrl = this.user.photoURL;
      this.emailVerified = this.user.emailVerified;
      this.uid = this.user.uid;  
    }
  }

  actualizarDatos(){
    // if (this.email != null && this.newPassword != null && this.email != "" && this.newPassword != "") {
      // let loading = this.loadSpinner();
      // loading.present();  
    // this.user.updateEmail(this.email).then(function() {
    //   }).catch(function(error) {
    //   });
    if (this.oldPassword != null && this.oldPassword != "" && 
    this.newPassword != null && this.newPassword != "" && 
    this.repeatNewPassword != null && this.repeatNewPassword != "")
    {
      if (this.newPassword == this.repeatNewPassword){
        this.user.updatePassword(this.newPassword)
        .then(function() { })
        .catch(function(error) { });
        swal({
          title: '¡Datos actualizados!',
          type: 'success',
          timer: 1500
        })
        this.navCtrl.setRoot(HomePage)
      } //cierre if
      else{
        swal({
          title: 'Las contraseñas no coinciden',
          type: 'error',
          timer: 1500
        })
      } 
    } //cierre if global
    else{
      swal({
        title: 'No hay nada para actualizar',
        type: 'error',
        timer: 1500
      })
      
    }
  }
  // }

  cancelar()
  {
    this.navCtrl.setRoot(HomePage);
  }

  loadSpinner(): Loading
  {
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content:"Cargando..",
      duration: 2500
      
    });
    return loader;
  }
  


}
