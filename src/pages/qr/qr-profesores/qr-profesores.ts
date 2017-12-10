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
    public showInfo: boolean = true;
    public currentAula: any;
    public currentMateria: any;
    public esSuyaMan: boolean = false;
    public esSuyaTar: boolean = false;
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
        this.cargarInfo("aula");
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
        let turno = this.isMan() ? "Man" : "Tar";
        let dia: string = "Sabado";
        let diaProp: string = this.getDiaProp();
        switch(new Date().getDay()){
            case 2:
                dia = "Martes";
                break;
            case 5:
                dia = "Viernes";
                break;
            case 6:
                dia = "Sabado";
                break;
        }
        this.currentAula = aula;
        this.currentMateria = aula["mat" + turno];
        if(aula["dia" + turno] == dia){
            this.alumnos = this.af.list('/usuarios').map(usr => usr.filter( usr => {
                if(usr.tipo == "alumno" && usr.turno == turno && usr[diaProp] == aula["mat" + turno]){
                    return true;
                }
            })) as FirebaseListObservable<any[]>;
            this.showListado = true;
        } 
        this.showInfo = true;
        this.mostrarSiEsSuClase(aula);
    }

    private getDiaProp(): string {
        let diaProp: string;
        switch(new Date().getDay()){
            case 2:
                diaProp = "matMar";
                break;
            case 5:
                diaProp = "matVier";
                break;
            case 6:
                diaProp = "matSab";
                break;
        }
        return diaProp;
    }

    private mostrarSiEsSuClase(aula: any) {
        if(this.currentProfesor) {
            this.esSuyaMan = true;
            this.esSuyaTar = true;
        }
    }

    public filtrarAlumnos(turno: string, materia: string) {
        this.showListado = true;
        this.currentMateria = materia;
        let diaProp = this.getDiaProp();
        this.alumnos = this.af.list('/usuarios').map(usr => usr.filter( usr => {
            if(usr.tipo == "alumno" && usr.turno == turno && usr[diaProp] == materia){
                return true;
            }
        })) as FirebaseListObservable<any[]>;
    }


}
