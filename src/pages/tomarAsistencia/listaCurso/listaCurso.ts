import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import { PushService } from "../../../services/push.service";

@IonicPage()
@Component({
  selector: 'page-listaCurso',
  templateUrl: 'listaCurso.html',
})
export class ListaCursoPage {

  public materias: FirebaseListObservable<any[]>;
  public alumnos: FirebaseListObservable<any[]>;
  public imagenName: string;
  public imagen: string;

  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    private camera: Camera,
    private pushService: PushService) {
      let nombre = navParams.get('nombre');
      let turno = navParams.get('turno');
      let dia = navParams.get('dia');
      this.filter(nombre, turno, dia);
      this.imagenName = nombre+dia;
      this.loadImage();
  }

  public loadImage(){
    storage().ref(this.imagenName).getDownloadURL().then(url => {
      this.imagen = url;
      setTimeout(() => {
        this.loadImage();
      }, 300);
    }).catch(err => {
      setTimeout(() => {
        this.loadImage();
      }, 300);
    });
  }

  public takePicture(): void {
    let options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        storage().ref(this.imagenName).putString(base64Image, 'data_url');
        this.imagen = "assets/spinner.gif";
    }).catch(function(reason) {
      alert(reason);
    });;
  }
  
  private filter(nombre: string, turno: string, dia: string): void {
    let diaProp = dia == "Martes" ? "matMar" : (dia == "Viernes" ? "matVier" : "matSab");
    this.alumnos = this.af.list("/usuarios").map(usr => usr.filter(usr => {
      if(usr.tipo == "alumno" && usr.turno == turno && usr[diaProp] == nombre) {
        return true;
      } 
      return false;
    })) as FirebaseListObservable<any[]>;

    this.materias = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.nombre == nombre && materia.turno == turno && materia.dia == dia) {
        return true;
      } 
      return false;
    })) as FirebaseListObservable<any[]>; 
  }

  public alumnoPresente(alumno: any, materia: string): boolean {
    return alumno["pres_" + materia] == 1;
  }

  public setPresente(alumno: any, materia: string, listo: number): void {
    if (listo == 0) {
      let isPresente: boolean;
      isPresente = this.alumnoPresente(alumno, materia);
      this.alumnos.update(alumno.$key, {
        ["pres_" + materia]: isPresente ? 0 : 1
      });
      if (!isPresente) {
        this.pushService.avisarDeFaltas(alumno.email);
      }
    }
  }

  public completarMateria(key: string){
    let prompt = this.alertCtrl.create({
      title: 'Completar',
      message: "¿Terminaste de tomar lista?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.takePicture();
          this.materias.update(key, {
            listo: 1
          });
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }]
    });
    prompt.present();
  }

  public reabrirMateria(key: string){
    let prompt = this.alertCtrl.create({
      title: 'Reabrir',
      message: "¿Queres reabrir la materia?",
      buttons: [{
        text: 'Si',
        handler: data => { 
          this.materias.update(key, {
            listo: 0
          });
          if(this.imagen != null && this.imagen != undefined) {
            this.imagen = undefined;
            storage().ref(this.imagenName).delete();
            this.imagen = undefined;
          }
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }]
    });
    prompt.present();
  }

}
