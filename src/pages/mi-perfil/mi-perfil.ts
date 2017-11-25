import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils2 } from '../../services/pictureUtils2.service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MiPerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfilPage {
  nombre:string;
  userAvatarPicture: Array<any> = new Array;
  usuarioLogueado:any;
  unaLista:FirebaseListObservable<any>;
  algo =[];

  constructor(public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,
      private pictureUtils: PictureUtils2){
        this.usuarioLogueado=this.auth.getUser();
        this.refreshPicture();


       this.afDB.list('/Usuarios/').subscribe(e=>{
        e.forEach(res=>{
           this.algo.push(res);
           console.log('res'+res);
          
        })
        this.algo.forEach(element => {
          console.log('elem'+element.foto); 
          console.log('elem'+element.usuario); 
           });
       
     });
     }




  ionViewDidLoad() {
    console.log('ionViewDidLoad MiPerfilPage');
  }
 
  refreshPicture() {
    this.afDB.list('Usuarios/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();

      });
    });
  }





  changePicture(){

      let actionSheet = this.actionSheetCtrl.create({
        enableBackdropDismiss: true,
        buttons: [
          {
            text: 'Tomar foto',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              this.pictureUtils.openCamera().then((imageData) => {
                this.pictureUtils.uploadProfilPicture(imageData);
              });
            }
          }, {
            text: 'Subir de Galeria',
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
      
    } 
    
}
