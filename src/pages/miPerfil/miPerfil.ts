import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-miPerfil',
  templateUrl: 'miPerfil.html',
})
export class MiPerfilPage implements OnInit{
  
  user = this.authAf.auth.currentUser;
  name;
  email;
  photoUrl;
  uid;
  emailVerified;

  ngOnInit(): void {
    this.datosUsuario();
  }

  constructor(public navCtrl: NavController,
    public authAf: AngularFireAuth,
    public navParams: NavParams) {
  }

  datosUsuario(){
    if (this.user != null) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photoUrl = this.user.photoURL;
      this.emailVerified = this.user.emailVerified;
      this.uid = this.user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
      console.log(this.email);
      console.log(this.uid);
    }
  }

  actualizarDatos(){
    this.user.updateEmail(this.email).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }


  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  goAbmAlumno()
  {
    this.navCtrl.push('AbmAlumnoPage');
  }
*/
  cancelar()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
