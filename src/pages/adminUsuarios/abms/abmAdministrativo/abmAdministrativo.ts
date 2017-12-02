import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-abmAdministrativo',
  templateUrl: 'abmAdministrativo.html',
})
export class AbmAdministrativoPage {
  
  private tab;
  private admins: FirebaseListObservable<any[]>;
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
      this.filterAdmin();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
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

  //LISTA DE ADMINISTRATIVOS
  public eliminarAdmin(adminId: string, apellido: string): void {
    let prompt = this.alertCtrl.create({
      title: 'Confirmar',
      message: "Seguro que queres eliminar al administrativo " + apellido + "?",
      buttons: [{
        text: 'Si',
        role: 'destructive',
        handler: data => { this.admins.remove(adminId); }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: data => { }
      }]
    });
    prompt.present();
  }

  public modificarAdmin(admin: any): void {
       this.formAlta.controls['nombre'].setValue(admin.nombre);
       this.formAlta.controls['apellido'].setValue(admin.apellido);
       this.formAlta.controls['legajo'].setValue(admin.legajo);
       this.formAlta.controls['email'].setValue(admin.email);
       this.formAlta.controls['pass'].setValue(admin.pass);
       this.modifId = admin.$key;
       this.imgName = admin.email;
       this.modifHasImg = admin.tieneFoto;
       this.tab = "agregar";
  }

  //AGREGAR ADMINISTRATIVO
  public agregarAdmin(): void{
    if(this.modifId == "") {
      let data: {} = this.formAlta.value;
      this.authAf.auth.createUserWithEmailAndPassword(data["email"], data["pass"]).then(r => {
        let prompt = this.alertCtrl.create({ title: 'Admin agregado', buttons: [{ text: 'Ok',}] });
        prompt.present();
        data["tipo"] = "admin";
        data["tieneFoto"] = this.imgName == "" ? "0" : "1";
        if(data["tieneFoto"] == "1") {
          this.subirFoto(this.formAlta.value["email"]);
        }
        this.imgFile = "";
        this.imgName = "";
        this.imgUrl = "";
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
      this.admins.update(this.modifId, {
        nombre: this.formAlta.controls['nombre'].value,
        apellido: this.formAlta.controls['apellido'].value,
        legajo: this.formAlta.controls['legajo'].value,
        email: this.formAlta.controls['email'].value,
        pass: this.formAlta.controls['pass'].value,
      });
      if(this.modifHasImg == "1" && this.imgFile != "") {
        this.subirFoto(this.formAlta.controls['email'].value);
      }
      let prompt = this.alertCtrl.create({ title: 'Administrativo modificado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.formAlta.reset();
      this.imgFile = "";
      this.imgName = "";
      this.imgUrl = "";
    }
    this.modifHasImg = "";
    this.modifId = "";
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
    });
  }

  public subirFoto(email: string) {
    let pictures = storage().ref(email);
    pictures.putString(this.imgFile, 'data_url');
  }

  public onInput($event): void {
    this.filterAdmin();
  }

  private filterAdmin(): any {
    this.admins = this.af.list("/usuarios").map(usuario => usuario.filter(usuario => {
      if(usuario.tipo == "admin"){
        if(this.searchValue != "" && this.searchValue != undefined) {
          if(this.filterType == "Nombre"){
            return usuario.nombre.indexOf(this.searchValue) > 0;
          } else if(this.filterType == "Apellido"){
            return usuario.apellido.indexOf(this.searchValue) > 0;
          } else if(this.filterType == "Legajo"){
            return usuario.legajo.indexOf(this.searchValue) > 0;
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
        message: "Seguro que perder las modificaciones ?",
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
