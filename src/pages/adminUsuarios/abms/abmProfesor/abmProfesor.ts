import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-abmProfesor',
  templateUrl: 'abmProfesor.html',
})
export class AbmProfesorPage {
  
  private tab;
  private profesores: FirebaseListObservable<any[]>;
  private userImg = "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png";
  //Lista
  private searchValue: string;
  private filterType: string;
  private modifId: string;
  private modifHasImg: string;
  private imgUrl: string;
  private imgName: string;
  private imgFile: string;
  //Alta
  private formAlta: FormGroup;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, 
    private authAf: AngularFireAuth,
    private formBuilder: FormBuilder,
    private camera: Camera) {
      this.tab = "lista";
      //Lista
      this.filterType = "Apellido";
      this.modifId = "";
      this.modifHasImg = "";
      this.imgUrl = "";
      this.imgName = "";
      this.imgFile = "";
      //Alta
      this.filterProfesor();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
        materia: ['', Validators.compose([Validators.required])],
        curso: ['', Validators.compose([Validators.required])]
      });
      this.loadImage();
  }

  public loadImage(){
    setTimeout(() => {
      if(this.imgName != "") {
        storage().ref(this.imgName).getDownloadURL().then(url => {
          this.imgUrl = url;
        }).catch(err => {
          //alert("no uacho rompi to2");
          if(this.imgName != "temp"){
            this.imgName = "";
          } else {
            this.imgUrl = "http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif";
          }
        });
      }
      this.loadImage();
    }, 300);
  }

  //LISTA DE PROFESORES
  public eliminarProfesor(profesorId: string, apellido: string): void {
    let prompt = this.alertCtrl.create({
      title: 'Confirmar',
      message: "¿Seguro que queres eliminar al profesor " + apellido + "?",
      buttons: [{
        text: 'Si',
        role: 'destructive',
        handler: data => { this.profesores.remove(profesorId); }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: data => { }
      }]
    });
    prompt.present();
  }

  public modificarProfesor(profesor: any): void {
       this.formAlta.controls['nombre'].setValue(profesor.nombre);
       this.formAlta.controls['apellido'].setValue(profesor.apellido);
       this.formAlta.controls['email'].setValue(profesor.email);
       this.formAlta.controls['pass'].setValue(profesor.pass);
       this.formAlta.controls['materia'].setValue(profesor.materia);
       this.formAlta.controls['curso'].setValue(profesor.curso);
       this.modifId = profesor.$key;
       this.imgName = profesor.email;
       this.modifHasImg = profesor.tieneFoto;
       this.tab = "agregar";
  }

  //AGREGAR PROFESOR
  public agregarProfesor(): void{
    if(this.modifId == "") {
      let data: {} = this.formAlta.value;
      this.authAf.auth.createUserWithEmailAndPassword(data["email"], data["pass"]).then(r => {
        let prompt = this.alertCtrl.create({ title: 'Profesor agregado', buttons: [{ text: 'Ok',}] });
        prompt.present();
        data["tipo"] = "profe";
        data["tieneFoto"] = this.imgName == "" ? "0" : "1";
        if(data["tieneFoto"] == "1") {
          this.subirFoto(this.formAlta.value["email"]);
        }
        this.af.list("/usuarios").push(data);
        this.formAlta.reset();
      }).catch(err => {
        let message;
        if((err as any).code == "auth/weak-password"){
          message = "La contraseña es muy debil";
        } else if((err as any).code == "auth/email-already-in-use"){
          message = "Este mail ya se encuentra en uso";
        } else if((err as any).code == "auth/invalid-email"){
          message = "Email invalido";
        } else if((err as any).code == "auth/operation-not-allowed"){
          message = "Bardiamos fuerte...";
        }
        this.alertCtrl.create({ title: message, buttons: [{ text: 'Ok',}] }).present();
      });
    } else {
      this.profesores.update(this.modifId, {
         nombre: this.formAlta.controls['nombre'].value,
         apellido: this.formAlta.controls['apellido'].value,
         email: this.formAlta.controls['email'].value,
         pass: this.formAlta.controls['pass'].value,
         materia: this.formAlta.controls['materia'].value,
         curso: this.formAlta.controls['curso'].value
       });
       if(this.modifHasImg == "1" && this.imgFile != "") {
        this.subirFoto(this.formAlta.controls['email'].value);
       }
       let prompt = this.alertCtrl.create({ title: 'Profesor modificado', buttons: [{ text: 'Ok',}] });
       prompt.present();
       this.formAlta.reset();
       this.imgFile = "";
       this.imgName = "";
       this.imgUrl = "";
      }
    this.modifId = "";
    this.modifHasImg = "";
  }

  public takePicture(): void {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
        storage().ref('temp').delete();
        this.imgFile = 'data:image/jpeg;base64,' + imageData;
        let pictures = storage().ref('temp');
        this.imgName = "temp";
        pictures.putString(this.imgFile, 'data_url');
        alert(this.imgName);
    });
  }

  public subirFoto(email: string) {
    let pictures = storage().ref(email);
    pictures.putString(this.imgFile, 'data_url');
  }

  public onInput($event): void {
    this.filterProfesor();
  }

  private filterProfesor(): any {
    this.profesores = this.af.list("/usuarios").map(usuario => usuario.filter((usuario: any) => {
      if(usuario.tipo == "profe"){
        if(this.searchValue != "" && this.searchValue != undefined) {
          if(this.filterType == "Nombre"){
            return usuario.nombre.indexOf(this.searchValue) > 0;
          } else if(this.filterType == "Apellido"){
            return usuario.apellido.indexOf(this.searchValue) > 0;
          } else if(this.filterType == "Email"){
            return usuario.email.indexOf(this.searchValue) > 0;
          }
        }
        return true;
      }
    })) as FirebaseListObservable<any[]>;
  }

  public cambiarDeTab() {
    if(this.modifId != "" && this.tab != "agregar") {
      let prompt = this.alertCtrl.create({
        title: 'Confirmar',
        message: "¿Seguro que perder las modificaciones?",
        buttons: [{
          text: 'Si',
          handler: data => { 
            this.modifId = "";
            this.formAlta.reset();
            this.imgUrl = "";
            this.imgName = "";
            this.modifHasImg = "";
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: data => { 
            this.tab = "agregar";
          }
        }]
      });
      prompt.present();
    }
  }

}