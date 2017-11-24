import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-abmAlumno',
  templateUrl: 'abmAlumno.html',
})
export class AbmAlumnoPage {
  
  private tab;
  private alumnos: Observable<any>;
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
      this.tab = "agregar";
      //Lista
      this.filterType = "Apellido";
      this.modifId = "";
      //Alta
      this.filterAlumno();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
        Programacion: ['', Validators.compose([Validators.required])],
        Laboratorio: ['', Validators.compose([Validators.required])],
        Estadistica: ['', Validators.compose([Validators.required])]
      });
  }

  //LISTA DE ALUMNOS
  public eliminarAlumno(alumnoId: string, apellido: string): void {
    let prompt = this.alertCtrl.create({
      title: 'Confirmar',
      message: "Seguro que queres eliminar al alumno " + apellido + "?",
      buttons: [{
        text: 'Si',
        role: 'destructive',
        handler: data => { this.alumnos.remove(alumnoId); }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: data => { }
      }]
    });
    prompt.present();
  }

  public modificarAlumno(alumno: any): void {
       this.formAlta.controls['nombre'].setValue(alumno.nombre);
       this.formAlta.controls['apellido'].setValue(alumno.apellido);
       this.formAlta.controls['legajo'].setValue(alumno.legajo);
       this.formAlta.controls['Programacion'].setValue(alumno.Programacion);
       this.formAlta.controls['Laboratorio'].setValue(alumno.Laboratorio);
       this.formAlta.controls['Estadistica'].setValue(alumno.Estadistica);
       this.formAlta.controls['email'].setValue(alumno.email);
       this.formAlta.controls['pass'].setValue(alumno.pass);
       this.modifId = alumno.$key;
       this.tab = "lista";
  }

  //AGREGAR ALUMNO
  public agregarAlumno(): void{
    if(this.modifId == "") {
      let prompt = this.alertCtrl.create({ title: 'Alumno agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      let data: {} = this.formAlta.value;
      data["tipo"] = "alumno";
      data["presente"] = "0";
      this.af.list("/usuarios").push(data);
    } else {
      this.alumnos.update(this.modifId, {
        nombre: this.formAlta.controls['nombre'].value,
        apellido: this.formAlta.controls['apellido'].value,
        legajo: this.formAlta.controls['legajo'].value,
        email: this.formAlta.controls['email'].value,
        pass: this.formAlta.controls['pass'].value,
        Programacion: this.formAlta.controls['Programacion'].value,
        Laboratorio: this.formAlta.controls['Laboratorio'].value,
        Estadistica: this.formAlta.controls['Estadistica'].value
      });
      this.modifId = "";
      let prompt = this.alertCtrl.create({ title: 'Alumno modificado', buttons: [{ text: 'Ok',}] });
      prompt.present();
    }
    this.formAlta.reset();
  }

  public onInput($event): void {
    this.filterAlumno();
  }

  private filterAlumno(): any {
    this.alumnos = this.af.list("/usuarios").map(usuario => usuario.filter(usuario => {
      if(usuario.tipo == "alumno"){
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