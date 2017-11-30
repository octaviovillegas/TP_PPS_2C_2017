import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Encuesta } from "../../clases/encuesta";
import {  ToastController } from 'ionic-angular';
import { GraficosPage } from '../graficos/graficos';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private encuesta:any;
  private mostrarDatos:boolean;
  private codigo:string="";
  private pregunta:string="";
  private opcion1:string="";
  private opcion2:string="";
  private opcion3:string="";
  public Preg1Rb;
  

  public pregunta1;
  fireDB : FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public afDB: AngularFireDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public modalCtrl: ModalController,
    public eDataProvider: EncuestasDataProvider, 
   public datePipeCtrl: DatePipe,public view:ViewController) {
     
    this.fireDB = afDB.list('/encuesta');
     
  }

  ionViewDidLoad() {
    this.encuesta = this.navParams.get('encuesta');
    this.codigo=this.encuesta.codigo;
    this.pregunta = this.encuesta.pregunta;
    this.opcion1 = this.encuesta.opcion1;
    this.opcion2 = this.encuesta.opcion2;
    this.opcion3 = this.encuesta.opcion3;
    
    console.log(this.encuesta);
    //console.log(this.profesor.nombre);
  } 

  subirEncuesta(){
    
         let respuestas={pregunta:"pregunta",respuesta1:this.Preg1Rb};
        // this.afDB.app.database().ref('/profesores').child(profesor.getDNI()).set(profesor);
         
          this.fireDB.push(respuestas);               
          let alert = this.alertCtrl.create({
              title: 'Gracias!',
              subTitle: 'Tus respuestas han sido procesadas.',
              buttons: ['OK']
            });
        alert.present();
        this.view.dismiss();
     /*   let consultaView = this.modalCtrl.create(GraficosPage, {'encuesta':this.encuesta});
        consultaView.present();*/
     
       }
    


  cancelarOpe(){
    this.view.dismiss();
  }
  

}
