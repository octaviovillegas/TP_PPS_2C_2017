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


////////SERVICIOS
import { ServMateriaProvider } from '../providers/serv-materia/serv-materia';
import { HttpModule } from '@angular/http';


//DB
import { AngularFireModule } from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database'

var firebaseAuth  = {
  apiKey: "AIzaSyBjrQu2x_3cZjv1Tdvw_TIYxBMAJ2VQU_M",
  authDomain: "tpfinal-8ff7a.firebaseapp.com",
  databaseURL: "https://tpfinal-8ff7a.firebaseio.com",
  projectId: "tpfinal-8ff7a",
  storageBucket: "tpfinal-8ff7a.appspot.com",
  messagingSenderId: "566483132157"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MateriasPage,
    MateriaPrincipalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
     AngularFireDatabaseModule,
     FormsModule,
     ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MateriasPage,
    MateriaPrincipalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServMateriaProvider
  ]
})
export class AppModule {}
