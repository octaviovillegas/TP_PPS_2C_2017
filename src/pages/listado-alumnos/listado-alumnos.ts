import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";

@IonicPage()
@Component({
  selector: 'page-listado-alumnos',
  templateUrl: 'listado-alumnos.html',
})
export class ListadoAlumnosPage {

  private foto:string;
  private listado:Array<string>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alumnoDB:AlumnoServiceProvider, public modalCtrl:ModalController
  ) {}

  ionViewDidLoad() {
    this.listado = new Array<string>();
    this.foto="";
    this.alumnoDB.getAlumnosLista().subscribe(lista=>{
      this.listado = lista;
      console.log('lista alumnos: ', this.listado);
    })

  }

  abrirModalView(alumno){
    console.log(alumno);
    let consultaView = this.modalCtrl.create('ConsultarBajaModifPage', {'alumno':alumno});
    consultaView.present();
  }

  /* eliminar(alumno:any){

    console.log('modificar', alumno);
    let modalAlumno = this.modalCtrl.create('DatosAlumnosPage', {'alumno':alumno, 'boolDatos':true});
    modalAlumno.present();
  }

  modificar(alumno:any){

    console.log('modificar', alumno);
    let modalAlumno = this.modalCtrl.create('DatosAlumnosPage', {'alumno':alumno, 'boolDatos':false});
    modalAlumno.present();
  }
  */





}
