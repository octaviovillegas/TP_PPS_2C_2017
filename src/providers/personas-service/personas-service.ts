import { Injectable } from '@angular/core';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from '../../clases/usuario';


@Injectable()
export class PersonasServiceProvider {

  private usuarios:FirebaseListObservable<Usuario[]>;

  constructor(private db:AngularFireDatabase

  ) {}



  getUsuariosLista(){
    this.usuarios = this.db.list('/usuarios') as FirebaseListObservable<Usuario[]>;
    return this.usuarios;
  }





}
