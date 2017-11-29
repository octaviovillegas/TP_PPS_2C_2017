import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-qr-profesores',
  templateUrl: 'qr-profesores.html',
})
export class QrProfesoresPage implements OnInit {

  private profesores: FirebaseListObservable<any[]>;
  private listAlumnos: FirebaseListObservable<any[]>; 
  apellido;

  user = this.authAf.auth.currentUser;
  name;
  email;
  emailCodigo;
  photoUrl;
  uid;
  emailVerified;
  tipo: string = "alumno";
  ninguno: string = "Ninguno";
  estadistica: string = "Estadistica";
  laboratorio: string = "Laboratorio";
  programacion: string = "Programacion";

  scannedCode: string;
  scannedCodes: Array<string>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authAf: AngularFireAuth,
    public af: AngularFireDatabase,
    public barcodeScanner: BarcodeScanner) 
    {
      this.profesores = this.af.list('/usuarios');
    }

    ngOnInit(): void {
      this.datosUsuario();
    }

    datosUsuario(){
      if (this.user != null) {
        this.name = this.user.displayName;
        this.email = this.user.email;
        this.photoUrl = this.user.photoURL;
        this.emailVerified = this.user.emailVerified;
        this.uid = this.user.uid;
      }
    }

  async scanCode(){
    const result = await this.barcodeScanner.scan();
    this.scannedCode = await result.text;
    if (this.scannedCode == "profesor") {
      //this.informacion(this.alumno);
      this.emailCodigo = this.email;
      //this.scannedCodes.push("100");
    }
    if (this.scannedCode == "alumno") {
      swal({
        title: 'Error',
        text: 'QR válido solamente para alumnos.',
        type: 'error',
        timer: 5000
      })
    }
    if (this.scannedCode != "alumno" && this.scannedCode != "profesor") {
      swal({
        title: 'Error',
        text: 'QR inválido.',
        type: 'error',
        timer: 5000
      })
    }
  }
  

//   public informacion(alumno: any): void {
//     this.formAlta.controls['nombre'].setValue(alumno.nombre);
//     this.formAlta.controls['apellido'].setValue(alumno.apellido);
//     this.formAlta.controls['legajo'].setValue(alumno.legajo);
//     this.formAlta.controls['Programacion'].setValue(alumno.Programacion);
//     this.formAlta.controls['Laboratorio'].setValue(alumno.Laboratorio);
//     this.formAlta.controls['Estadistica'].setValue(alumno.Estadistica);
//     this.formAlta.controls['email'].setValue(alumno.email);
//     this.formAlta.controls['pass'].setValue(alumno.pass);
//     this.modifId = alumno.$key;

// }



}
