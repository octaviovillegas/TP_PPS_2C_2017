import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
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
    eliminarAlumno(alumnoId: string){
      let prompt = this.alertCtrl.create({
        title: 'Desea eliminar al alumno?',
        buttons: [
          {
            text: 'Si',
            handler: data => { this.alumnos.remove(alumnoId); }
          },
          {
            text: 'No',
            handler: data => { }
          }
        ]
      });
      prompt.present();
      
    }

    //AGREGAR ALUMNO
    logForm(){
      let prompt = this.alertCtrl.create({ title: 'Alumno agregado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.alumnos.push(this.formAlta.value);
      this.formAlta.reset();
    }

    /*
            (ionInput)="onInput($event)"
        (ionCancel)="onCancel($event)">
    */
  
    /*addSong(){
      this.songs.push({
        title: "yo mama"
      });
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Enter a name for this new song you're so keen on adding",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.songs.push({
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }
  
    showOptions(songId, songTitle) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Delete Song',
            role: 'destructive',
            handler: () => {
              this.removeSong(songId);
            }
          },{
            text: 'Update title',
            handler: () => {
              this.updateSong(songId, songTitle);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

  
    updateSong(songId, songTitle){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Update the name for this song",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: songTitle
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.songs.update(songId, {
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }*/

}
