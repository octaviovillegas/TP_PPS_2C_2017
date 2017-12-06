import { Component, OnInit, Input } from '@angular/core';

import { AlertController,  } from "ionic-angular";

import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";
import { ProfesorServiceProvider } from "../../providers/profesor-service/profesor-service";
import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";

@Component({
  selector: 'lector-qr',
  templateUrl: 'lector-qr.html'
})
export class LectorQrComponent implements OnInit {

  private url:any;
  private correo:string="";

  @Input() perfil:string="";
  private listaMaterias:any[];
  private listaPorAlumno:any[];
  private listaPorProfesor:any[];
  private objCode:{};
  private listado:string = "";
  private dato:string="";
  private tipo:string;
  private listaMateriasProf:any[];

  constructor(
              public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController,
              private alumnoDB:AlumnoServiceProvider, private profesorDB:ProfesorServiceProvider

  ) {}

  ngOnInit(){
    this.alumnoDB.traerListadoMaterias().subscribe(lista=>{
      this.listaMaterias = lista;
      console.log('lista materias completa: ', this.listaMaterias);
    });


      switch (this.tipo) {
        case 'alumno':


        break;
        case 'profesor':


        break;

        default:
        break;

      }
  }

  async leerQR() {
    let resultado:BarcodeScanResult = await this.barcodeScanner.scan();
    this.listado = resultado.text;
  }

  private armarObjCodeAlumno():string{
    let code:string = 'Materias y aulas: \n';
    console.log(this.listaMaterias);
    console.log(this.listaPorAlumno);
    this.listaPorAlumno.forEach(item => {
      console.log(item);
      let materia:string = item["nombre"];
      code += materia.toUpperCase() + "   Aula: " + item["aula"] + "\n";
      this.listaMaterias.forEach(i => {
        console.log(i["horarios"]);
          if (item==i["nombre"]) {
            let materia:string = item;
            code += materia.toUpperCase() + " Se cursa en Aula: " + i["aula"] + "\n";

          }
      });
    });
    console.log(code);
    return code;
  }

  private armarObjCodeTodosAlumnos(){
    let code:string = 'Materias y aulas: \n';
    console.log(this.listaMaterias);
    console.log(this.listaPorAlumno);
    this.listaMaterias.forEach(item => {
      console.log(item);
      let materia:string = item["nombre"];
      code += materia.toUpperCase() + "   Aula: " + item["aula"] + "\n";

    });

    console.log(code);
    return code;
  }

  private armarObjCodeProfesor() {
    let code:string = 'Materias y aulas: \n';
    console.log(this.listaMaterias);


    code+= "PROGRAMACION 3  Aula: lab 1";
    return code;

  }


  private encodeData(){
    console.log(this.armarObjCodeTodosAlumnos());
    console.log(this.tipo);
    if (this.perfil == 'alumno') {
      this.alumnoDB.traerMateriasPorAlumno_Correo(this.correo).subscribe(lista=>{
        this.listaPorAlumno = lista[0].materias;
        //this.armarObjCodeAlumno();
        this.armarObjCodeTodosAlumnos();
      });
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.armarObjCodeTodosAlumnos()).then((valor)=>{
        this.url = valor.file;
      });
    }else{
      console.log(this.armarObjCodeProfesor());
      this.listaMateriasProf = this.profesorDB.getMateriasProfesorPorCorreo(this.correo);
      console.log(this.listaMateriasProf);
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.armarObjCodeProfesor()).then((valor)=>{
        this.url = valor.file;
      });
    }

  }







}
