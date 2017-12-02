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
    return date.getFullYear() + "-" + (date.getMonth() < 10 ? "0" : "") + date.getMonth()  + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
  }

  public getMaxDate(): string {
    let date = new Date();
    date.setMonth(date.getMonth() + 4);
    return date.getFullYear() + "-" + (date.getMonth() < 10 ? "0" : "") + date.getMonth()  + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
  }
  
  public isInvalidDate(): boolean {
    if(this.formCrear != undefined) {
      console.log(this.formCrear.value);
      let inicioStr = this.formCrear.value["fechaInicio"];
      let finStr = this.formCrear.value["fechaFin"];
      if(inicioStr != "" && inicioStr != null && inicioStr != undefined
      && finStr != "" && finStr != null && finStr != undefined) {
        if(new Date(inicioStr) <= new Date(finStr)){
          return false;
        } 
      }
    }
    return true;
  }

  public initRef(): void {
    this.af.database.ref("/encuestas/").on('value', encuestas => {
      if(encuestas.val() != undefined){
        let props = Object.getOwnPropertyNames(encuestas.val());
        let current = encuestas.val()[props[props.length -1]];
        this.lastEncuesta = current;
        this.currentKey = props[props.length -1];
        let startTime = new Date(current.fechaInicio);
        let endTime = new Date(current.fechaFin);
        if(startTime <= new Date() && endTime >= new Date()) {
          if(current.terminado == 0) {
            this.respuesta = "A";
            let respondieron = current.respondieron;
            let propRes = Object.getOwnPropertyNames(respondieron);
            let email = this.authAf.auth.currentUser.email;
            propRes.forEach( p => {
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
    data["terminado"] = "0";
    data["A"] = 0;
    data["B"] = 0;
    data["respondieron"] = {
      hola: "hola"
    };
    this.af.list("/encuestas").push(data);
    this.formCrear.reset();
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
