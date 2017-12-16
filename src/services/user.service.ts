import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';

import "rxjs/add/operator/take";

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  public getCurrentUserType(): any {
      let retorno;
      this.db.list('/usuarios').subscribe((users) => {
          users.forEach((user) => {
              if (this.afAuth.auth.currentUser.email == user['email']) {
                  retorno = user['tipo'];
              }
          });
    });
    return retorno;
  }
}
