import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlumnoServiceProvider } from '../../providers/alumno-service/alumno-service';
import { Alumno } from '../../clases/alumno';

@IonicPage()
@Component({
  selector: 'page-datos-alumnos',
  templateUrl: 'datos-alumnos.html',
})
export class DatosAlumnosPage {

  private alumno:any;
  private mostrarDatos:boolean;
  private nombre:string;
  private legajo:string;
  private correo:string;
  private foto:string;
  private listaMaterias:Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alumnoDB:AlumnoServiceProvider, public view:ViewController
              

  ) {}

  ionViewDidLoad() {
    this.listaMaterias = new Array<string>();
    this.alumno = this.navParams.get('alumno');
    this.mostrarDatos = this.navParams.get('boolDatos');
    console.log('nombre: ', this.alumno.nombre);
    this.nombre = this.alumno.nombre;
    this.legajo = this.alumno.legajo;
    this.correo = this.alumno.correo;
    this.foto = this.alumno.foto;
    this.alumnoDB.traerListadoMateriasPorAlumno(this.legajo).subscribe(lista=>{
      this.listaMaterias = lista;
      console.log('this.listaMaterias', this.listaMaterias);
    })
  }


  cancelarOpe(){
    this.view.dismiss();
  }

  eliminarAlumno(){
    
    this.alumnoDB.borrarAlumno(this.legajo);

    this.view.dismiss();
  }

  modificarAlumno(){
    
    let alumno:Alumno=new Alumno();
    alumno.setLegajo(this.legajo);
    alumno.setCorreo(this.correo);
    alumno.setNombre(this.nombre);
    alumno.setFoto(this.foto);
    this.alumnoDB.modificarAlumno(alumno);

    this.view.dismiss();
  }

}
