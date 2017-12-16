import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import { PushService } from "../../../services/push.service";
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-listaCurso',
  templateUrl: 'listaCurso.html',
})
export class ListaCursoPage {
  
  private currentMateria: any;
  //Asistencias
  public tab: string = "asistencia";
  public materias: FirebaseListObservable<any[]>;
  public alumnos: FirebaseListObservable<any[]>;
  public imagenName: string;
  public imagen: string;
  private alumnosContados = new Array<string>();
  //Estadisticas
  @ViewChild('tortaCanvas') tortaCanvas;
  public tortaGrafico: any;

  constructor(public navParams: NavParams,
    public navControl: NavController,
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
      this.navControl.viewDidEnter.subscribe(() => { this.actualize(); });
  }

  public actualize() {
    this.af.list("/materias").update(this.currentMateria.$key, {
      presentes: this.currentMateria.presentes,
      ausentes: this.currentMateria.ausentes
    });
  }

  public loadImage(){
    storage().ref(this.imagenName).getDownloadURL().then(url => {
      this.imagen = url;
      setTimeout(() => {
        this.loadImage();
      }, 1000);
    }).catch(err => {
      setTimeout(() => {
        this.loadImage();
      }, 1000);
    });
  }

  public setCurrentMateria(materia: any) {
    if(this.currentMateria == undefined) {
      this.currentMateria = materia;
      this.currentMateria["presentes"] = 0;
      this.currentMateria["ausentes"] = 0;
      this.currentMateria["totales"] = 0;
    }
  }

  public updateAsistencias(alumno: any) {
    if(this.alumnosContados.indexOf(alumno.email) == -1){
      if(alumno["pres_" + this.currentMateria.nombre] == 1) {
        let presentes: number = this.currentMateria["presentes"] != undefined ? this.currentMateria["presentes"] as number : 0;
        presentes = (presentes as number) + 1;
        this.af.list("/materias").update(this.currentMateria.$key, {
          presentes: presentes
        });
        this.currentMateria["presentes"] = presentes;
      } else {
        let ausentes: number = this.currentMateria["ausentes"] != undefined ? this.currentMateria["ausentes"] as number : 0;
        ausentes = (ausentes as number) + 1;
        this.af.list("/materias").update(this.currentMateria.$key, {
          ausentes: ausentes
        });
        this.currentMateria["ausentes"] = ausentes;
      }
      let totales: number = this.currentMateria["totales"] != undefined ? this.currentMateria["totales"] as number : 0;
      totales = (totales as number) + 1;
      this.af.list("/materias").update(this.currentMateria.$key, {
        totales: totales
      });
      this.currentMateria["totales"] = totales;
      this.alumnosContados.push(alumno.email);
    }
  }

  public emailSinArroba(email: string): string {
    let array = email.split('@');
    let retorno: string = "";
    array.forEach(c => {
      retorno += c;
    });
    return retorno;
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

  public alumnoPresente(alumno: any, dia: string): boolean {
    return alumno["pres_" + dia] == 1;
  }

  public setPresente(alumno: any, dia: string, listo: number): void {
    if (listo == 0) {
      let isPresente: boolean;
      isPresente = this.alumnoPresente(alumno, dia);
      this.alumnos.update(alumno.$key, {
        ["pres_" + dia]: isPresente ? 0 : 1
      });
      if (!isPresente) {
        this.pushService.avisarDeFaltas(alumno.email);
        this.currentMateria.presentes += 1;
        this.currentMateria.ausentes -= 1;
      } else {
        this.currentMateria.presentes -= 1;
        this.currentMateria.ausentes += 1;
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
          this.af.list("/materias").update(key, {
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
          this.af.list("/materias").update(key, {
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

  //Estadisticas
  public loadEstadisticas() {
    setTimeout( () => {
      this.tortaGrafico = new Chart(this.tortaCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: ["Presentes", "Ausentes"],
          datasets: [{
            label: '# of Votes',
            data: [this.currentMateria.presentes, this.currentMateria.ausentes],
            backgroundColor: ['#FF6384','#36A2EB'],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }]
        }
      });
    }, 500);
  }

}
