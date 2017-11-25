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



  eliminar(profesor:any){

        console.log('modificar', profesor);
        let modalAlumno = this.modalCtrl.create('DatosProfesoresPage', {'profesor':profesor, 'boolDatos':true});
        modalAlumno.present();
  }

  modificar(profesor:any){

        console.log('modificar', profesor);
        let modalAlumno = this.modalCtrl.create('DatosProfesoresPage', {'profesor':profesor, 'boolDatos':false});
        modalAlumno.present();
  }




}
