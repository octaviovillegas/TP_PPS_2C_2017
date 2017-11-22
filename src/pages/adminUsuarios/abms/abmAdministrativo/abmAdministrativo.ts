import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-abmAdministrativo',
  templateUrl: 'abmAdministrativo.html',
})
export class AbmAdministrativoPage {
  
  private tab;
  private admins: Observable<any>;
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
        anio: ['', Validators.compose([Validators.required])],
        curso: ['', Validators.compose([Validators.required])],
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
       this.formAlta.controls['anio'].setValue(admin.anio);
       this.formAlta.controls['curso'].setValue(admin.curso);
       this.modifId = admin.$key;
       this.tab = "agregar";
  }

  //AGREGAR ADMINISTRATIVO
  public agregarAdmin(): void{
    if(this.modifId == "") {
      let prompt = this.alertCtrl.create({ title: 'Admin agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.af.list('/admins').push(this.formAlta.value);
    } else {
      this.admins.update(this.modifId, {
        nombre: this.formAlta.controls['nombre'].value,
        apellido: this.formAlta.controls['apellido'].value,
        legajo: this.formAlta.controls['legajo'].value,
        anio: this.formAlta.controls['anio'].value,
        curso: this.formAlta.controls['curso'].value
      });
      this.modifId = "";
      let prompt = this.alertCtrl.create({ title: 'Administrativo modificado', buttons: [{ text: 'Ok',}] });
      prompt.present();
    }
    this.formAlta.reset();
  }

  public onInput($event): void {
    this.filterAdmin();
  }

  private filterAdmin(): any {
    this.admins = this.af.list('/admins').map(admin => admin.filter(admin => {
      if(this.searchValue != "" && this.searchValue != undefined) {
        console.log(this.filterType);
        if(this.filterType == "Nombre"){
          return admin.nombre.indexOf(this.searchValue) > 0;
        } else if(this.filterType == "Apellido"){
          return admin.apellido.indexOf(this.searchValue) > 0;
        } else if(this.filterType == "Legajo"){
          return admin.legajo.indexOf(this.searchValue) > 0;
        }
      }
      return true;
    }));
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
            this.tab = "agregar"
          }
        }]
      });
      prompt.present();
    }
  }

}
