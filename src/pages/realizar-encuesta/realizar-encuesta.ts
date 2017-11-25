
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Encuesta } from '../../services/encuesta.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';
import { DatePipe } from '@angular/common';


/**
 * Generated class for the RealizarEncuestaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-realizar-encuesta',
  templateUrl: 'realizar-encuesta.html',
})
export class RealizarEncuestaPage {
  unaLista: Array<any> = new Array;
  preguntaSeleccionada:string;
  tituloSeleccionado:string;
  opcionSeleccionada:string;
  mostrarEncuesta:boolean;
  mostrarTodas:boolean;
  respuesta:string;
  Unalista:FirebaseListObservable<any>;
  fecha:Date;
  fechastring:string;
  date:string;
  respuestaTexto:string='';



  constructor(public navCtrl: NavController, public datePipeCtrl: DatePipe,public navParams: NavParams,
    public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,
      private pictureUtils: Encuesta){
      this.ObtenerLista();
      this.mostrarEncuesta=false;
      this.mostrarTodas=true;
      this.fecha =new Date();
      console.log(this.fecha);
      console.log(this.fecha.getMonth());
      this.fechastring=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate();
      console.log(this.fechastring);
       this.date = this.datePipeCtrl.transform(Date.now(), 'yyyy-MM-dd');
      console.log(this.date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarEncuestaPage');
  }
  ObtenerLista() {
    this.afDB.list('Cuestionarios/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.unaLista[index] = snapshot.val();
      });
    });
  }
  guardarRespuesta(value:string){
    console.log("guardar respuesta");
    console.log(value);
    this.respuesta=value;
    

    let toast = this.toastCtrl.create({
      message: 'Respuesta guardada',
      duration: 2000
    });
    toast.present();


    //this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado+'/'+this.respuesta);
    this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado);
    this.Unalista.push({res:this.respuesta});
    this.navCtrl.push(BotonesPage);
  }
  EnviarRespuesta(){
    console.log("guardar respuesta");
    
    

    //this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado+'/'+this.respuesta);
    if (this.respuestaTexto!=''){
      this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado);
      this.Unalista.push({res:this.respuestaTexto});
      let toast = this.toastCtrl.create({
        message: 'Respuesta guardada',
        duration: 2000
      });
      toast.present();
      this.navCtrl.push(BotonesPage);
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'No ingresó respuesta',
        duration: 2000
      });
      toast.present();
    }
  }




  Seleccionar(titulo:string,pregunta:string,opcion:string){
this.tituloSeleccionado=titulo;
console.log(pregunta);
console.log(titulo);
this.preguntaSeleccionada=pregunta;
this.opcionSeleccionada=opcion;
this.mostrarTodas=false;

this.mostrarEncuesta=true;

  }

}
