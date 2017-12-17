import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MateriasPage } from '../pages/materias/materias';
import { MateriaPrincipalPage } from '../pages/materia-principal/materia-principal';
import { PersonasPage } from '../pages/personas/personas';
import { PersonasabmPage } from '../pages/personasabm/personasabm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EncuestaPage} from '../pages/encuesta/encuesta';
import {GraficosPage} from '../pages/graficos/graficos';
import { AsistenciasPage } from '../pages/asistencias/asistencias';
import { PerfilPage } from "../pages/perfil/perfil";
import { ListadoAlumnosPage } from "../pages/listado-alumnos/listado-alumnos";
import { MostrarAsistenciasPage } from "../pages/mostrar-asistencias/mostrar-asistencias";
import { ProfesorAsistenciaPage } from "../pages/profesor-asistencia/profesor-asistencia";
import { EncuestasHomePage } from "../pages/encuestas-home/encuestas-home";
import { EnviarEncuestaPage } from "../pages/enviar-encuesta/enviar-encuesta";
import { EncuestaDetPage } from "../pages/encuesta-det/encuesta-det";
import { ConsultarBajaModifPageModule } from "../pages/consultar-baja-modif/consultar-baja-modif.module";
import { MenuPageModule } from "../pages/menu/menu.module";


////////SERVICIOS
import { ServMateriaProvider } from '../providers/serv-materia/serv-materia';
import { HttpModule } from '@angular/http';


//DB
import { AngularFireModule } from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database'
import { ServpersonaProvider } from '../providers/servpersona/servpersona';
import { AngularFireAuthModule }  from 'angularfire2/auth';

//PLUGINS
import { Camera } from '@ionic-native/camera';
import { PersonasServiceProvider } from '../providers/personas-service/personas-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { Chart } from "chart.js";
import { AlumnoServiceProvider } from '../providers/alumno-service/alumno-service';
import { AsistenciasProvider } from '../providers/asistencias/asistencias';
import { IonicStorageModule } from '@ionic/storage';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ProfesorServiceProvider } from '../providers/profesor-service/profesor-service';
import { EncuestasDataProvider } from '../providers/encuestas-data/encuestas-data';
import { DatePipe } from '@angular/common';

import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { FileChooser } from "@ionic-native/file-chooser";

import { ComponentsModule } from "../components/components.module";
import { LectorQrComponent } from "../components/lector-qr/lector-qr";

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

var firebaseAuth  = {
  apiKey: "AIzaSyBjrQu2x_3cZjv1Tdvw_TIYxBMAJ2VQU_M",
  authDomain: "tpfinal-8ff7a.firebaseapp.com",
  databaseURL: "https://tpfinal-8ff7a.firebaseio.com",
  projectId: "tpfinal-8ff7a",
  storageBucket: "tpfinal-8ff7a.appspot.com",
  messagingSenderId: "566483132157"
};


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID',
  },
  'push': {
    'sender_id': '566483132157',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    //MateriasPage,
    //MateriaPrincipalPage,
    //PersonasPage,
    //PersonasabmPage,
    //PerfilPage,
   // EncuestaPage,
   // GraficosPage,
    //AsistenciasPage,
   // MostrarAsistenciasPage,
    //ProfesorAsistenciaPage,
   // EnviarEncuestaPage,
    //EncuestaDetPage
    //EncuestasHomePage

   ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    IonicStorageModule.forRoot(),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     FormsModule,
     ReactiveFormsModule,
     MenuPageModule,
     ConsultarBajaModifPageModule,
     ComponentsModule,
     CloudModule.forRoot(cloudSettings)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    //MateriasPage,
    //MateriaPrincipalPage,
    //PersonasPage,
    //PersonasabmPage,
    //PerfilPage,
    //EncuestaPage,
    //GraficosPage,
    //AsistenciasPage,
    //MostrarAsistenciasPage,
    //ProfesorAsistenciaPage,
   // EnviarEncuestaPage,
    //EncuestaDetPage
    //EncuestasHomePage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServMateriaProvider,
    ServpersonaProvider,
    PersonasServiceProvider,
    LoginServiceProvider,
    AlumnoServiceProvider,
    AsistenciasProvider,
    BarcodeScanner,
    ProfesorServiceProvider,
    EncuestasDataProvider ,  DatePipe,
    File,
    FileChooser,
    FilePath

  ]
})
export class AppModule {}
