import { Component, OnInit } from '@angular/core';

import { ProfesorServiceProvider } from "../../providers/profesor-service/profesor-service";
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { ConsultarBajaModifPage } from "../../pages/consultar-baja-modif/consultar-baja-modif";

@Component({
  selector: 'lista-profesores',
  templateUrl: 'lista-profesores.html'
})
export class ListaProfesoresComponent implements OnInit {

  private foto:string;
  private listado:Array<string>;

  constructor(
                private profesorDB:ProfesorServiceProvider, public modalCtrl:ModalController,
                public view:ViewController, public navCtrl:NavController

  ) {}

  ngOnInit(){
    this.foto = '';
    this.profesorDB.getProfesoresLista().subscribe(lista=>{
      this.listado = lista;
    });
  }


  abrirModalView(profesor){
    console.log(profesor);
    let consultaView = this.modalCtrl.create('ConsultarBajaModifPage', {'profesor':profesor});
    consultaView.present();
    //this.navCtrl.push(ConsultarBajaModifPage, {'profesor':profesor});
  }

  public irAFormProfesor(){
    this.navCtrl.push('ProfesoresFormPage');
  }





}
