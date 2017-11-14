import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
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
  private profesores: Observable<any>;
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
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        anio: ['', Validators.compose([Validators.required])],
        curso: ['', Validators.compose([Validators.required])],
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
        // handler: data => { this.porofesores.remove(profesorId); }
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
       this.formAlta.controls['legajo'].setValue(profesor.legajo);
       this.formAlta.controls['anio'].setValue(profesor.anio);
       this.formAlta.controls['curso'].setValue(profesor.curso);
       this.modifId = profesor.$key;
       this.tab = "agregar";
  }

  //AGREGAR PROFESOR
  public agregarProfesor(): void{
    if(this.modifId == "") {
      let prompt = this.alertCtrl.create({ title: 'Profesor agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.af.list('/profesores').push(this.formAlta.value);
    } else {
      // this.profesores.update(this.modifId, {
      //   nombre: this.formAlta.controls['nombre'].value,
      //   apellido: this.formAlta.controls['apellido'].value,
      //   legajo: this.formAlta.controls['legajo'].value,
      //   anio: this.formAlta.controls['anio'].value,
      //   curso: this.formAlta.controls['curso'].value
      // });
      let prompt = this.alertCtrl.create({ title: 'Profesor modificado', buttons: [{ text: 'Ok',}] });
    }
    this.formAlta.reset();
  }

  public onInput($event): void {
    this.filterProfesor();
  }

  private filterProfesor(): any {
    this.profesores = this.af.list('/profesores').valueChanges().map(profesor => profesor.filter((profesor: any) => {
      if(this.searchValue != "" && this.searchValue != undefined) {
        if(this.filterType == "Nombre"){
          return profesor.nombre.indexOf(this.searchValue) > 0;
        } else if(this.filterType == "Apellido"){
          return profesor.apellido.indexOf(this.searchValue) > 0;
        } else if(this.filterType == "Legajo"){
          return profesor.legajo.indexOf(this.searchValue) > 0;
        }
      }
      return true;
    }));
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