import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BotonesPage } from '../pages/botones/botones';
import { HomePage } from '../pages/home/home';
import { Home2Page } from '../pages/home2/home2';
import { LoginPage } from '../pages/login/login';
import { LectorQrPage } from '../pages/lector-qr/lector-qr';
import { TomarListaPage } from '../pages/tomar-lista/tomar-lista';
import { CrearEncuestaPage } from '../pages/crear-encuesta/crear-encuesta';
//import { LectorQrPage } from './lector-qr';
import { AuthProvider } from '../providers/auth/auth';
import { RealizarEncuestaPage } from '../pages/realizar-encuesta/realizar-encuesta';
import { DatePipe } from '@angular/common';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';


import { PictureUtils } from '../services/pictureUtils.service';
import { Encuesta } from '../services/encuesta.service';
import { PictureUtils2 } from '../services/pictureUtils2.service';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

//csv
import { ListadoAlumnosPage } from '../pages/listado-alumnos/listado-alumnos';


// Must export the config
export const firebaseConfig = {
  
/*  apiKey: "AIzaSyCCPk5uHy27KctB2dhPH7k73ri5nV9E0Cs",
  authDomain: "fotos-b4b3b.firebaseapp.com",
  databaseURL: "https://fotos-b4b3b.firebaseio.com",
  projectId: "fotos-b4b3b",
  storageBucket: "fotos-b4b3b.appspot.com",
  messagingSenderId: "985180049979"
  apiKey: "AIzaSyCBEBdO_UKIxYs65nUg_jkgV0npAabjdbQ",
  authDomain: "pp2017-5a648.firebaseapp.com",
  databaseURL: "https://pp2017-5a648.firebaseio.com",
  projectId: "pp2017-5a648",
  storageBucket: "",
  messagingSenderId: "332599085925"*/

  
    apiKey: "AIzaSyAI6GG0LLsvrzPlu871VyAdDgbglonPelM",
    authDomain: "pps2017-75f93.firebaseapp.com",
    databaseURL: "https://pps2017-75f93.firebaseio.com",
    projectId: "pps2017-75f93",
    storageBucket: "pps2017-75f93.appspot.com",
    messagingSenderId: "96386419757"
  
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Home2Page,
    BotonesPage,
    LoginPage,
    LectorQrPage,
    TomarListaPage,
    MiPerfilPage,
    CrearEncuestaPage,
    RealizarEncuestaPage,
    ListadoAlumnosPage, 
    RealizarEncuestaPage,
    EstadisticasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage, 
    
    LectorQrPage,
    Home2Page,
    BotonesPage,
    TomarListaPage,
    MiPerfilPage,
    CrearEncuestaPage,
    RealizarEncuestaPage,
    ListadoAlumnosPage,
    RealizarEncuestaPage,
    EstadisticasPage
    
  ],
  providers: [
    PictureUtils,
    PictureUtils2,
    BarcodeScanner,
    Encuesta,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },    
    AuthProvider,
    DatePipe
    
  ]
})
export class AppModule { }
