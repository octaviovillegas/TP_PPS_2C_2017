import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';
import { Estudiante } from "../../app/clases/estudiante";


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
  students: Array<any>;
  noStudents:boolean;
  listaEstudiantes:Array<Estudiante>;
  unEstudiante:Estudiante;
  materia:string;
  aula:string;
  profesor:string;
  ocultarMateria:boolean;
  mostrarListado:boolean;
  ocultarAula:boolean;
  division:string;
  ocultarDivision:boolean;
  MostrarBotones:boolean;
  pormateria:boolean;
  pordivision:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl : AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private pictureUtils: PictureUtils,
    public afDB: AngularFireDatabase) {
     
      console.log(this.lista);
    
      this.ocultarMateria=true;
      this.mostrarListado=false;
      this.ocultarDivision=true;
      this.pormateria=false;
      this.pordivision=false;
      this.MostrarBotones=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarListaPage');
  }

   datachanged(usuario:any){
    console.log(usuario);
    this.user=usuario;
  
    
}
MateriaSeleccionada(e:string){
  this.materia=e;
console.log(e);
console.log("algo");
this.ocultarMateria=true;
if (this.pormateria){
this.ocultarDivision=false;}
else if (this.pordivision)
{this.mostrarListado=true;this.AsignarAula();
  this.refreshPicture();}
//this.ocultarAula=false;
}
AsignarAula(){
  if (this.materia=="Metodologia")
  {  if(this.division=="4A"){this.aula="305"; }
  else {this.aula="310"}
}
if (this.materia=="BaseDeDatos")
{  if(this.division=="4A"){this.aula="309"; }
else {this.aula="308"}
}
if (this.materia=="LaboratorioIV")
{  if(this.division=="4A"){this.aula="201"; }
else {this.aula="200"}
}
 
}
DivisionSeleccionada(e:string){
  this.division=e;
  this.ocultarDivision=true;
  if(this.pordivision){
  this.ocultarMateria=false;}
  else if(this.pormateria){
  this.mostrarListado=true;
this.AsignarAula();
this.refreshPicture();}
}

   refreshPicture() {
    this.listaEstudiantes=new Array<Estudiante>();
    console.log('Lista/'+this.division+'/'+this.materia+'/'+this.aula);
    this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula, { preserveSnapshot: true }).subscribe((snapshots: any) => {
    //this.afDB.list('Lista/Matematica', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.lista[index] = snapshot.val();
       
        var unEstudiante= new Estudiante();
        unEstudiante.userid = index;
        unEstudiante.firstname =  this.lista[index].nombre;
        unEstudiante.lastname =  this.lista[index].apellido;
        unEstudiante.present =  false;
       this.listaEstudiantes.push(unEstudiante);
       console.log(this.listaEstudiantes);

      });
    });
  }

  GuardarPresente(listaE: Array<Estudiante>){
    if (listaE.length > 0) {
      listaE.forEach(student =>
      {
        console.log(student.present);
        if (student.present)
        {
          this.Unalista=this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula+'/'+student.lastname+'/presente');
         // this.Unalista=this.afDB.list('Lista/Matematica/'+student.firstname+'/presente');
          this.Unalista.push(1);
          this.Unalista=this.afDB.list('Alumnos/'+student.lastname+'/'+this.materia+'/presente');
          this.Unalista.push(1);
          console.log(student.firstname);
          console.log("porguardar");
        }
        else if (student.present==false){
          this.Unalista=this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula+'/'+student.lastname+'/ausente');
          //this.Unalista=this.afDB.list('Lista/Matematica/'+student.firstname+'/ausente');
          this.Unalista.push(1);
          this.Unalista=this.afDB.list('Alumnos/'+student.lastname+'/'+this.materia+'/ausente');
          this.Unalista.push(1);
        }
      })
    }
    this.listaEstudiantes=null;
    alert("Los datos Fueron guardados Correctamente");
    this.navCtrl.push(BotonesPage);
      
  }


  PorMateria(){
this.MostrarBotones=false;
this.ocultarMateria=false;
this.pormateria=true;
  }
  PorDivision(){
    this.pordivision=true;
this.MostrarBotones=false;
this.ocultarDivision=false;
  }

  changePicture(){
    
      let actionSheet = this.actionSheetCtrl.create({
        enableBackdropDismiss: true,
        buttons: [
          {
            text: 'Tomar foto',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              this.pictureUtils.openCamera().then((imageData) => {
                this.pictureUtils.uploadProfilPicture(imageData,this.aula);
              });
            }
          }, {
            text: 'Subir de Galeria',
            icon: !this.platform.is('ios') ? 'images' : null,
            handler: () => {
              this.pictureUtils.openGallery().then((imageData) => {
                this.pictureUtils.uploadProfilPicture(imageData,this.aula);
              });
            }
          }
        ]
      });
      actionSheet.present();
      
   
  
    }






}
