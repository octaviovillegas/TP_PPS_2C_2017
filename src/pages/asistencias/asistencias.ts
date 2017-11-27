import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AsistenciasProvider } from "../../providers/asistencias/asistencias";

import { Alumno } from "../../clases/alumno";
/**
 * Generated class for the AsistenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asistencias',
  templateUrl: 'asistencias.html',
})

export class AsistenciasPage {

filtro = "filtroBotones";
today = new Date();
fecha : string;
asistenciaPor = "Materia";
turno = "Turno";
public mostrar:boolean;
public alumnos;
arrayPresentes : Array<any> = [];
diaSeleccionado = false;
aulaSeleccionado = false;
materiaSeleccionado = false;
comisionSeleccionada = false;
profesorSeleccionado = false;
cantidadAlumnos = 0;
cantidadMaterias = 0;
cantidadComisiones = 0;
cantidadProfesores = 0;  
profesores;
materias;
comisiones;  
arrayAsistencia : Array<asistencia> = [];


 
restablecerValores()
{    
  this.filtro = "filtroBotones";
  this.diaSeleccionado = false;
  this.aulaSeleccionado = false;
  this.materiaSeleccionado = false;
  this.comisionSeleccionada = false;
  this.profesorSeleccionado = false;
  this.cantidadMaterias = 0;
  this.cantidadAlumnos = 0;
  this.cantidadComisiones = 0;
  this.cantidadProfesores = 0;
  this.arrayPresentes = [];
  this.arrayAsistencia = [];

}

constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public ARP:AsistenciasProvider,
          /*  private nativeAudio: NativeAudio,
            public vibration : Vibration,*/
public alertCtrl: AlertController) {
              this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();
              this.mostrar=false;
           /*   this.nativeAudio.preloadSimple('Okay', 'assets/sonidos/ok.mp3');
              this.nativeAudio.preloadSimple('Error', 'assets/sonidos/fail.mp3');*/
            }

ionViewDidLoad() {

  console.log('ionViewDidLoad Asistencias');
}






subirAsistencias()
{
  this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();

  
  
              let alert = this.alertCtrl.create({
                              title: 'Asistencia',
                              subTitle: "Asistencia tomada correctamente",
                              buttons: ['Aceptar']
                            });
                            alert.present();
}

filtrarPor(filtroEntrante)
{
  
  this.mostrar=true;
  switch (filtroEntrante) {
    case 'DIA':
      this.filtro = 'Dia';        
      break;  

    case 'AULA':
      this.filtro = 'Aula';
      break;

    case 'MATERIA':
      this.filtro = 'Materia';
      this.ARP.traerListadoMaterias().subscribe(item => {
        
        this.materias = item;
        if(item.length == 0)
        {
          this.showAlert("MATERIAS");
          this.restablecerValores();
        }
        else{
          this.cantidadMaterias = item.length;
        }
                 
      });
        
      break;

    case 'PROFESOR':
      this.filtro = 'Profesor';
      
      break;
    
  } 
}

filtrarPorDia(DiaEntrante)
{
  this.ARP.traerAlumnos().subscribe(item=>{
    this.alumnos = item;
    this.cantidadAlumnos = item.length;
    //this.comisiones = item;
   // this.cantidadComisiones = item.length;
    this.materiaSeleccionado = false;
    this.filtro = "false";
    if(this.cantidadAlumnos == 0)
    {
     // this.showAlert("Comision");
      this.restablecerValores();
    }
    else{
      for(var i = 0; i< this.cantidadAlumnos;i++)
      {
        this.arrayPresentes.push("Ausente");          
      }
      console.log(this.arrayPresentes);
      console.log(this.cantidadAlumnos);
    }
   
    
  });
    
  
  
}

filtrarPorAula(aulaSeleccionado){
    
  this.ARP.traerAlumnos().subscribe(item=>{

   /* if(item.respuesta1 == aulaSeleccionado)
    {
      this.cantB += 1;
      console.log("buena",this.cantB);
      
    }/*/
    this.alumnos = item;
    this.cantidadAlumnos = item.length;
    //this.comisiones = item;
   // this.cantidadComisiones = item.length;
    this.materiaSeleccionado = false;
    this.filtro = "false";
    if(this.cantidadAlumnos == 0)
    {
     // this.showAlert("Comision");
      this.restablecerValores();
    }
    else{
      for(var i = 0; i< this.cantidadAlumnos;i++)
      {
        this.arrayPresentes.push("Ausente");          
      }
      console.log(this.arrayPresentes);
      console.log(this.cantidadAlumnos);
    }
   
    
  });
  
}

filtrarPorMateria(idMateriaSeleccionada){
  this.ARP.traerAlumnos().subscribe(item=>{
    this.alumnos = item;
    this.cantidadAlumnos = item.length;
    //this.comisiones = item;
   // this.cantidadComisiones = item.length;
    this.materiaSeleccionado = false;
    this.filtro = "false";
    if(this.cantidadAlumnos == 0)
    {
     // this.showAlert("Comision");
      this.restablecerValores();
    }
    else{
      for(var i = 0; i< this.cantidadAlumnos;i++)
      {
        this.arrayPresentes.push("Ausente");          
      }
      console.log(this.arrayPresentes);
      console.log(this.cantidadAlumnos);
    }
   
    
  });
}



filtrarPorProfesor(idProfesor){
    
}


showAlert(criterioBusqueda) {
 // this.vibration.vibrate(550);
  let alert = this.alertCtrl.create({
    title: 'BUSQUEDA VACIA',
    subTitle: 'Tu busqueda para ' + criterioBusqueda + " a resultado vacia",
    buttons: ['OK']
  });
  alert.present();
}
}

class asistencia {
  id_alumno: number;
  id_comision: number;
  fecha : string;
  estado : string;
  constructor(alumno,comision,fecha,estado) {
      this.id_alumno = alumno;
      this.id_comision = comision;
      this.fecha = fecha;
      this.estado = estado;
  }    
}
