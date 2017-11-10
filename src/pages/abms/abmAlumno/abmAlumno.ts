import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-abmAlumno',
  templateUrl: 'abmAlumno.html',
})
export class AbmAlumnoPage {
  
  private alumnos: FirebaseListObservable<any>;
  private tab;
  public formAlta = FormGroup;

  
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public af: AngularFireDatabase,
      public actionSheetCtrl: ActionSheetController, private formBuilder: FormBuilder) {
      this.tab = "lista";
      this.alumnos = af.list('/alumnos');
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        anio: ['', Validators.compose([Validators.required])],
        curso: ['', Validators.compose([Validators.required])],
      });
    }

    //LISTA DE ALUMNOS
eliminarAlumno(alumnoId: string, apellido: string): void {
      let prompt = this.alertCtrl.create({
        title: 'Confirmar',
        message: "Seguro que queres eliminar al alumno " + apellido + "?",
        buttons: [
          {
            text: 'Si',
            role: 'destructive',
            handler: data => { this.alumnos.remove(alumnoId); }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: data => { }
          }
        ]
      });
      prompt.present();
    }

    modificarAlumno(alumnoId: string, apellido: string): void {
      
    }

    //AGREGAR ALUMNO
    public agregarAlumno(): void{
      let prompt = this.alertCtrl.create({ title: 'Alumno agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.alumnos.push(this.formAlta.value);
      this.formAlta.reset();
    }

    /*
        (ionInput)="onInput($event)"
        (ionCancel)="onCancel($event)">
    */
  
}
