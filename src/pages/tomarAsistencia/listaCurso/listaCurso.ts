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
  public pictures;
  public imagen: string;

  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    private camera: Camera,
    private pushService: PushService) {
      let nombre = navParams.get('nombre');
      let curso = navParams.get('curso');
      this.filterAlumnos(nombre, curso);
      this.filterMaterias(nombre, curso);
      this.pictures = storage().ref(nombre+curso);
      this.loadImage();
  }

  public loadImage(){
    this.pictures.getDownloadURL().then(url => {
      this.imagen = url;
      setTimeout(() => {
        this.loadImage();
      }, 300);
    }).catch(err => {});
  }

  public takePicture(): void {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.pictures.putString(base64Image, 'data_url');
    });
  }
  
  private filterAlumnos(nombre: string, curso: string): void {
    this.alumnos = this.af.list("/usuarios").map(usr => usr.filter(usr => {
      if(usr.tipo == "alumno" && usr[nombre] == curso) {
        return true;
      } 
      return false;
    })) as FirebaseListObservable<any[]>;
  }

  private filterMaterias(nombre: string, curso: string): void {
    this.materias = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.nombre == nombre && materia.curso == curso) {
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
