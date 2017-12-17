import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgModel, NgForm } from "@angular/forms";

import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';

import { PersonasServiceProvider } from "../../providers/personas-service/personas-service";

import { Alumno } from "../../clases/alumno";

import { Camera, CameraOptions } from "@ionic-native/camera";

import {AngularFireDatabase} from 'angularfire2/database';
import {storage, initializeApp}  from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.html'
})
export class PerfilComponent implements OnInit, OnChanges {

  private  imagen:string;
  @Input() perfil:string;
  @Input() correo:string;
  private foto:string='';
  @Input() nombre:string;
  private materias:Array<string>;
  private legajo:string='';
  private correoModif:string;
  @Input() isLoginSocial:boolean=false;
  private dni:string ='';
  private cont:number = 0;
  private fotos: Array<string>;

  private storageRef = firebase.storage().ref();


  constructor(
                public navCtrl: NavController, public navParams: NavParams,
                private dbPersonas:PersonasServiceProvider, public camera:Camera,
                public alertCtrl:AlertController, public platform:Platform
  )

  {}

  private devolverFotoActiva(listaFotos:Array<string>){
    listaFotos.forEach(foto => {
      console.log(foto);
      if (foto["activa"] == true) {
        this.foto = foto["foto"];
        console.log(this.foto);
      }
    });
  }
  ngOnChanges(){
    this.fotos = new Array<string>();

    this.dbPersonas.getDatosPersona(this.correo, this.perfil).subscribe(lista=>{
      this.fotos = lista[0]["fotos"];
      console.log(this.fotos);


      this.cont = this.fotos.length;
      console.log(this.cont);

      if (this.perfil=="administrador" || this.perfil=="administrativo") {
        this.dni="";
      } else {
        if (this.perfil == 'alumno') {
          this.legajo = lista[0]["legajo"];
          this.devolverFotoActiva(this.fotos);
        }else{
          if (lista[0]["dni"] != undefined) {
            this.dni = lista[0]["dni"];
            this.devolverFotoActiva(this.fotos);
          }

        }
      }


    });
  }

  ngOnInit(){


  }

  cambiarFoto(evento){
    console.log(evento);

    this.fotos.forEach(_foto => {
      console.log(_foto);
      if (_foto["foto"] == evento) {
        _foto["activa"] = true;
        console.log(_foto);
      }else{
        _foto["activa"] = false;
      }
    });
    this.dbPersonas.actualizarFotoPerfil(this.legajo, this.perfil, this.fotos);
    this.foto = evento;
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
        },
        cssClass: 'alertDanger'
      }

    ]
    });
    alertEmail.present();
    //
  }

  sacarFoto(){
      let more:number = this.cont + 1;
      let options:CameraOptions ={
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        //targetHeight:600,
        //targetWidth:600,
        correctOrientation:false,
        saveToPhotoAlbum:true,
        cameraDirection:this.camera.Direction.FRONT
      };

      this.camera.getPicture(options).then((imagen)=>{
        let imagenData = 'data:image/jpeg;base64,'+ imagen;
        let upload = this.storageRef.child('alumnos/' + this.legajo + '_' + more + '.jpg').putString(imagen, 'base64');

            upload.then((snapshot=>{
                  let objJson = {'foto':snapshot.downloadURL, 'activa':false}
                  let arr:Array<string>=new Array<string>();

                  this.fotos.push(JSON.parse(JSON.stringify(objJson)));
                  this.dbPersonas.guardarLinkFoto(snapshot.downloadURL, this.legajo, this.perfil, this.fotos);

                })
            );
      });

    }










}
