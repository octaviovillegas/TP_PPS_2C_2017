import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';


import * as firebase from "firebase";
import "rxjs/add/operator/take";

@Injectable()
export class PushService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private toastService: ToastController, private fcm: FCM) {
  }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      const data = { [user.email.replace(".", "")]: token }
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission(platform: any) {
    if (platform.is('cordova')) {
      this.fcm.getToken()
        .then(token => {
          console.log(token);
          this.updateToken(token);
        })
        .catch((err) => {
          console.log('Error al generar token de android.', err);
        });
    } else {
      this.messaging.requestPermission()
        .then(() => {
          console.log('Notification permission granted.');
          return this.messaging.getToken();
        });
    }
  }

  receiveMessage(platform: any) {
    if (platform.is('cordova')) {
      this.fcm.onNotification().subscribe((notification) => {
        console.log("Mensaje recibido:", notification);
        this.toastService.create({
          message: "Mensaje de " + notification.title + ":" + notification.body,
          duration: 2500,
          position: 'top',
          showCloseButton: true,
          closeButtonText: "Ok"
        }).present();
      });
    } else {
      this.messaging.onMessage((payload) => {
        console.log("Mensaje recibido:", payload);
        this.toastService.create({
          message: "Mensaje de " + payload.notification.title + ":" + payload.notification.body,
          duration: 2500,
          position: 'top',
          showCloseButton: true,
          closeButtonText: "Ok"
        }).present();
        this.currentMessage.next(payload);
      });
    }
  }

  sendMessageToAlumnos(mensaje: string, fromParam: string) {
    this.db.object('mensajes/alumnos/').update({ from: mensaje });
  }

  sendMessageToAll(mensaje: string, fromParam: string) {
    var messageID;
    var tokens = this.db.list('fcmTokens/');
    messageID = fromParam + mensaje;
    tokens.take(1).forEach(t => {
      t.forEach(t2 => {
        console.log(t2);
        this.db.object('mensajesATodos/' + messageID.replace(".", "")).update({
          message: mensaje,
          from: fromParam,
          title: "Aviso",
          receptor: t2.$key
        });
      })
    });
  }

  sendMessageToSpecific(mensaje: string, fromParam: string) {
    var messageID;
    var tokens = this.db.list('fcmTokens/');
    messageID = fromParam + mensaje;
    tokens.take(1).forEach(t => {
      t.forEach(t2 => {
        this.db.object('mensajesAUno/' + messageID.replace(".", "")).update({
          message: mensaje,
          from: fromParam,
          title: "Aviso",
          receptor: t2.$key
        });
      })
    });
  }

  public avisarDeFaltas(alumnoEmail: string) {
    var messageID;
    var tokens = this.db.list('fcmTokens/');
    messageID = alumnoEmail + "AvisoFalta";
    tokens.take(1).forEach(t => {
      t.forEach(t2 => {
        this.db.object('avisoFaltas/' + messageID.replace(".", "")).update({
          message: "El alumno " + alumnoEmail + "se excedió con las faltas.",
          from: "Sistema",
          title: "Aviso",
          receptor: alumnoEmail
        });
      })
    });
  }
}
