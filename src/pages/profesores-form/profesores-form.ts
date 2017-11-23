import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from "@ionic-native/camera";
import { Profesor } from "../../clases/profesor";

import {AngularFireDatabase} from 'angularfire2/database';
import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';

import { PersonasServiceProvider } from "../../providers/personas-service/personas-service";
import { ProfesorServiceProvider } from "../../providers/profesor-service/profesor-service";

@IonicPage()
@Component({
  selector: 'page-profesores-form',
  templateUrl: 'profesores-form.html',
})
export class ProfesoresFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public camera:Camera, public dbPersonas:PersonasServiceProvider,
              public alertCtrl:AlertController, public dbProfesor:ProfesorServiceProvider

  ) {}

  private dni:string;
  private nombre:string;
  private correo:string;
  private foto:string;
  private listaMaterias:Array<string>;
  private materiaCheck:Array<string>;
  private profesor:Profesor;
  private passw:string;

  private storageRef = firebase.storage().ref();

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfesoresFormPage');
    this.listaMaterias = new Array<string>();
    this.dbProfesor.traerListadoMaterias().subscribe(lista=>{
      console.log(lista);
      this.listaMaterias = lista;
    });
    this.materiaCheck = new Array<string>();
    this.profesor = new Profesor();
    this.foto='';
  }


  marcarOpcion(valor){
    //console.log('event: ', valor);

  }

  ingresarProfesor(){
    this.profesor.setNombre(this.nombre);
    this.profesor.setDNI(this.dni);
    this.profesor.setMateria(this.materiaCheck);
    this.profesor.setFoto(this.foto);
    this.profesor.setPassword(this.passw);
    this.profesor.setCorreo(this.correo);

    this.dbProfesor.guardarProfesor(this.profesor);
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
      cameraDirection:this.camera.Direction.BACK
    };

    this.camera.getPicture(options).then((imagen)=>{
          let imagenData = 'data:image/jpeg;base64,'+ imagen;
          let upload = this.storageRef.child('profesores/' + this.dni + '.jpg').putString(imagen, 'base64');

          upload.then((snapshot=>{
                this.dbPersonas.guardarLinkFoto(snapshot.downloadURL, this.dni);
                this.foto=snapshot.downloadURL;
                let msjOK = this.alertCtrl.create({
                  subTitle: 'Imagen guardada',
                  buttons: ['Aceptar']
                 });
                 msjOK.present();
          })
          );
        });
  }





}
