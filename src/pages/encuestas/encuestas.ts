import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { setInterval, setTimeout } from 'timers';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {

  public tab: string= "actual";
  //Actual
  public respuesta: string;
  public lastEncuesta: any;
  public currentKey: string;
  public puedoResponder: boolean = true;
  //Crear
  private formCrear: FormGroup;
  //Estadisticas
  @ViewChild('tortaCanvas') tortaCanvas;
  public tortaGrafico: any;
  public myDate;
  public myOtherDate;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    private authAf : AngularFireAuth,
    public af: AngularFireDatabase) {
    this.formCrear = this.formBuilder.group({
        pregunta: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        respuestaA: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        respuestaB: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        fechaInicio: ['', Validators.compose([Validators.required])],
        fechaFin: ['', Validators.compose([Validators.required])]
    });
    this.initRef();
  }

  public getMinDate(): string {
    let date = new Date();
    return date.getMonth() + "-" + date.getDate()  + "-" + date.getFullYear();
  }

  public getMaxDate(): string {
    let date = new Date();
    date.setMonth(date.getMonth() + 4);
    return date.getMonth() + "-" + date.getDate()  + "-" + date.getFullYear();
  }

  public initRef(): void {
    this.af.database.ref("/encuestas/").on('value', encuestas => {
      if(encuestas.val() != undefined){
        let props = Object.getOwnPropertyNames(encuestas.val());
        let current = encuestas.val()[props[props.length -1]];
        this.lastEncuesta = current;
        this.currentKey = props[props.length -1];
        if(current.termina > new Date().getTime()) {
          if(current.terminado == 0) {
            this.respuesta = "A";
            this.getTime();
            let respondieron = current.respondieron;
            console.log(respondieron);
            let propRes = Object.getOwnPropertyNames(respondieron);
            let email = this.authAf.auth.currentUser.email;
            propRes.forEach( p => {
              console.log(respondieron[p]);
              if(respondieron[p] == email){
                this.puedoResponder = false;
              }
            });
          }
        } else {
          this.tab = "estadisticas";
          this.loadEstadisticas();
          this.setTerminado(props[props.length -1]);
        }
      }
    })
  }

  private setTerminado(key: string): void {
    this.af.list("/encuestas").update(key, {
      terminado: 1
    });
  }

  public hayEncuesta(): boolean {
    return this.lastEncuesta != undefined && this.lastEncuesta.terminado == 0;
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
    data["A"] = 0;
    data["B"] = 0;
    data["respondieron"] = {
      hola: "hola"
    };
    this.af.list("/encuestas").push(data);
    this.formCrear.reset();
  }

  public getTime(): void {
    setInterval( () => {
      if(this.lastEncuesta != null && this.lastEncuesta != undefined) {
        let duration = this.lastEncuesta.termina - new Date().getTime();
        let horNum = parseInt(((duration/(1000*60*60))%24) + "");
        let minNum = parseInt(((duration/(1000*60))%60) + "");
        let segNum = parseInt(((duration/1000)%60) + "");
        let horas = (horNum < 10) ? "0" + horNum : horNum;
        let minutos = (minNum < 10) ? "0" + minNum : minNum;
        let segundos = (segNum < 10) ? "0" + segNum : segNum;
        if(horas <= 0 && minutos <= 0 && segundos <= 0){
          this.initRef();
        }
        this.lastEncuesta.cuenta = horas + ":" + minutos + ":" + segundos;
      }
    }, 1000)
  }

  public responderPreg() {
    this.af.list("/encuestas").update(this.currentKey, {
      [this.respuesta]: this.lastEncuesta[this.respuesta] + 1
    });
    this.af.database.ref("/usuarios/").on('value', usr => {
      let datos = usr.val();
      let props = Object.getOwnPropertyNames(usr.val());
      let email = this.authAf.auth.currentUser.email;
      props.forEach( p => {
        if(datos[p].email == email){
          this.af.list("/encuestas/" + this.currentKey).update("respondieron", {
            [datos[p].legajo]: email
          });
        }
      });
    });
    let id = this.authAf.auth.currentUser;
    this.tab = "estadisticas";
    this.loadEstadisticas();
  }

  public loadEstadisticas() {
    setTimeout( () => {
      this.tortaGrafico = new Chart(this.tortaCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: [this.lastEncuesta.respuestaA, this.lastEncuesta.respuestaB],
          datasets: [{
            label: '# of Votes',
            data: [this.lastEncuesta.A, this.lastEncuesta.B],
            backgroundColor: ['#FF6384','#36A2EB',],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }]
        }
      });
    }, 500);
  }


}
