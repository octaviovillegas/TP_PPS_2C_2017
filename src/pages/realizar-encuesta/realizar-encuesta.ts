
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Encuesta } from '../../services/encuesta.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';


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



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,
      private pictureUtils: Encuesta){
      this.ObtenerLista();
      this.mostrarEncuesta=false;
      this.mostrarTodas=true;
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
    alert("respuesta Guardada");
    this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado+'/'+this.respuesta);
    this.Unalista.push(1);
    this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado+'/total');
    this.Unalista.push(1);
    this.Unalista=this.afDB.list('Respuestas/'+this.tituloSeleccionado);
    console.log("jjsj");
    this.Unalista.subscribe(result => {console.log('dfkjdkfj'+result);
     var aux;  });
   
     //aux=result.length;
     //this.i=aux;
     //this.lis.push(aux);
     //this.unaEncuesta.MB=this.i;
     
 





    this.navCtrl.push(BotonesPage);
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
