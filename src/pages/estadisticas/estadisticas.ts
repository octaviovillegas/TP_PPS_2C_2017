import { Component, ViewChild } from '@angular/core';
import { Content,Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { Encuesta } from "../../app/clases/encuesta";
//import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {
 
    
public ChartOptions1:any = {
  scaleShowVerticalLines: false,
  responsive: true,
  scaleShowValues: true,
  scaleValuePaddingX: 10,
  scaleValuePaddingY: 10,
  animation: {
    onComplete: function () {
        var chartInstance = this.chart,
        ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
        });
    }
}
};

public ChartOptions2:any = {
   scaleShowVerticalLines: false,
   responsive: true,
   scaleShowValues: true,
   scaleValuePaddingX: 10,
   scaleValuePaddingY: 10};
  // chartDatasets: Array<any> = [ {data: [30,40], borderColor: ['#000000'], borderWidth: [10]},];
  

public ChartType1:string = 'bar';
public ChartType2:string = 'pie';
public ChartLegend:boolean = true;
public ChartData1:any[];
public ChartData2:any[];
public ChartLabels1:string[];
public ChartLabels2:string[];
public i:number=0;
public lis:Array<any>;

//listcodigos: FirebaseListObservable<any>;
listaCuestionarios:FirebaseListObservable<any>;
unaLista:FirebaseListObservable<any>;
listaEncuestas:Array<Encuesta>;
lista: Array<any> = new Array;
unaEncuesta:Encuesta;
mostrarencuestas:boolean;
mostrarGraficos:boolean;
l:Observable<any>;
listavacia =[];


constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl : AlertController,
  public actionSheetCtrl: ActionSheetController,
  public afDB: AngularFireDatabase) {
    this.unaEncuesta= new Encuesta();
    
    this.mostrarGraficos=false;
    this.CargarListaCuestionarios();
    this.mostrarencuestas=true;

    this.afDB.list('/Respuestas/').subscribe(e=>{
      e.forEach(res=>{
      })
      this.listavacia.forEach(element => {
         });
    });

}

CargarListaCuestionarios()
{
  this.listaEncuestas=new Array<any>(); 
  this.afDB.list('Cuestionarios', { preserveSnapshot: true }).subscribe((snapshots: any) => {
    snapshots.forEach((snapshot, index) => {
      this.lista[index] = snapshot.val();
      console.log(this.lista);
    });
  });  
}
Seleccionar(titulo:string,pregunta:string,opcion:string){
this.unaEncuesta.nombre=titulo;
this.unaEncuesta.pregunta=pregunta;
this.unaEncuesta.opcion=opcion;
this.mostrarencuestas=false;
let MB:number=0;
let B:number=0;
let R:number=0;
let M:number=0;
let Si:number=0;
let No:number=0;
let PS:number=0;

this.afDB.list('/Respuestas/'+titulo+'/').subscribe(e=>{
  e.forEach(res=>{
     this.listavacia.push(res);
     console.log('res'+this.listavacia);
     console.log('res'+this.listavacia.length);  
  })
  this.listavacia.forEach(element => {
   if (element.res=='MB')
   {  MB=MB+1; }
   if (element.res=='B')
   {    B++; }
   if (element.res=='R')
   {    R++;}
   if (element.res=='M')
   { M++;}
   if (element.res=='SI')
   { Si++;}
   if (element.res=='NO')
   { No++;}
   if (element.res=='PuedeSer')
   { PS++;}
     });
     console.log('mb'+MB+'b'+B);
      this.CargarDatos(opcion,MB,B,R,M,Si,No,PS);
 
});

this.mostrarGraficos=true;

}

CargarDatos(opcion:string,mb:number,b:number,r:number,m:number,si:number,no:number,ps:number){
  console.log(mb+b+r+m);
  if (opcion=="uno")
  {
 this.ChartData1 = [
  {data: [mb], label: 'Muy Bueno'},
  {data: [b], label: 'Bueno'},
  {data: [r], label: 'Regular'},
  {data: [m], label: 'Malo'}]
  this.ChartData2 = [
    {data: [mb,b,r,m]
    , borderColor: ['#000000'], borderWidth: [10]},  ];
    this.ChartLabels2 = ['Muy Bueno','Bueno','Regular','Malo'];

}
else{
  this.ChartData1 = [
    {data: [si], label: 'Si'},
    {data: [no], label: 'No'},
    {data: [ps], label: 'Puede Ser'}]
 this.ChartData2 = [
      {data: [si,no,ps]
      , borderColor: ['#000000'], borderWidth: [10]},  ];
      this.ChartLabels2 = ['Si','No','Puede Ser'];
}
}

// eventos
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}



}
