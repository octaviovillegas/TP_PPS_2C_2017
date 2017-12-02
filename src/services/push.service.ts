import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastController } from 'ionic-angular';

import * as firebase from "firebase";
import "rxjs/add/operator/take";

@Injectable()
export class PushService{

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private toastService: ToastController) {
  }

}
