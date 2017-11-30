import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-consultar-baja-modif',
  templateUrl: 'consultar-baja-modif.html',
})
export class ConsultarBajaModifPage {

  private profesor:any;
  private alumno:any;
  private nombre:string="";
  private foto:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl:ModalController,public view:ViewController

  ) {}

  ionViewDidLoad() {
    if (this.navParams.get('profesor')!=undefined) {
      this.profesor = this.navParams.get('profesor');
      this.nombre = this.profesor.nombre;
      this.foto = this.profesor.foto;
    }else{
     this.alumno = this.navParams.get('alumno');
     this.nombre = this.alumno.nombre;
     this.foto = this.alumno.foto;
    }

  }

  eliminar(){
    if (this.profesor!=undefined) {
      let modalProfesor = this.modalCtrl.create('DatosProfesoresPage', {'profesor':this.profesor, 'boolDatos':true});
      modalProfesor.present();
    }else{
      let modalAlumno = this.modalCtrl.create('DatosAlumnosPage', {'alumno':this.alumno, 'boolDatos':true});
      modalAlumno.present();
    }


  }

  modificar(){
    if (this.profesor!=undefined) {
      let modalProfesor = this.modalCtrl.create('DatosProfesoresPage', {'profesor':this.profesor, 'boolDatos':false});
      modalProfesor.present();
    }else{
      let modalAlumno = this.modalCtrl.create('DatosAlumnosPage', {'alumno':this.alumno, 'boolDatos':false});
      modalAlumno.present();
    }

  }

  cancelarOpe(){
    this.view.dismiss();
  }

}
