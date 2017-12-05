import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgModel, NgForm } from "@angular/forms";

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  @Input() foto:string='';
  @Input() nombre:string;
  private materias:Array<string>;
  private legajo:string='';
  private correoModif:string;
  @Input() isLoginSocial:boolean=false;
  private dni:string ='';

  private storageRef = firebase.storage().ref();


  constructor(
                public navCtrl: NavController, public navParams: NavParams,
                private dbPersonas:PersonasServiceProvider, public camera:Camera,
                public alertCtrl:AlertController
  )

  {}
  ngOnChanges(){

    this.dbPersonas.getDatosPersona(this.correo, this.perfil).subscribe(lista=>{
      if (this.perfil=="administrador" || this.perfil=="administrativo") {
        this.dni="";
      } else {
        if (this.perfil == 'alumno') {
          this.legajo = lista[0]["legajo"];
        }else{
          if (lista[0]["dni"] != undefined) {
            this.dni = lista[0]["dni"];
          }

        }
      }


    });
  }

  ngOnInit(){


  }







}
