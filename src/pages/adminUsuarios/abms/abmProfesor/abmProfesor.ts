import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-abmProfesor',
  templateUrl: 'abmProfesor.html',
})
export class AbmProfesorPage {
  
  private tab;
  private profesores: FirebaseListObservable<any[]>;
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
      this.filterProfesor();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
        materia: ['', Validators.compose([Validators.required])],
        curso: ['', Validators.compose([Validators.required])]
      });
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
       this.tab = "agregar";
  }

  //AGREGAR PROFESOR
  public agregarProfesor(): void{
    if(this.modifId == "") {
      let prompt = this.alertCtrl.create({ title: 'Profesor agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      let data: {} = this.formAlta.value;
      data["tipo"] = "profe";
      this.af.list("/usuarios").push(data);
    } else {
      this.profesores.update(this.modifId, {
         nombre: this.formAlta.controls['nombre'].value,
         apellido: this.formAlta.controls['apellido'].value,
         email: this.formAlta.controls['email'].value,
         pass: this.formAlta.controls['pass'].value,
         materia: this.formAlta.controls['materia'].value,
         curso: this.formAlta.controls['curso'].value
       });
       this.modifId = "";
       let prompt = this.alertCtrl.create({ title: 'Profesor modificado', buttons: [{ text: 'Ok',}] });
       prompt.present();
    }
    this.formAlta.reset();
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