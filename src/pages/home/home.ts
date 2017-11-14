import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;

  userAvatarPicture: Array<any> = new Array;//User picture array bcz we got random pic name
  constructor(public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, private pictureUtils: PictureUtils) {
     this.refreshPicture(); 
     
  }
  cerrarSesion(){
    this.auth.logout();
}
listado(){
 this.items = this.afDB.list ('Fotos');

}
refreshPicture() {
    this.afDB.list('Fotos/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();
        console.log(this.userAvatarPicture[index].foto);
      });
    });
  }

 /* changePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.pictureUtils.openCamera().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData);
            });
          }
        }, {
          text: 'From gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.pictureUtils.openGallery().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }*/
  ionViewDidLoad() {
  //  this.items = this.afDB.list ('/4a/Mensajes/').valueChanges();
   // const personRef: firebase.database.Reference = firebase.database().ref(`/4b/Usuarios/Tomy`);
   // personRef.on('value', personSnapshot => {
   //   this.myPerson = personSnapshot.val();
   // });
  
  }


}
