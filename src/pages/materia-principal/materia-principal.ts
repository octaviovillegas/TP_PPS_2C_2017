import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MateriasPage } from '../materias/materias';
import {ServMateriaProvider} from '../../providers/serv-materia/serv-materia';//AGRE



@IonicPage()
@Component({
  selector: 'page-materia-principal',
  templateUrl: 'materia-principal.html',
})
export class MateriaPrincipalPage {
  estado: string;
  listadoPersonas:string[];
  listadocero:string[];
  personas:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private ServMaterias:ServMateriaProvider) {
    this.personas="1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonasPage');
    this.ServMaterias.TraerMaterias()
      .then(data => {
        this.listadoPersonas=data;
     
      })
      .catch(error => {
          console.log('ERROR: '+error);
        });
  }
  back(){
    this.navCtrl.setRoot(HomePage);
  }
  modificar(x){
     this.estado='Modificar';
     this.navCtrl.push(MateriasPage, { estado: this.estado,idMateria:x['idMateria'] });
  }
  add(){
    this.estado='Alta';
    this.navCtrl.push(MateriasPage, { estado: this.estado });
  }

  initializeItems() {
    this.listadoPersonas=this.listadocero;
  }

}
