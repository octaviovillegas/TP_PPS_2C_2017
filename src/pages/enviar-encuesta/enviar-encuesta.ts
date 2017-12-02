import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { EncuestasDataProvider } from '../../providers/encuestas-data/encuestas-data';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Encuesta } from "../../clases/encuesta";


@IonicPage()
@Component({
  selector: 'page-enviar-encuesta',
  templateUrl: 'enviar-encuesta.html',
})
export class EnviarEncuestaPage {
  private encuesta:any;
  private mostrarDatos:boolean;
  private codigo:string="";
  private pregunta:string="";
  private opcion1:string="";
  private opcion2:string="";
  private opcion3:string="";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public afDB: AngularFireDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, 
    public modalCtrl: ModalController,
    public eDataProvider: EncuestasDataProvider, 
   public datePipeCtrl: DatePipe,public view:ViewController) {
     
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
  cancelarOpe(){
    this.view.dismiss();
  }
  


  eliminarEncuesta(){
    this.eDataProvider.borrarEncuesta(this.codigo);

    this.view.dismiss();
  }

  modificarEncuesta(){
    let encuesta:Encuesta=new Encuesta();
    encuesta.setCodigo(this.codigo);
    encuesta.setPregunta(this.pregunta);
    encuesta.setOpcion1(this.opcion1);
    encuesta.setOpcion2(this.opcion2);
    encuesta.setOpcion3(this.opcion3);
    
     console.log(encuesta);
    this.eDataProvider.modificarEncuesta(encuesta);

    this.view.dismiss();
  }
}
