import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-listaCurso',
  templateUrl: 'listaCurso.html',
})
export class ListaCursoPage {

  public materias: FirebaseListObservable<any[]>;
  public alumnos: FirebaseListObservable<any[]>;
  public base64Image: string;

  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase) {
      let nombre = navParams.get('nombre');
      let curso = navParams.get('curso');
      let key = navParams.get('key');
      this.filterAlumnos(nombre, curso);
      this.filterMaterias(nombre, curso);
  }

  takePicture(){
    console.log(Camera);
    /*Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });*/
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
    if(listo == 0) {
      this.alumnos.update(alumno.$key, {
        ["pres_" + materia]: this.alumnoPresente(alumno, materia) ? 0 : 1
      });
    }
  }

  public completarMateria(key: string){
    let prompt = this.alertCtrl.create({
      title: 'Completar',
      message: "¿Terminaste de tomar lista?",
      buttons: [{
        text: 'Si',
        handler: data => { 
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
