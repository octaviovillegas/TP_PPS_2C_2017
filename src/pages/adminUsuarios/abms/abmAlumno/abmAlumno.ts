import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import { FileService } from '../../../../services/file.service';
import swal from 'sweetalert2';

export class Alumno{
  constructor(public legajo: number,
    public apellido: string,
    public nombre: string,
    public turno: string){
    }
}

@IonicPage()
@Component({
  selector: 'page-abmAlumno',
  templateUrl: 'abmAlumno.html',
})
export class AbmAlumnoPage {
  
  private tab;
  private alumnos: FirebaseListObservable<any[]>;
  //Materias
  private materiasMartes: FirebaseListObservable<any[]>;
  private materiasViernes: FirebaseListObservable<any[]>;
  private materiasSabado: FirebaseListObservable<any[]>;
  private userImg = "assets/usrImg.png";
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

  public disablesFields: boolean = false;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, 
    private authAf: AngularFireAuth,
    private formBuilder: FormBuilder,
    private camera: Camera) {
      this.tab = "agregar";
      //Lista
      this.filterType = "Apellido";
      this.modifId = "";
      this.disablesFields = false;
      this.modifHasImg = "";
      this.imgUrl = "NADA";
      this.imgName = "";
      this.imgFile = "";
      //Alta
      this.filterAlumno();
      this.formAlta = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        legajo: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[-+]?[0-9]*\.?[0-9]*")])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
        turno: ['', Validators.compose([Validators.required])],
        matMar: ['', Validators.compose([Validators.required])],
        matVier: ['', Validators.compose([Validators.required])],
        matSab: ['', Validators.compose([Validators.required])]
      });
      this.formAlta.controls['turno'].setValue("Man");
      this.loadImage();
      this.loadMaterias("Man");
  }

  public loadImage(){
    setTimeout(() => {
      if(this.imgName != "") {
        storage().ref(this.imgName).getDownloadURL().then(url => {
          if(this.imgName != ""){
            this.imgUrl = url;
          }
        }).catch(err => {
          if(this.imgName != "temp"){
            this.imgName = "";
          } else {
            this.imgUrl = "assets/spinner.gif";
          }
        });
      }
      this.loadImage();
    }, 300);
  }

  //LISTA DE ALUMNOS
  public eliminarAlumno(alumnoId: string, apellido: string): void {
    let prompt = this.alertCtrl.create({
      title: 'Confirmar',
      message: "Seguro que queres eliminar al alumno " + apellido + "?",
      buttons: [{
        text: 'Si',
        role: 'destructive',
        handler: data => { 
          this.alumnos.remove(alumnoId);
        }
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
    this.loadMaterias(alumno.turno);
    this.formAlta.controls['nombre'].setValue(alumno.nombre);
    this.formAlta.controls['apellido'].setValue(alumno.apellido);
    this.formAlta.controls['legajo'].setValue(alumno.legajo);
    this.formAlta.controls['turno'].setValue(alumno.turno);
    this.formAlta.controls['matMar'].setValue(alumno.matMar);
    this.formAlta.controls['matVier'].setValue(alumno.matVier);
    this.formAlta.controls['matSab'].setValue(alumno.matSab);
    this.modifId = alumno.$key;
    this.imgName = alumno.email;
    if(alumno.tieneFoto == "1"){
      this.imgUrl = "assets/spinner.gif";
    }
    this.modifHasImg = alumno.tieneFoto;
    this.tab = "agregar";
    if(alumno.email == "SIN DEFINIR" && alumno.pass == "SIN DEFINIR") {
      this.disablesFields = true;
      this.formAlta.controls['email'].setValue("");
      this.formAlta.controls['pass'].setValue("");
    } else {
      this.formAlta.controls['email'].setValue(alumno.email);
      this.formAlta.controls['pass'].setValue(alumno.pass);
    }
  }

  public loadMaterias(turno: any): void {
    this.materiasMartes = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Martes"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;

    this.materiasViernes = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Viernes"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;

    this.materiasSabado = this.af.list("/materias").map(materia => materia.filter(materia => {
      if(materia.turno == turno && materia.dia == "Sabado"){
        return true;
      }
    })) as FirebaseListObservable<any[]>;
  }

  //AGREGAR ALUMNO
  public agregarAlumno(): void{
    if(this.modifId == "") {
      let data: {} = this.formAlta.value;
      this.authAf.auth.createUserWithEmailAndPassword(data["email"], data["pass"]).then(r => {
        let prompt = this.alertCtrl.create({ title: 'Alumno agregado', buttons: [{ text: 'Ok',}] });
        prompt.present();
        data["tipo"] = "alumno";
        data["pres_Martes"] = "0";
        data["pres_Viernes"] = "0";
        data["pres_Sabado"] = "0";
        data["tieneFoto"] = this.imgName == "" ? "0" : "1";
        if(data["tieneFoto"] == "1") {
          this.subirFoto(this.formAlta.value["email"]);
        }
        this.imgFile = "";
        this.imgName = "";
        this.imgUrl = "NADA";
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
      this.alumnos.update(this.modifId, {
        nombre: this.formAlta.controls['nombre'].value,
        apellido: this.formAlta.controls['apellido'].value,
        legajo: this.formAlta.controls['legajo'].value,
        email: this.formAlta.controls['email'].value,
        pass: this.formAlta.controls['pass'].value,
        matMar: this.formAlta.controls['matMar'].value,
        matVier: this.formAlta.controls['matVier'].value,
        matSab: this.formAlta.controls['matSab'].value
      });
      if(this.modifHasImg == "1" && this.imgFile != "") {
        this.subirFoto(this.formAlta.controls['email'].value);
      }
      let prompt = this.alertCtrl.create({ title: 'Alumno modificado', buttons: [{ text: 'Ok',}] });
      prompt.present();
      this.formAlta.reset();
      this.formAlta.controls['turno'].setValue("Man");
      this.imgFile = "";
      this.imgName = "";
      this.imgUrl = "NADA";
    }
    this.modifHasImg = "";
    this.modifId = "";
    this.disablesFields = false;
  }

  public takePicture(): void {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
      this.imgUrl = "assets/spinner.gif";
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
            this.disablesFields = false;
            this.formAlta.reset();
            this.imgUrl = "NADA";
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

  public leerArchivo(event: any): void {
    let file = event.target.files[0];
    let extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    let reader = new FileReader();
    if(extension == "csv") {
      reader.onload = () => {
        this.addAlumnosList(FileService.CsvToAlumnosList(reader.result));
      }
      reader.readAsText(file);
    } else if (extension == "xlsx") {
      reader.onload = (e: any) => {
        this.addAlumnosList(FileService.ExelToAlumnosList(e.target.result));
      };
      reader.readAsBinaryString(file);
    }
  }

  private addAlumnosList(alumnos: Array<Alumno>) {
    alumnos.forEach(alumno => { 
      let data = {};
      data["nombre"] = alumno.nombre;
      data["apellido"] = alumno.apellido;
      data["legajo"] = alumno.legajo;
      data["turno"] = alumno.turno;
      data["matMar"] = "Ninguna";
      data["matVier"] = "Ninguna";
      data["matSab"] = "Ninguna";
      data["email"] = "";
      data["pass"] = "";
      data["tipo"] = "alumno";
      data["pres_Martes"] = "0";
      data["pres_Viernes"] = "0";
      data["pres_Sabado"] = "0";
      data["tieneFoto"] = "0";
      //this.af.list("/usuarios").push(data);
    });
    swal({
      title: 'Éxito',
      text: 'Se agregaron ' + alumnos.length + ' alumnos con exito' ,
      type: 'success',
      timer: 5000
    });
  }

}
