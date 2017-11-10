import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController, Platform  } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {/* FirebaseListObservable*/ AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { personas } from './persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasPage } from '../personas/personas';
import { LoginPage } from '../login/login';
import{ServpersonaProvider} from '../../providers/servpersona/servpersona';//AGREGO SERVICIO
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-personasabm',
  templateUrl: 'personasabm.html',
})
export class PersonasabmPage {

  estado: string;
  persona: personas;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  email2: string = '';
  password: string = '';
  password2: string = '';
  rolasignado: number;
  dni: number;
  dni2: number;
  legajo: number;
  legajo2: number;
  id: number;
  img: string;
  modifica: boolean = true;
  formPersonaAM: FormGroup;
  desde:string;
  rol: string;
  //user: FirebaseListObservable<any>;
  user: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private PersonaService: ServpersonaProvider,
    private alertCtrl: AlertController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform,
    private camera: Camera, private storage: Storage,public database: AngularFireDatabase,private AngularAuth: AngularFireAuth) {

    this.user = this.database.list('/usuarios');
    //this.user = database.list('usuarios').valueChanges();

    this.storage.get('userInfo').then((val) => {
      this.rol = val.idRol;
    })
    this.estado = this.navParams.get("estado");
    this.desde = this.navParams.get("desde");
    console.info(this.desde);
    this.id = this.navParams.get("id");
    this.formPersonaAM = formBuilder.group({
      //VALIDACIONES
      nombre: [this.nombre, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      apellido: [this.apellido, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(30),Validators.minLength(6)])],
      password2: [this.password2, Validators.compose([Validators.required, Validators.maxLength(30),Validators.minLength(6)])],
      email: [this.email, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      rolasignado: [this.rolasignado, Validators.compose([Validators.required])],
      dni: [this.dni/*, Validators.compose([Validators.required])*/],
      legajo: [this.legajo/*, Validators.compose([Validators.required])*/]
    });
    this.img = '';
  }
  ionViewDidLoad() {
    if (this.estado != 'Alta') {
      this.modifica = true;
      this.PersonaService.TraerUsuarios(this.id).then(
        data => {
          if (typeof data[0] != 'undefined') {
            this.nombre = data[0].nombre;
            this.apellido = data[0].apellido;
            this.email = data[0].email;
            this.email2 = data[0].email;
            this.password = data[0].password;
            this.password2 = data[0].password;
            this.rolasignado = data[0].idRol;
            this.img = data[0].imagen;
            if (this.rolasignado == 3) {
              this.PersonaService.TraerUsuariosMasDatos(this.id).then(
                data => {
                  this.dni = data[0].dni;
                  this.dni2 = data[0].dni;
                  this.legajo = data[0].legajo;
                  this.legajo2 = data[0].legajo;
                })
                .catch(error => {
                  console.log('ERROR: ' + error);
                });
            }
          } else {
            this.ErrorAlGrabar();
          }
        })
        .catch(error => {
          console.log('ERROR: ' + error);
        });
    } else {
      if(this.desde=='login'){
        this.formPersonaAM.value.rolasignado="3";
        this.rolasignado=3;
      }
      this.modifica = false;
    }
    console.log('ionViewDidLoad PersonasamPage');
  }
  create() {
    this.modifica = false;
  }
  ErrorForm() {
    let alert = this.alertCtrl.create({
      title: 'Formulario Incompleto',
      subTitle: 'Por favor, complete todos los campos antes de grabar',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  ErrorAlGrabar() {
    let alert = this.alertCtrl.create({
      title: 'Error al grabar',
      subTitle: 'Verifique los datos ingresados o comuniquese con soporte',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  ErrorAlBorrar() {
    let alert = this.alertCtrl.create({
      title: 'Error al Borrar',
      subTitle: 'Comuniquese con soporte',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  ErrorEnUso(que, x) {
    let alert = this.alertCtrl.create({
      title: que + ' en uso',
      subTitle: 'El ' + que + ' ' + x + ' ya se encuentra en nuestra base de datos',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  toastOk(x) {
    let toast = this.toastCtrl.create({
      message: x + ' correctamente',
      position: 'middle',
      duration: 1000
    });
    toast.present();
  }
  segunTipo() {
    //por ahora nada
  }
  back() {
    if(this.desde!='login'){
      this.navCtrl.setRoot(PersonasPage);
    }else{
      this.navCtrl.setRoot(LoginPage);
    }
  }
  verificarMail() {
    var pasa = 1;
    if (this.estado != 'Alta') {
      if (this.email == this.email2) {
        pasa = 0;
      }
    }
    if (this.email != '') {
      if (pasa == 1) {
        this.PersonaService.VerificarEmail(this.email).then(
          data => {

            if (data['_body'] != "false") {
              this.ErrorEnUso('Email', this.email);
              this.email = '';
            }
          })
          .catch(error => {
            console.log('ERROR: ' + error);
          });
      }
    }
  }
  verificarDni() {
    var pasa = 1
    if (this.estado != 'Alta') {
      if (this.dni == this.dni2) {
        pasa = 0;
      }
    }
    // if(this.dni !=''){
    if (pasa == 1) {
      this.PersonaService.VerificarDni(this.dni).then(
        data => {
          if (data['_body'] != "false") {
            this.ErrorEnUso('DNI', this.dni);
            this.dni = 0;
          }
        })
        .catch(error => {
          console.log('ERROR: ' + error);
        });
      // }
    }
  }
  verificarLegajo() {
    //if(this.legajo!=''){
    var pasa = 1;
    if (this.estado != 'Alta') {
      if (this.legajo == this.legajo2) {
        pasa = 0;
      }
    }
    if (pasa == 1) {
      this.PersonaService.VerificarLegajo(this.legajo).then(
        data => {
          if (data['_body'] != "false") {
            this.ErrorEnUso('Legajo', this.legajo);
            this.legajo = 0;
          }
        })
        .catch(error => {
          console.log('ERROR: ' + error);
        });
      //}
    }
  }
  checkPass() {
    if (this.password2 != '') {
      if (this.password2 != this.password) {
        let alert = this.alertCtrl.create({
          title: 'ATENCIÓN',
          subTitle: 'Verifique que los password sean iguales',
          buttons: ['Aceptar']
        });
        alert.present();
        this.password2 = '';
      }
    }
  }
  guardar() {
        if(this.desde=='login'){
          this.formPersonaAM.value.rolasignado="3";
          this.rolasignado=3;
        }
    var array = [{
      "nombre": this.nombre, "apellido": this.apellido, "email": this.email, "password": this.password,
      "rol": this.rolasignado, "dni": this.dni, "legajo": this.legajo, "id": this.id, "img": this.img
    }];
    if (this.estado == 'Alta') {
      console.info(this.formPersonaAM.value.rolasignado)
      console.info(this.formPersonaAM)
      if (this.formPersonaAM.valid) {

        this.PersonaService.AgregarPersona(array).then(
          data => {
            if (data['_body'] == "true") {
              const result = this.AngularAuth.auth.createUserWithEmailAndPassword(this.email,this.password);

              if(this.desde!='login'){
                this.navCtrl.setRoot(PersonasPage);
              }else{
                this.navCtrl.setRoot(LoginPage);
              }
              this.toastOk('Grabado');
            } else {
              this.ErrorAlGrabar();
            }
          })
          .catch(error => {
            console.log('ERROR: ' + error);
          });
      } else {
        this.ErrorForm();
      }
    } else {
      this.PersonaService.ModificarPersona(array).then(
        data => {
          if (data['_body'] == "true") {
            this.navCtrl.setRoot(PersonasPage);
            this.toastOk('Modificado');
          } else {
            this.ErrorAlGrabar();
          }
        })
        .catch(error => {
          console.log('ERROR: ' + error);
        });
    }
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Desea eliminar el usuario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Si',
          handler: () => {
            this.PersonaService.BorrarPersona(this.id, this.rolasignado).then(
              data => {
                console.info(data)
                if (data['_body'] != "true") {
                  this.ErrorAlBorrar();
                } else {
                  this.navCtrl.setRoot(PersonasPage);
                  this.toastOk('Borrado');
                }
              })
              .catch(error => {
                console.log('ERROR: ' + error);
              });
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet() {
    if (this.rol != '3') {
      let actionSheet = this.actionSheetCtrl.create({
        title: '¿Qué desea realizar?',
        buttons: [
          {
            text: 'Eliminar',
            role: 'eliminar',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.delete();
            }
          }, {
            text: 'Modificar',
            icon: !this.platform.is('ios') ? 'md-create' : null,
            handler: () => {
              this.create();
            }
          }, {
            text: 'Cancelar',
            icon: !this.platform.is('ios') ? 'close' : null,
            role: 'cancelar',
            handler: () => {

            }
          }
        ]
      });
      actionSheet.present();
    }else{
      let toast = this.toastCtrl.create({
        message: ' Acceso denegado',
      position: 'middle',
      duration: 1000
    });
    toast.present();
    }
  }

  imagen() {
    if (!this.modifica) {


      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.img = imageData;
      }, (err) => {
        // Handle error
      });
    }
  }

}
