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
algo =[];


constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl : AlertController,
  public actionSheetCtrl: ActionSheetController,
  public afDB: AngularFireDatabase) {
    this.unaEncuesta= new Encuesta();
    
    this.mostrarGraficos=false;
    this.CargarListaCuestionarios();
    this.mostrarencuestas=true;
        

}

CargarListaCuestionarios()
{
  this.listaEncuestas=new Array<any>(); 
  this.afDB.list('Cuestionarios', { preserveSnapshot: true }).subscribe((snapshots: any) => {
    snapshots.forEach((snapshot, index) => {
      this.lista[index] = snapshot.val();
     /* this.unaEncuesta.nombre =this.lista[index].nombre;
      this.unaEncuesta.pregunta =this.lista[index].pregunta;
      this.unaEncuesta.opcion =this.lista[index].opcion;
      this.unaEncuesta.MB =this.lista[index].MB.length;
      this.unaEncuesta.B =this.lista[index].B.length;
      this.unaEncuesta.M =this.lista[index].M.length;
      this.unaEncuesta.R =this.lista[index].R.length;
      this.unaEncuesta.Si =this.lista[index].Si.length;
      this.unaEncuesta.No =this.lista[index].No.length;
      this.unaEncuesta.PuedeSer =this.lista[index].PuedeSer.length;*/
      //this.listaEncuestas.push(unaEncuesta);
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
this.unaLista=this.afDB.list('Respuestas/'+titulo+'/Si/');
this.unaLista.forEach(item => {
  console.log('Item:', item);
  
;});
//his.unaEncuesta.Si=i;

this.unaLista=this.afDB.list('Respuestas/'+titulo+'/No/');
this.unaLista.forEach(item => {
  console.log('Item:', item);
});
//this.unaEncuesta.No=i;

this.unaLista=this.afDB.list('Respuestas/'+titulo+'/PuedeSer/');
this.unaLista.forEach(item => {
  console.log('Item:', item);
  });
//this.unaEncuesta.PuedeSer=i;
}
if(opcion=="uno"){
  this.lis=new Array<any>();
  this.unaLista=this.afDB.list('Respuestas/'+titulo+'/MB');
  this.unaLista.forEach(item => {
    console.log('Item:', item);
    var aux;
    aux=item.length;
    this.lis.push(aux);
  });

  this.lis.forEach(item => {
    console.log('Item:', item);
    
    this.unaEncuesta.MB=item.aux;
    
  });


  console.log('mbbb'+this.unaEncuesta.MB);
console.log(this.lis);
console.log(this.lis.indexOf(0));
console.log(this.lis[0].value());

if (this.lis.length>0){
  this.unaEncuesta.MB=this.lis[0];
  console.log('mbbb'+this.unaEncuesta.MB);
}


  //this.l=new Array<any>();
 //
  //this.l=this.afDB.list('Respuestas/'+titulo+'/MB/');
 // this.unaEncuesta.MB=this.unaLista.lift.length;
 // this.l.subscribe(result => {console.log('dfkjdkfj'+result.length)
 // var aux;

  //aux=result.length;
  //this.i=aux;
  //this.lis.push(aux);
  //this.unaEncuesta.MB=this.i;
  
//});
}
this.mostrarGraficos=true;
this.CargarDatos();
}

//ngOnInit(dato1, dato2){}
CargarDatos(){
  if (this.unaEncuesta.opcion=="uno")
  {
 this.ChartData1 = [
  {data: [this.unaEncuesta.MB], label: 'Muy Bueno'},
  {data: [this.unaEncuesta.B], label: 'Bueno'},
  {data: [this.unaEncuesta.R], label: 'Regular'},
  {data: [this.unaEncuesta.M], label: 'Malo'}]
  this.ChartData2 = [
    {data: [this.unaEncuesta.MB,this.unaEncuesta.B,this.unaEncuesta.R,this.unaEncuesta.M]
    , borderColor: ['#000000'], borderWidth: [10]},  ];
    this.ChartLabels2 = ['Muy Bueno','Bueno','Regular','Malo'];

}
else{
  this.ChartData1 = [
    {data: [this.unaEncuesta.Si], label: 'Si'},
    {data: [this.unaEncuesta.No], label: 'No'},
    {data: [this.unaEncuesta.PuedeSer], label: 'Puede Ser'}]
 this.ChartData2 = [
      {data: [this.unaEncuesta.Si,this.unaEncuesta.No,this.unaEncuesta.PuedeSer]
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
