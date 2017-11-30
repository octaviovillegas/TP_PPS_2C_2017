import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { ProfesorServiceProvider } from "../../providers/profesor-service/profesor-service";

@IonicPage()
@Component({
  selector: 'page-lista-profesores',
  templateUrl: 'lista-profesores.html',
})
export class ListaProfesoresPage {

  private foto:string;
  private listado:Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public profesorDB:ProfesorServiceProvider, public modalCtrl:ModalController,
              public view:ViewController

  ){}

  ionViewDidLoad() {
    this.foto = '';
    this.profesorDB.getProfesoresLista().subscribe(lista=>{
      this.listado = lista;
    });
  }


  abrirModalView(profesor){
    console.log(profesor);
    //let consultaView = this.modalCtrl.create('ConsultarBajaModifPage', {'profesor':profesor});
    //consultaView.present();
    this.navCtrl.push('ConsultarBajaModifPage', {'alumno':profesor});
  }



  public irAFormProfesor(){
    this.navCtrl.push('ProfesoresFormPage');
  }



}
