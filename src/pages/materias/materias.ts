import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController,AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//FORMBUILDER CREA FORMS, FORMGROUP DEFINE UN FORMULARIO Y VALIDATORS CONTIENE VALIDACIONES PREDISEÑADAS
import{ServMateriaProvider} from '../../providers/serv-materia/serv-materia';//AGREGO SERVICIO
import {MateriaPrincipalPage} from '../materia-principal/materia-principal';
/**
 * Generated class for the MateriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
  //providers :[ServMateriaProvider]
})
export class MateriasPage {

  formVisible = false;
  datosTraidos;
  datotraido;
  modifica: boolean = true;
  estado: string;
 nombreMateria: string = '';
 numDia: string = '';
 numAula: string = '';
 division: string = '';
 Cuatrimestre: string = '';
 button: string ='alta';
 idMateria: number;
 img:string;

  mensajeErrorFormAlta : string;

  formAgregar : FormGroup;
 constructor(public navCtrl: NavController, private alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,private ServMaterias:ServMateriaProvider, public platform: Platform,public navParams: NavParams,public formBuilder: FormBuilder)
 {
   this.estado = this.navParams.get("estado");
  this.idMateria = this.navParams.get("idMateria");
   this.TraerMaterias();
   //UTILIZACIÓN DE CONSTRUCTOR DE FORMULARIOS CON VALIDACIONES
      this.formAgregar = formBuilder.group({
          nombreMateria: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$'), Validators.required])],
          numDia: ['', Validators.compose([Validators.maxLength(1), Validators.pattern('^[0-9]*$'), Validators.required])],
          numAula: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('^[0-9]*$'), Validators.required])],
           division: ['', Validators.compose([Validators.maxLength(2) , Validators.required])],
          Cuatrimestre: ['', Validators.compose([Validators.maxLength(2), Validators.required])]
      });
 }

 back(){
  this.navCtrl.setRoot(MateriaPrincipalPage);
}

ionViewDidLoad() {
  if (this.estado != 'Alta') {
    this.modifica = true;
    console.log(this.idMateria);
   //  this.idMateria = this.navParams.get("idMateria");
    this.ServMaterias.ObtenerMateria(this.idMateria).then(
        data => {
          if (typeof data[0] != 'undefined')
          {
            this.nombreMateria = data[0].nombre;
            this.numDia = data[0].idDia;
            this.numAula = data[0].idAula;
            this.Cuatrimestre = data[0].cuatrimestre;
            this.division = data[0].division
          }
                })
                .catch(error => {
                  console.log('ERROR: ' + error);
                });
              }
              else
              {
     this.modifica = false;
   }

            }

            presentActionSheet() {
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
   })
   actionSheet.present();
 }
 create() {
   console.info('create')
   this.modifica = false;
 }

 delete() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Desea eliminar la Materia?',
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
            this.ServMaterias.BorrarMateria(this.idMateria)
              .then(data=>{console.log(data); this.navCtrl.setRoot(MateriaPrincipalPage); })
              .catch(error => {
                console.log('ERROR: ' + error);
              });
          }
        }
      ]
    });
    alert.present();
  }

guardar() {
  if(this.formAgregar.valid){
    //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
    var formData = new FormData();
          //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
    formData.append('idDia', this.formAgregar.value.numDia);
    formData.append('idAula', this.formAgregar.value.numAula);
    formData.append('nombre', this.formAgregar.value.nombreMateria);
    formData.append('cuatrimestre', this.formAgregar.value.Cuatrimestre);
    formData.append('division', this.formAgregar.value.division);

      if (this.estado == 'Alta') {
    this.ServMaterias.AgregarMateria(formData)
      .then((data) => {
        //SI HAY ALGUN MENSAJE DE ERROR, AVISAR E IMPEDIR
        if(data.json() != null){

          this.mensajeErrorFormAlta = data.json();
          //return;
          this.navCtrl.setRoot(MateriaPrincipalPage);
            }
            else
            {
               this.navCtrl.setRoot(MateriaPrincipalPage);
            }
          })
          .catch(error => {
           console.log('ERROR: ' + error);
         });
       } else {
         var array = [{
              "nombreMateria": this.nombreMateria, "numDia": this.numDia, "numAula": this.numAula, "division": this.division,"cuatrimestre":this.Cuatrimestre,
               "idMateria": this.idMateria
            }];
            this.ServMaterias.Modificar(array).then(
             data => {
               if (data['_body'] == "true") {
                 //this.navCtrl.setRoot(PersonasPage);
                 //this.toastOk('Modificado');
                 this.navCtrl.setRoot(MateriaPrincipalPage);
                 console.log("Modificado");
               } else {
                 console.log('ERROR:no modificado ');
               }
             })
             .catch(error => {
               console.log('ERROR: ' + error);
             });
       }
     }
   }





 TraerMaterias(){
   this.ServMaterias.TraerMaterias()
     .then(data => {
       this.datosTraidos = data;
     })
     .catch(error => {
       console.log(error);
     });
 }

 MostrarFormulario() {
   this.formVisible = !this.formVisible;
   //this.formAgregar.reset();
 }



 EliminarMateria(idMateria) {
 this.ServMaterias.BorrarMateria(idMateria)
   .then(() => this.TraerMaterias());
}
}
