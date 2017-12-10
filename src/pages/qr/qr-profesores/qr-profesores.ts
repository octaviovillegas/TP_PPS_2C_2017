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

    public showAlumnos: boolean = false;
    public currentProfesor: any;
    public scannedCode: string;
    public scannedCodes: Array<string>;

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
                        if(this.isMan()) {
                            this.cargarInfo(aul);
                        } else {
                            this.cargarInfo(aul);
                        }
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
        if(time <= 12){
            return true;
        } else {
            return false;
        }
    }

    private cargarInfo(aula: any): void{
        let turno = this.isMan() ? "Man" : "Tar";
        let dia: string;
        let diaProp: string;
        switch(new Date().getDay()){
            case 2:
                dia = "Martes";
                diaProp = "matMar";
                break;
            case 5:
                dia = "Viernes";
                diaProp = "matVier";
                break;
            case 6:
                dia = "Sabado";
                diaProp = "matSab";
                break;
        }

        if(aula["dia" + turno] == dia){
            this.alumnos = this.af.list('/usuarios').map(usr => usr.filter( usr => {
                if(usr.tipo == "alumno" && usr.turno == turno && usr[diaProp] == aula.materia){
                    return true;
                }
            })) as FirebaseListObservable<any[]>;
            this.showAlumnos = true;
        }
    }

}
