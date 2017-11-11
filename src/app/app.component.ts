import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbProvider } from '../providers/db/db';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BotonesPage } from '../pages/botones/botones';

import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  

  constructor(
    
    platform: Platform, 
   
    private auth: AuthProvider
  
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = BotonesPage;
        }
          else{
            this.rootPage = LoginPage;
          }
      });
    });
  }
}
