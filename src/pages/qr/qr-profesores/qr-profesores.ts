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
    public tipo: string = "alumno";
    public ninguno: string = "Ninguno";
    public scannedCode: string;
    public scannedCodes: Array<string>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public authAf: AngularFireAuth,
        public af: AngularFireDatabase,
        public barcodeScanner: BarcodeScanner) 
    {
        alert("fasd");
    }

    public ngOnInit(){
        this.af.list('/usuarios').map(usr => usr.filter( usr => {
            if(usr.tipo == "profesor" && usr.email == this.authAf.auth.currentUser.email){
                this.currentProfesor = usr;
            }
        })).subscribe();
    }

    public async scanCode(){
        alert("fasdfasdfasdfa");
        this.isMan();
        let promise = await this.barcodeScanner.scan();
        let result = await promise.text;
        this.processScan(result);
        alert(result);
    }

    private processScan(result: string): void{
        let obj: any = JSON.parse(result);   
        if(obj.tipo = "aula"){
            let numero = obj.numero;
            this.af.database.ref("/aulas/").on('value', aulas => {
                let props = Object.getOwnPropertyNames(aulas.val());
                props.forEach(p => {
                    let aul = aulas.val()[p];
                    if(aul.numero == numero){
                        if(this.isMan()) {
                            this.cargarInfo(aul["matMan"]);
                            alert("Maniana");
                        } else {
                            this.cargarInfo(aul["matTar"]);
                            alert("Tarde");
                        }
                    }
                });
            });
        } else {
            
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

    private cargarInfo(materia: string){
        this.mostrarAlumnosYFiltrar(materia);
    }

    private mostrarAlumnosYFiltrar(materia: string): void{

    }

}
