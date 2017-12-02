import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-abmAdministrativo',
  templateUrl: 'abmAdministrativo.html',
})
export class AbmAdministrativoPage {
  
  private tab;
  private admins: FirebaseListObservable<any[]>;
  //Lista
  private searchValue: string;
  private filterType: string;
  private modifId: string;
  //Alta
  private formAlta: FormGroup;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, 
    private authAf: AngularFireAuth,
    private formBuilder: FormBuilder) {
      this.tab = "lista";
      //Lista
      this.filterType = "Apellido";
      this.modifId = "";
      //Alta
      this.filterAdmin();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
      });
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
      let prompt = this.alertCtrl.create({ title: 'Administrativo modificado', buttons: [{ text: 'Ok',}] });
      prompt.present();
    }
    this.modifId = "";
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
