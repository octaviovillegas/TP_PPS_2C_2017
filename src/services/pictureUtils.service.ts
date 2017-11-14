import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Camera } from 'ionic-native';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { AuthProvider } from '../providers/auth/auth';
/***
    PictureUtils.ts a provider picture manipulating methods with :
      - openCamera() return a promise with the image taken from the camera
      - openGallery() return a promise with the image picked from the gallery
      - uploadProfilPicture(imgData:any) upload to firebase storage current user picture
***/

@Injectable()
export class PictureUtils {
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

  constructor(public afDB: AngularFireDatabase, public auth : AuthProvider,  public alertCtrl : AlertController) {
   // this.storageAvatarRef = firebase.storage().ref().child('userPicture/');//Firebase storage main path
     //this.profilAvatarRef = afDB.object('TEST/avatar/');//Firebase user database avatar path
  }

  //Take a picture and return a promise with the image data
  openCamera() {
    return new Promise((resolve, reject) => {
      Camera.getPicture(this.takePictureOptions).then((imageData) => {
        return resolve(imageData);
      }), (err) => {
        console.log('Cant take the picture', err);
        return reject(err);
      }
    });
  }

 

  //open the gallery and Return a promise with the image data
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

  //Upload a new profile picture to the firebase storage
  uploadProfilPicture(imgData: any,NroDeAula:string) {
    this.auth.getUser.name;
    this.storageAvatarRef = firebase.storage().ref().child('fotos/');
   // this.lista=this.afDB.list('Cosas_Lindas');
    this.lista=this.afDB.list('Fotos/');
  
    //Firebase user database avatar path
   
    var randomNumber = Math.floor(Math.random() * 2566);
   // console.log('Random number : ' + randomNumber);

    this.storageAvatarRef.child(randomNumber + '.jpg').putString(imgData, 'base64', { contentType: 'image/jpeg' }).then((savedPicture) => {
     // console.log('saved picture URL', savedPicture.downloadURL);

      this.objectToSave.push(savedPicture.downloadURL);
      this.unafoto=JSON.stringify(this.objectToSave);
      alert(this.unafoto);
      
    //  console.log('objectToSave : ' + JSON.stringify(this.objectToSave));
    //this.profilAvatarRef = this.afDB.object('nada/');
      this.lista.push({foto:this.objectToSave,aula:"Aula "+NroDeAula});
      //this.profilAvatarRef.set(this.objectToSave);
      
     //this.ref = this.afDB.list('Usuarios/'+this.objectToSave+'/');
    // this.afDB.database.ref('sitios').set('algo');
      //var ref: firebase.database.Reference = firebase.database().ref(`Usuarios/`+this.unafoto);
   //   this.ref.set({name:this.auth.getUser()});

     // DatabaseReference postsRef = ref.child("posts");
      
    ///  DatabaseReference newPostRef = postsRef.push();
    //  newPostRef.setValue(new Post("gracehop", "Announcing COBOL, a New Programming Language"));
   //   ref.set({foto:this.unafoto,usuario:this.auth.getUser()});

    /*  var foto = {
        name: this.auth.getUser(),
        picture: this.objectToSave
      }
      this.ref.push(foto);*/


     // this.profilAvatarRef.set(this.objectToSave, {usuario: this.auth.getUser() });
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
