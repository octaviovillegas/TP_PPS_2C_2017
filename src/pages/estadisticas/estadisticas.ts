import { Component, ViewChild } from '@angular/core';
import { Content,Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { Encuesta } from "../../app/clases/encuesta";
//import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable';
import firebase from 'firebase';

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
 MB:number=0;
public B:number=0;
public lis:Array<number>;

//listcodigos: FirebaseListObservable<any>;
listaCuestionarios:FirebaseListObservable<any>;
unaLista:FirebaseListObservable<any>;
listaEncuestas:Array<number>;
lista: Array<any> = new Array;
unaEncuesta:Encuesta;
mostrarencuestas:boolean;
mostrarGraficos:boolean;
l:Observable<any>;
algo =[];
algo2 =[];
algo3 =[];
algo4 =[];

items2: Observable<any[]>;


constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl : AlertController,
 
  public actionSheetCtrl: ActionSheetController,
  public afDB: AngularFireDatabase) {
    this.unaEncuesta= new Encuesta();
    
    this.mostrarGraficos=false;
    this.CargarListaCuestionarios();
    this.mostrarencuestas=true;
    this.MB=0;
        

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
console.log(this.unaEncuesta.opcion+this.unaEncuesta.nombre+this.unaEncuesta.pregunta);
this.i=0;
if(opcion=="dos"){
}
if(opcion=="uno"){
  this.lis=new Array<number>();
  this.unaLista=this.afDB.list('Respuestas/'+titulo+'/B/');
this.i=0;

this.unaEncuesta.MB=this.lis.length;
console.log('largo'+this.lis);
  console.log('mbbb'+this.unaEncuesta.MB);
console.log(this.lis);
/*


this.afDB.list('Respuestas/'+titulo+'/').subscribe(e=>{
  e.forEach(res=>{
     this.algo.push(res.MB);
  })
   this.algo.forEach(element => {
        this.MB++;   
      });
  const ref: firebase.database.Reference = firebase.database().ref('Estadisticas/'+titulo);
  ref.set({
    totalMb:this.MB}
  )
    // this.asignarMB(this.MB);
});*/

console.log('mb'+this.MB);

}
this.mostrarGraficos=true;
this.ngOnInit(titulo);

}
asignarMB(valor:number){
  console.log('valor'+valor);
  this.MB=valor;
  this.unaEncuesta.MB=valor;
  console.log(this.unaEncuesta.MB);

}
obtenerLongitud(lista:FirebaseListObservable<any>):any{
  lista.forEach(item => {
    console.log('Item:', item);
    
    console.log('l'+item.length);
    this.i=item.length;

    return item.length;

   
});}
//ngOnInit(dato1, dato2){}
public ngOnInit(titulo:string){

 /* this.afDB.list('Respuestas/'+titulo).subscribe(e=>{
    console.log('ssssaaaa'+e.totalMb)
    e.forEach(res=>{
       console.log('ooo'+res.totalMb);
    })
  });
  this.afDB.list('Estadisticas/Clase Matematica').subscribe(e=>{
    e.forEach(res=>{
       this.MB=res.totalMb;
       console.log('saksajndb'+this.MB)
    })
  });*/
      // this.asignarMB(this.MB);
  

  //console.log('eldato'+encuesta.MB);
  console.log(this.listaEncuestas);
  if (this.unaEncuesta.opcion=="uno")
  {
 this.ChartData1 = [
  {data: [2], label: 'Muy Bueno'},
  {data: [3], label: 'Bueno'},
  {data: [6], label: 'Regular'},
  {data: [5], label: 'Malo'}]
  this.ChartData2 = [
    {data: [2,3,6,5]
    , borderColor: ['#000000'], borderWidth: [10]},  ];
    this.ChartLabels2 = ['Muy Bueno','Bueno','Regular','Malo'];

}
else{
  this.ChartData1 = [
    {data: [5], label: 'Si'},
    {data: [6], label: 'No'},
    {data: [2], label: 'Puede Ser'}]
 this.ChartData2 = [
      {data: [5,6,2]
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
