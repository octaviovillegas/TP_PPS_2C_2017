import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from "@ionic-native/barcode-scanner";

import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";

@IonicPage()
@Component({
  selector: 'page-form-alumnos-qr',
  templateUrl: 'form-alumnos-qr.html',
})
export class FormAlumnosQrPage {
  private url:any;
  private correo:string="";

  private perfil:string="";
  private listaMaterias:any[];
  private listaPorAlumno:any[];
  private objCode:{};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController,
              private alumnoDB:AlumnoServiceProvider

  ) {}



  ionViewDidLoad() {
    console.log(this.navParams.data);

    this.alumnoDB.traerListadoMaterias().subscribe(lista=>{
      this.listaMaterias = lista;
      console.log('lista materias completa: ', this.listaMaterias);
    });
    this.correo = this.navParams.get('correo');
    this.perfil = this.navParams.get('perfil');


    switch (this.perfil) {
      case 'alumno':
                    this.alumnoDB.traerMateriasPorAlumno_Correo(this.correo).subscribe(lista=>{
                      this.listaPorAlumno = lista[0].materias;
                      //this.armarObjCodeAlumno();
                      this.armarObjCodeTodosAlumnos();
                    });

      break;

      default:
        break;
    }

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


  private encodeData(){
    console.log(this.armarObjCodeTodosAlumnos());
    if (this.perfil == 'alumno') {
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.armarObjCodeTodosAlumnos()).then((valor)=>{
        this.url = valor.file;
      });
    }

  }





}
