import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  private correoModif:string;
  private isLoginSocial:boolean=false;

  private storageRef = firebase.storage().ref();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbPersonas:PersonasServiceProvider, public camera:Camera,
              public alertCtrl:AlertController
  ) {}

  ionViewDidLoad() {
    this.materias = new Array<string>();
    console.log(this.navParams.data);
     if (this.navParams.get('isLoginSocial')) {
       if (this.navParams.get('nombre') == null || this.navParams.get('nombre') == undefined) {
         this.nombre = '';
       }else{
        this.nombre = this.navParams.get('nombre');
       }

      this.correo = this.navParams.get('correo');
      this.perfil = 'alumno';
      this.foto = this.navParams.get('foto');
    }else{
      this.perfil = this.navParams.get('perfil');
      this.correo = this.navParams.get('correo');

      this.dbPersonas.getDatosPersona(this.correo, this.perfil).subscribe(valor=>{

            switch (this.perfil) {
                case 'alumno':
                      //this.alumno = new Alumno();

                      if (valor[0]["nombre"] != null && valor[0]["nombre"] != undefined) {
                        this.nombre = valor[0]["nombre"];
                      }else{
                        this.nombre = '';
                      }
                      this.foto = valor[0]["foto"];
                      this.legajo = valor[0]["legajo"];
                      this.materias = valor[0]["materias"];
                      console.log('this.materias:', this.materias);
                break;

              default:
                break;
            }
          })
    }

  }


  cambiarCorreo(){
    let alertEmail = this.alertCtrl.create({
      title: 'Ingrese nuevo mail',
      inputs:[
        {
          name:'email',
          placeholder:'Nuevo Correo'
        }
    ],
    buttons:[
      {
        text: 'Aceptar',
        handler: data=>{
          this.correoModif = data.email;
          this.dbPersonas.cambiarEmail(this.correoModif, this.perfil+'s', this.legajo);
          this.navCtrl.push("LoginPage");
        }
      }
    ]
    });
    alertEmail.present();
    //
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
          let upload = this.storageRef.child('alumnos/' + this.legajo + '.jpg').putString(imagen, 'base64');

          upload.then((snapshot=>{
                this.dbPersonas.guardarLinkFoto(snapshot.downloadURL, this.legajo);
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
