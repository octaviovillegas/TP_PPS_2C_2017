import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Camera } from 'ionic-native';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { AuthProvider } from '../providers/auth/auth';

@Injectable()
export class Encuesta {
  storageAvatarRef: any;
  profilAvatarRef: any;
  lista:FirebaseListObservable<any>;
  objectToSave: Array<any> = new Array;
  unafoto:string;

  takePictureOptions: any = {
    allowEdit: true,
    saveToPhotoAlbum: true,
    quality: 100,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: Camera.Direction.BACK,
    sourceType: Camera.PictureSourceType.CAMERA,
    mediaType: Camera.MediaType.PICTURE,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG
  }

  galleryOptions: any = {
    allowEdit: true,
    saveToPhotoAlbum: false,
    quality: 100,
    targetWidth: 720,
    targetHeight: 720,
    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: Camera.MediaType.PICTURE,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG
  }

  constructor(public toastCtrl: ToastController, public afDB: AngularFireDatabase, public auth : AuthProvider,  public alertCtrl : AlertController) {
   // this.storageAvatarRef = firebase.storage().ref().child('userPicture/');//Firebase storage main path
     //this.profilAvatarRef = afDB.object('TEST/avatar/');//Firebase user database avatar path
  }


  openGallery() {
    return new Promise((resolve, reject) => {
      Camera.getPicture(this.galleryOptions).then((imageData) => {
        console.log('se ingreso a la gallery');
        return resolve(imageData);

      }), (err) => {
        console.log('Cant access to gallery', err);
       
        return reject(err);
      }
    });
  }


  uploadProfilPicture(imgData: any,NroDeAula:string) {
    this.auth.getUser.name;
    this.storageAvatarRef = firebase.storage().ref().child('fotos/');
    this.lista=this.afDB.list('Cosas_Lindas');
   
    var randomNumber = Math.floor(Math.random() * 2566);
   

    this.storageAvatarRef.child(randomNumber + '.jpg').putString(imgData, 'base64', { contentType: 'image/jpeg' }).then((savedPicture) => {
 

      this.objectToSave.push(savedPicture.downloadURL);
      this.unafoto=JSON.stringify(this.objectToSave);
      let toast = this.toastCtrl.create({
        message: this.unafoto,
        duration: 2000
      });
      toast.present();
      this.lista.push({foto:this.objectToSave,usuario:"Aula "+NroDeAula});
     
  });
  this.objectToSave.length=0;
}

  //Delete avatar picture GIFT :)
  deleteAvatar(imgIndex: string) {
    this.storageAvatarRef.child(imgIndex + '.jpg').delete().then((success) => {
      console.log('Deleted users avatar successfully', imgIndex);
    }, (error) => {
      console.error("Error deleting users avatar", imgIndex)
    });
  }


}
