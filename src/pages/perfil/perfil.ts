import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PersonasServiceProvider } from "../../providers/personas-service/personas-service";

import { Alumno } from "../../clases/alumno";

import { Camera, CameraOptions } from "@ionic-native/camera";

import {AngularFireDatabase} from 'angularfire2/database';
import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private imagen:string;
  private perfil:string;
  private correo:string;
  private foto:string;
  private nombre:string;
  private materias:Array<string>;
  private legajo:string;

  private storageRef = firebase.storage().ref();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbPersonas:PersonasServiceProvider, public camera:Camera
  ) {}

  ionViewDidLoad() {
    this.perfil = this.navParams.get('perfil');
    this.correo = this.navParams.get('correo');


    this.dbPersonas.getDatosPersona(this.correo, this.perfil).subscribe(valor=>{
      console.log('valorrr:', valor);
      switch (this.perfil) {
          case 'alumno':
                //this.alumno = new Alumno();
                this.materias = new Array<string>();
                this.nombre = valor[0]["nombre"];
                this.foto = valor[0]["foto"];
                this.legajo = valor[0]["legajo"];

          break;

        default:
          break;
      }
    })
  }



  sacarFoto(){
    let options:CameraOptions ={
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      targetHeight:600,
      targetWidth:600,
      correctOrientation:true,
      saveToPhotoAlbum:true,
      cameraDirection:this.camera.Direction.FRONT
    };

    this.camera.getPicture(options).then((imagen)=>{
          let imagenData = 'data:image/jpeg;base64,'+ imagen;
          //this.imagen = imagen;
          let upload = this.storageRef.child('alumnos/' + this.legajo).putString(imagen, 'base64');
    });

  }


}
