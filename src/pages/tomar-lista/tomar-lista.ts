import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';


////$IMPORTSTATEMENT

/**
 * Generated class for the TomarListaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//$IONICPAGE
@Component({
  selector: 'page-tomar-lista',
  templateUrl: 'tomar-lista.html',
})
export class TomarListaPage {

  items: FirebaseListObservable<any[]>;
  Materia:string;
  lista: Array<any> = new Array;
  presente:boolean;
  Unalista:FirebaseListObservable<any>;
  user:string;
  p:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl : AlertController,
    public afDB: AngularFireDatabase) {
     this.refreshPicture();
      console.log(this.lista);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarListaPage');
  }
  listado(){
    this.items = this.afDB.list (this.Materia+'/Alumnos');
   
   }
   AgregarPresente(nombre:any,presente:boolean)
   {
    if (presente){
      console.log(nombre+"presente");
    }
    else{
      console.log(nombre+"ausente");
    }
    
   }
guardarDatos(){
  console.log("guardar lista");
  alert("Los datos Fueron guardados Correctamente");
  this.navCtrl.push(BotonesPage);

}
   Guardar(usuario:any,e:string){
  //  this.Unalista=this.afDB.list('Lista/Matematica/'+usuario+'/'+e);
 //   this.Unalista.push(1);
   }
   datachanged(usuario:any,e:string){
    console.log(usuario+e);
    this.user=usuario;
    this.p=e;
    this.Guardar(this.user,this.p);

   // this.Unalista=this.afDB.list('Lista/Matematica/'+usuario+'/'+e);
  //  this.Unalista.push(1);
  
   // if(e=="presente")
   // { 
    //  console.log("ESTA PRESENTE");
     // this.Unalista=this.afDB.list('Lista/Matematica/'+usuario+'/presente');
    //  this.Unalista.push(1);
    
    
   // }
  //  else{console.log("esta ausente");
   // this.Unalista=this.afDB.list('Lista/Matematica/'+usuario+'/ausente');
   // this.Unalista.push(1);
  
  
   
    //console.log(e.ausente.checked);
    
}
   refreshPicture() {
    this.afDB.list('Lista/Matematica', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.lista[index] = snapshot.val();
      });
    });
  }

}
