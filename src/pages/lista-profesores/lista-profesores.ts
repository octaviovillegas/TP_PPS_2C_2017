import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
              public profesorDB:ProfesorServiceProvider

  ){}

  ionViewDidLoad() {
    this.foto = '';
    this.profesorDB.getProfesoresLista().subscribe(lista=>{
      this.listado = lista;
    });
  }

}
