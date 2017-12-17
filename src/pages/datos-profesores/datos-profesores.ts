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
    this.listaMaterias = this.profesor.materias;
    console.log('this.listaMaterias', this.listaMaterias);
    this.nombre = this.profesor.nombre;
    this.dni = this.profesor.dni;
    console.log(this.dni);
    this.correo = this.profesor.correo;
    this.foto = this.profesor.foto;

  }



  cancelarOpe(){
    this.view.dismiss();
  }

  eliminarMateria(materia:string){

      console.log('mate', materia);
      this.profesorDB.traerListadoMateriasPorProfesor().subscribe(lista=>{
        console.log('lista', lista);
        lista.forEach(materiaa => {
            console.log('materia: ', materiaa.materias);
            materiaa.materias.forEach(item => {
              console.log('item: ', item);
              console.log('mte: ', materia);
              if (item == materia) {
                let indice:number = materiaa.materias.indexOf(materia);
                console.log('indice: ', indice);
                materiaa.materias.splice(indice, 1);
                console.log('nuevo array: ', materiaa.materias);
                console.log('nuevo profesor: ', this.profesor.materias=materiaa.materias);
                this.profesor.materias=materiaa.materias;
                let nuevoProfesor:Profesor = new Profesor();
                nuevoProfesor.setCorreo(this.correo);
                nuevoProfesor.setDNI(this.dni);
                nuevoProfesor.setFoto(this.foto);
                nuevoProfesor.setMateria(this.profesor.materias);
                nuevoProfesor.setNombre(this.nombre);
                nuevoProfesor.setPerfil('profesor');
                this.profesorDB.modificarProfesor(nuevoProfesor);
                this.view.dismiss();
              }
            });
        });
      })
  }

  modificarMateria(materia:any){
      console.log(materia);
  }

  eliminarProfesor(){
    this.profesorDB.borrarProfesor(this.dni);

    this.view.dismiss();
  }

  modificarProfesor(){
    let profesor:Profesor=new Profesor();
    profesor.setDNI(this.dni);
    profesor.setCorreo(this.correo);
    profesor.setNombre(this.nombre);
    profesor.setFoto(this.foto);
    console.log(profesor);
    this.profesorDB.modificarProfesor(profesor);

    this.view.dismiss();
  }




}
