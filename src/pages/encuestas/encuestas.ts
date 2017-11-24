import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  public tab: string= "actual";
  //Actual
  public respuesta: string;
  public lastEncuesta: BehaviorSubject<any>;
  //Crear
  private formCrear: FormGroup;
  //Estadisticas
  @ViewChild('tortaCanvas') tortaCanvas;

  tortaGrafico: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase) {
    this.formCrear = this.formBuilder.group({
        pregunta: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        respuestaA: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        respuestaB: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        tiempo: ['', Validators.compose([Validators.required])]
    });
    initRef();
  }

  public initRef(): void {
    this.af.database.ref("/encuestas").on("child_changed", snap => { 
      this.lastEncuesta = snap.val().last();
    });
  }

  public hayEncuesta(): boolean {
    return true;
  }

  public crearEncuesta(){
    let prompt = this.alertCtrl.create({ title: 'Encuesta creada', buttons: [{ text: 'Ok',}] });
    prompt.present();
    let data: {} = this.formCrear.value;
    data["creado"] = new Date().getTime();
    let tiempo = 0;
    if(data["tiempo"] == "2h"){
      tiempo = 7200000;
    } else if (data["tiempo"] == "1h") {
      tiempo = 3600000;
    } else if (data["tiempo"] == "30s") {
      tiempo = 30000;
    }
    data["termina"] = data["creado"] + tiempo;
    data["terminado"] = "0";
    this.af.list("/encuestas").push(data);
    this.formCrear.reset();
  }

  private milisegundosATiempo(duration: number): string {
    let horNum =   (duration/(1000*60*60))%24;
    let minNum = (duration/(1000*60))%60;
    let segNum = (duration/1000)%60;
    let horas = (horNum < 10) ? "0" + horNum : horNum;
    let minutos = (minNum < 10) ? "0" + minNum : minNum;
    let segundos = (segNum < 10) ? "0" + segNum : segNum;
    return horas + ":" + minutos + ":" + segundos;
 }

  public ionViewDidLoad() {
    this.tortaGrafico = new Chart(this.tortaCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ["Red", "Blue"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19],
          backgroundColor: ['#FF6384','#36A2EB',],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"]
        }]
      }
    });
  }


}
