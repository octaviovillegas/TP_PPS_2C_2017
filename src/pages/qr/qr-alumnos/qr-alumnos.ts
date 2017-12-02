import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-qr-alumnos',
  templateUrl: 'qr-alumnos.html',
})
export class QrAlumnosPage implements OnInit {

  private alumnos: FirebaseListObservable<any[]>;
  private listAlumnos: any = []; 
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
  estadistica: boolean = false;
  laboratorio: boolean = false;
  programacion: boolean = false;
  aulaMaterias: boolean = false;

  scannedCode: string;
  scannedCodes: Array<string>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authAf: AngularFireAuth,
    public af: AngularFireDatabase,
    public barcodeScanner: BarcodeScanner) 
    {
      this.alumnos = this.af.list('/usuarios');
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
    if (this.scannedCode == "materiasPorAula") {
      this.emailCodigo = this.email;
      this.aulaMaterias = true;
    }
    if (this.scannedCode == "programacion") {
      this.programacion = true;
      this.laboratorio = false;
      this.estadistica = false;
    }
    if (this.scannedCode == "laboratorio") {
      this.programacion = false;
      this.laboratorio = true;
      this.estadistica = false;
    }
    if (this.scannedCode == "estadistica") {
      this.programacion = false;
      this.laboratorio = false;
      this.estadistica = true;
    }
    // if (this.scannedCode == "alumnoUbicacionMaterias") {
    //   this.emailCodigo = this.email;
    //   this.aulaMaterias = true;
    // }
    // if (this.scannedCode == "profesor") {
    //   swal({
    //     title: 'Error',
    //     text: 'QR válido solamente para profesores.',
    //     type: 'error',
    //     timer: 5000
    //   })
    // }
    if (this.scannedCode != "programacion" && this.scannedCode != "laboratorio" &&
    this.scannedCode != "estadistica" && this.scannedCode != "materiasPorAula") {
      swal({
        title: 'Error',
        text: 'QR inválido.',
        type: 'error',
        timer: 5000
      })
    }
  }
  
}
