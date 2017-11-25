import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';
import { Estudiante } from "../../app/clases/estudiante";
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import * as papa from 'papaparse';


@Component({
  selector: 'page-tomar-lista',
  templateUrl: 'tomar-lista.html',
})
export class TomarListaPage {
  csvData: any[] = [];
  headerRow: any[] = [];
  items: FirebaseListObservable<any[]>;
  listadoAlumnos: any[] = [];
  Materia:string;
  lista: Array<any> = new Array;
  presente:boolean;
  Unalista:FirebaseListObservable<any>;
  unalista:FirebaseListObservable<any>;
  user:string;
  p:string;
  students: Array<any>;
  noStudents:boolean;
  listaEstudiantes:Array<Estudiante>;
  listaEstudiantes2:Array<Estudiante>;
  unEstudiante:Estudiante;
  materia:string='';
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
    private pictureUtils: PictureUtils,private http: Http,public datePipeCtrl: DatePipe,
    public afDB: AngularFireDatabase) {
     
      console.log(this.lista);
      this.listaEstudiantes2=new Array<Estudiante>();
      this.ocultarMateria=true;
      this.mostrarListado=false;
      this.ocultarDivision=true;
     // this.pormateria=false;
     // this.pordivision=false;
      this.MostrarBotones=true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarListaPage');
  let d =new Date();
  console.log(d);
  console.log(d.getDay());
  console.log(d.getHours());
  console.log(d.getFullYear());
  }

   datachanged(usuario:any){
    console.log(usuario);
    this.user=usuario;
     
}

Aula(dato:number){
  let d =new Date();
  console.log(d);
  console.log(d.getDay());
  console.log(d.getHours());
  this.aula=JSON.stringify(dato);
  if (dato==310){
    this.division='4A'
    if ((d.getDay()==3)&&(d.getHours()<14))
    {
      this.materia='PPS';
      this.mostrarListado=true;
      this.MostrarBotones=false;
      this.readCsvData();
    }
  }
  if (dato==305){
    this.division='4B'
    if ((d.getDay()==3)&&(d.getHours()<20))
    {
      this.materia='PPS';
      this.mostrarListado=true;
      this.MostrarBotones=false;
      this.readCsvData();
    }
  }
  console.log('materia'+this.materia);
  if (this.materia=='')
  {
    alert("No se estan dictando clases en el Aula seleccionada");
  }
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

  changePicture(){
    let datePipe = this.datePipeCtrl.transform(Date.now(), 'dd-MM-yyyy');
      let actionSheet = this.actionSheetCtrl.create({
        enableBackdropDismiss: true,
        buttons: [
          {
            text: 'Tomar foto',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              this.pictureUtils.openCamera().then((imageData) => {
                this.pictureUtils.uploadProfilPicture(imageData,this.aula,datePipe,this.materia,this.division);
                
              });
            }
          }, {
            text: 'Subir de Galeria',
            icon: !this.platform.is('ios') ? 'images' : null,
            handler: () => {
              this.pictureUtils.openGallery().then((imageData) => {
                this.pictureUtils.uploadProfilPicture(imageData,this.aula,datePipe,this.materia,this.division);
              });
            }
          }
        ]
      });
      actionSheet.present();
    }


    private readCsvData() {
      let cuatrimestre='';
      let d =new Date();
      if (d.getMonth()>7){ cuatrimestre='2c'; }
      if (d.getMonth()<=7){ cuatrimestre='1c'; }
    let texto ='assets/'+this.materia+'-'+this.division+'-'+cuatrimestre+d.getFullYear()+'.csv';
    console.log(texto);
      this.http.get(texto)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );

 
    }


  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
 
    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

   
  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
   
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;
    this.listadoAlumnos=this.csvData;
  console.log(this.listadoAlumnos.length);

     //this.lista[index] = snapshot.val();
     let i=-1;
    if (this.listadoAlumnos.length > 0) {
      this.listadoAlumnos.forEach (student=>{
        i++;
        console.log(this.listadoAlumnos[i][0]);
       
     var unEstudiante= new Estudiante();
     unEstudiante.userid = this.listadoAlumnos[i][0];
     unEstudiante.firstname =  this.listadoAlumnos[i][2];
     unEstudiante.lastname =  this.listadoAlumnos[i][1];
     unEstudiante.present =  false;
    this.listaEstudiantes2.push(unEstudiante);
    console.log(this.listaEstudiantes2);

    
  })}}
 
  private handleError(err) {
    console.log('something went wrong: ', err);
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }



  GuardarPresente2(listaE: Array<Estudiante>){
    let datePipe = this.datePipeCtrl.transform(Date.now(), 'dd-MM-yyyy');


    if (listaE.length > 0) {
      listaE.forEach(student =>
      {
        console.log(student.present);
        if (student.present)
        {
          this.unalista=this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula+'/'+datePipe);
        

         this.unalista.push({legajo:student.userid,apellido:student.lastname,nombre:student.firstname,presente:student.present});
          this.unalista=this.afDB.list('Alumnos/'+student.userid+'/'+this.materia+'/presente');
          this.unalista.push(1);
          console.log(student.firstname);
          console.log("porguardar");
        }
        else if (student.present==false){
         // this.Unalista=this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula+'/'+student.lastname+'/ausente');
          //this.Unalista=this.afDB.list('Lista/Matematica/'+student.firstname+'/ausente');
          this.unalista=this.afDB.list('Lista/'+this.division+'/'+this.materia+'/'+this.aula+'/'+datePipe);
          this.unalista.push({legajo:student.userid,apellido:student.lastname,nombre:student.firstname,presente:student.present});
          this.unalista=this.afDB.list('Alumnos/'+student.userid+'/'+this.materia+'/ausente');
          this.unalista.push(1);
        }
      })
    }
    this.listaEstudiantes2=null;
    this.listadoAlumnos=null;
    
    alert("Los datos Fueron guardados Correctamente");
    this.navCtrl.push(BotonesPage);
      
  }















}
