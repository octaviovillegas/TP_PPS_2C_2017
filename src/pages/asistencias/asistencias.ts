import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AsistenciasProvider } from "../../providers/asistencias/asistencias";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {storage, initializeApp}  from 'firebase';
import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";

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

  mes;
foto;
  anio;
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
legajo;
materias;
comisiones;  
//arrayAsistencia : Array<asistencia> = [];
dia = this.today.getDay();
DiaSem = "";




 
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
  //this.arrayAsistencia = [];

}

constructor(public navCtrl: NavController,
            public navParams: NavParams,private camera:Camera,private dbPersonas:AlumnoServiceProvider,
            public ARP:AsistenciasProvider,
          /*  private nativeAudio: NativeAudio,
            public vibration : Vibration,*/
public alertCtrl: AlertController) {
              this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();
              this.mostrar=false;
              this.dia =  this.today.getDate();
    
            }

ionViewDidLoad() {

  console.log('ionViewDidLoad Asistencias');
  
}

DiaSemana () {

let today:Date = new Date();
let dia = today.getDay();
console.log('dia',dia);
  
  switch (dia) {
    case 0:
      this.DiaSem = 'Domingo';
      break;  
    case 1:
      this.DiaSem = 'Lunes';        
      break;
    case 2:
      this.DiaSem = 'Martes';        
      break;
    case 3:
      this.DiaSem = 'Miercoles';        
      break;
    case 4:
      this.DiaSem = 'Jueves';        
      break;
    case 5:
      this.DiaSem = 'viernes';        
      break;
    case 6:
      this.DiaSem = 'Sabado';        
      break;
                
  }
  
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
                            this.navCtrl.push(AsistenciasPage);
                            
}

filtrarPor(filtroEntrante)
{
  
  this.mostrar=true;
  switch (filtroEntrante) {
    case 'DIA':

    this.filtrarPorDia(this.dia);
    console.log(this.dia);
    this.filtrarPorDia(this.dia);
  
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

sacarFoto(){
  let options:CameraOptions ={
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
    targetHeight:600,
    targetWidth:600,
    correctOrientation:true,
    saveToPhotoAlbum:true,
    cameraDirection:this.camera.Direction.BACK
  };
/*
  this.camera.getPicture(options).then((imagen)=>{
        let imagenData = 'data:image/jpeg;base64,'+ imagen;
        let upload = this.storageRef.child('alumnos/' + this.legajo + '.jpg').putString(imagen, 'base64');

        upload.then((snapshot=>{
              this.dbPersonas.guardarLinkFoto(snapshot.downloadURL, this.legajo);
              this.foto=snapshot.downloadURL;
              let msjOK = this.alertCtrl.create({
                subTitle: 'Imagen guardada',
                buttons: ['Aceptar']
               });
               msjOK.present();
        })
        );
      });
}
}*/

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
}
}
