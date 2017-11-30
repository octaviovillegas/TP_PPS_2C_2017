import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Usuario } from "../../clases/usuario";
import { ListadoAlumnosPage } from "../../pages/listado-alumnos/listado-alumnos";
import { AlumnoServiceProvider } from "../../providers/alumno-service/alumno-service";
import { EncuestasHomePage } from "../../pages/encuestas-home/encuestas-home";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileChooser } from "@ionic-native/file-chooser";
//import { FileOpener } from "@ionic-native/file-opener";
import { Alumno } from "../../clases/alumno";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private datos:{};




  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,

              public file:File, public filePath:FilePath, public fileChooser:FileChooser,
             /* public fileOpener:FileOpener,*/ private alumnoDB:AlumnoServiceProvider

  ) { }

  ionViewDidLoad() {

    this.datos = JSON.parse(this.navParams.data);
    console.log(this.navParams.data);

  }


  private irAPerfil():void{

    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();

    if (this.datos["loginSocial"]==true) {
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"], "nombre":this.datos["nombre"], "foto":this.datos["foto"], "isLoginSocial":this.datos["loginSocial"]});
    }else{
      this.navCtrl.push("PerfilPage", {"correo" : this.datos["correo"], "perfil":this.datos["perfil"], "nombre":this.datos["nombre"], "foto":this.datos["foto"], "isLoginSocial":this.datos["loginSocial"]});
    }

  }

  private irAFormAlumnos(){
    /*const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();*/

    this.navCtrl.push("AlumnosFormPage");
  }


  private irAFormProfesores(){

    this.navCtrl.push("ProfesoresFormPage");
  }

  private irABMProfesores(){

    this.navCtrl.push("ListaProfesoresPage");
  }

  private irAListaAlumnos(){
   /* const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();
    */
    this.navCtrl.push('ListadoAlumnosPage');
  }


  private irAFormAlumnosQrPage(){
    /*
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();*/

    console.log(this.datos["correo"]);
    console.log(this.datos["perfil"]);
    this.navCtrl.push('FormAlumnosQrPage', {'correo':this.datos["correo"], 'perfil':this.datos["perfil"]});
  }


  irABMPEncuestas()
  {
    const loading = this.loadingCtrl.create({
      content: 'Ingresando. Espere...',
      dismissOnPageChange: true,
      spinner:"bubbles"
    });
    loading.present();
    this.navCtrl.push('EncuestasHomePage');

  }

  private cargarArchivos(){

    this.fileChooser.open().then(path=>{
      this.filePath.resolveNativePath(path).then(nativePath=>{

        this.file.readAsText(this.extraerPath(nativePath), this.extraerNombreArchivo(nativePath)).then(texto=>{
          let msg = this.alertCtrl.create({
            title:'texto',
            message:texto
          });
          msg.present();
          this.procesarContenidoCSV(texto);

        });

      });

    });
  }

  private procesarContenidoCSV(_texto:string){
      let campoLegajo:string='';
      let campoNombre:string='';
      let campoHorario:string='';

      let arrayListado:Array<string> = new Array<string>();

      let cont:number = 0;

        for (var i = 0; i < _texto.length; i++) {

          if ((_texto[i]==';') || (_texto[i]=='\n' && cont==2)) {
            cont += 1;
          }

          if (_texto[i]!=';') {
            switch (cont) {
              case 0:
                      campoLegajo += _texto[i];
              break;
              case 1:
                      campoNombre += _texto[i];
              break;
              case 2:
                      campoHorario += _texto[i];

              break;
              case 3:
                  let alumno:Alumno = new Alumno();
                  alumno.setNombre(campoNombre);
                  alumno.setLegajo(campoLegajo);
                  alumno.setHorario(campoHorario);
                  alumno.setPerfil('alumno');
                  this.alumnoDB.guardarAlumno(alumno);

                  cont = 0;
                  campoLegajo = '';
                  campoNombre='';
                  campoHorario='';
              break;
            }//fin switch
          }//fin if
        }//fin for
  }

  private extraerPath(_path:string):string{
    let path:string='';
    let barraIDX:number = _path.lastIndexOf('/');
    path = _path.substring(0,barraIDX);
    path += '/';

    return path;
  }

  private extraerNombreArchivo(_path:string):string{
    let nombre:string='';
    let barraIDX:number = _path.lastIndexOf('/');
    nombre= _path.substring(barraIDX + 1);

    return nombre;
  }


}
