import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ProfesorServiceProvider } from "../../providers/profesor-service/profesor-service";
import { Profesor } from "../../clases/profesor";

@IonicPage()
@Component({
  selector: 'page-datos-profesores',
  templateUrl: 'datos-profesores.html',
})
export class DatosProfesoresPage {

  private profesor:any;
  private mostrarDatos:boolean;
  private nombre:string;
  private dni:string;
  private correo:string;
  private foto:string;
  private listaMaterias:Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public view:ViewController, private profesorDB:ProfesorServiceProvider

  ) {}

  ionViewDidLoad() {
    this.listaMaterias = new Array<string>();
    this.profesor = this.navParams.get('profesor');
    this.mostrarDatos = this.navParams.get('boolDatos');
    console.log('nombre: ', this.profesor.nombre);
    console.log('profesor: ', this.profesor);
    this.nombre = this.profesor.nombre;
    this.dni = this.profesor.legajo;
    this.correo = this.profesor.correo;
    this.foto = this.profesor.foto;
    this.profesorDB.traerListadoMateriasPorProfesor(this.dni).subscribe(lista=>{
      this.listaMaterias = lista;
      console.log('this.listaMaterias', this.listaMaterias);
    })
  }



  cancelarOpe(){
    this.view.dismiss();
  }

  eliminarAlumno(){
    this.profesorDB.borrarProfesor(this.dni);

    this.view.dismiss();
  }

  modificarAlumno(){
    let profesor:Profesor=new Profesor();
    profesor.setDNI(this.dni);
    profesor.setCorreo(this.correo);
    profesor.setNombre(this.nombre);
    profesor.setFoto(this.foto);
    this.profesorDB.modificarProfesor(profesor);

    this.view.dismiss();
  }




}
