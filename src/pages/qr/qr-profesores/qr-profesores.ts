import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireAuth } from 'angularfire2/auth';
import swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-qr-profesores',
  templateUrl: 'qr-profesores.html',
})
export class QrProfesoresPage implements OnInit {
    
    public currentProfesor: any;
    public scannedCode: string;
    public scannedCodes: Array<string>;
    
    public showListado: boolean = false;
    public showInfo: boolean = false;
    public currentAula: any;
    public currentMateria: string;
    public currentTurno: string;
    public esSuyaMan: boolean = false;
    public esSuyaNoch: boolean = false;
    public alumnos: FirebaseListObservable<any[]> = this.af.list('/usuarios');

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public authAf: AngularFireAuth,
        public af: AngularFireDatabase,
        public barcodeScanner: BarcodeScanner) 
    {
    }

    public ngOnInit(){
        this.af.list('/usuarios').map(usr => usr.filter( usr => {
            if(usr.tipo == "profesor" && usr.email == this.authAf.auth.currentUser.email){
                this.currentProfesor = usr;
            }
        })).subscribe();
    }

    async scanCode(){
        const result = await this.barcodeScanner.scan();
        this.scannedCode = await result.text;
        this.processScan();
    }

    private processScan(): void{
        let obj: any = JSON.parse(this.scannedCode);   
        if(obj.tipo = "aula"){
            let numero = obj.numero;
            this.af.database.ref("/aulas/").on('value', aulas => {
                let props = Object.getOwnPropertyNames(aulas.val());
                props.forEach(p => {
                    let aul = aulas.val()[p];
                    if(aul.numero == numero){
                        this.cargarInfo(aul);
                    }
                });
            });
        } else {
            swal({
                title: 'Error',
                text: 'QR inválido.',
                type: 'error',
                timer: 5000
            });
        }
    }

    private isMan(): boolean{
        let time = new Date().getHours();
        if(time <= 12 || time >= 22){
            return true;
        } else {
            return false;
        }
    }

    private cargarInfo(aula: any): void {
        let turno = this.isMan() ? "Man" : "Noch";
        let dayNum = new Date().getDay();
        let dia = dayNum == 2 ? "Martes" : (dayNum == 5 ? "Viernes" : "Sabado");
        this.currentAula = aula;
        this.currentMateria = aula["mat" + turno];
        this.currentTurno = turno == "Man" ? "M" : "N";
        if(aula["dia" + turno] == dia) {
            this.filtrarAlumnos(turno, aula["mat" + turno], dia);
        } else {
            this.filtrarAlumnos(turno, aula.matMan, dia);
        }
        this.showInfo = true;
        this.mostrarSiEsSuClase(aula);
    }

    private mostrarSiEsSuClase(aula: any) {
        alert(this.currentProfesor);
        if(this.currentProfesor) {
            this.esSuyaMan = true;
            this.esSuyaNoch = true;
        }
    }

    public filtrarAlumnos(turno: string, materia: string, dia: string) {
        this.currentMateria = materia;
        this.currentTurno = turno == "Man" ? "M" : "N";
        let diaProp: string = dia == "Martes" ? "matMar" : (dia == "Viernes" ? "matVier" : "matSab");
        this.alumnos = this.af.list('/usuarios').map(usr => usr.filter( usr => {
            if(usr.tipo == "alumno" && usr.turno == turno && usr[diaProp] == materia){
                return true;
            }
        })) as FirebaseListObservable<any[]>;
        this.showListado = true;
    }
}
