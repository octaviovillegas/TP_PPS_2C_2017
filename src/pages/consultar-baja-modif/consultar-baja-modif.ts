import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-consultar-baja-modif',
  templateUrl: 'consultar-baja-modif.html',
})
export class ConsultarBajaModifPage {

  private profesor:any;
  private nombre:string="";
  private foto:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl:ModalController,public view:ViewController

  ) {}

  ionViewDidLoad() {
    
    this.profesor = this.navParams.get('profesor');
    this.nombre = this.profesor.nombre;
    this.foto = this.profesor.foto;
    console.log(this.profesor);
    console.log(this.profesor.nombre);

    
  }

  eliminar(){
    let modalAlumno = this.modalCtrl.create('DatosProfesoresPage', {'profesor':this.profesor, 'boolDatos':true});
    modalAlumno.present();
    
  }

  modificar(){
    console.log('modificar', this.profesor);
    let modalAlumno = this.modalCtrl.create('DatosProfesoresPage', {'profesor':this.profesor, 'boolDatos':false});
    modalAlumno.present();
  }

  cancelarOpe(){
    this.view.dismiss();
  }

}
