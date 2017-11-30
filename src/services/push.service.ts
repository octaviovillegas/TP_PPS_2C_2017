import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from "firebase";
import "rxjs/add/operator/take";

@Injectable()
export class PushService{

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
        if (!user) return;
        const data = { [user.email]: token }
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Mensaje recibido:", payload);
      this.currentMessage.next(payload);
    });
  }

  sendMessageToAlumnos(mensaje: string, from: string) {

  }

  sendMessageToAll(mensaje: string, from: string) {

  }
  sendMessageToProfesorYAdministrativo(mensaje: string, from: string) {

  }
}
