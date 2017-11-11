
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the Home2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {

  items: FirebaseListObservable<any[]>;
  aulaSeleccionada:string=null;

  userAvatarPicture: Array<any> = new Array;//User picture array bcz we got random pic name
  constructor(public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,
      private pictureUtils: PictureUtils) {

  }
  cerrarSesion(){
    this.auth.logout();
}

refreshPicture() {
    this.afDB.list('Cosas_Lindas/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();
      });
    });
  }

  changePicture(){
  if (this.aulaSeleccionada!=null){
    alert(this.aulaSeleccionada);
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Tomar foto',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.pictureUtils.openCamera().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData,this.aulaSeleccionada);
            });
          }
        }, {
          text: 'Subir de Galeria',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.pictureUtils.openGallery().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData,this.aulaSeleccionada);
            });
          }
        }
      ]
    });
    actionSheet.present();
    this.aulaSeleccionada=null;
  } 
  else{
    alert("Seleccionar Aula!");
    
  }

  }
  ionViewDidLoad() {
  //  this.items = this.afDB.list ('/4a/Mensajes/').valueChanges();
   // const personRef: firebase.database.Reference = firebase.database().ref(`/4b/Usuarios/Tomy`);
   // personRef.on('value', personSnapshot => {
   //   this.myPerson = personSnapshot.val();
   // });
  
  }


}
