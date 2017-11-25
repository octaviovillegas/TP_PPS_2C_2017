import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DescargaService } from '../../services/descarga.service';


/**
 * Generated class for the ListadoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

listado : any;
tipo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private afDB : AngularFireDatabase, private servicio : DescargaService) {
    this.tipo = this.navParams.get("tipo");
    this.listado = Array<any>();
    this.afDB.list(this.tipo + '/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.listado[index] = snapshot.val();
      });
    });
    console.log(this.tipo)
    console.log(this.listado)  ;
  }


  Descargar()
  {
    this.servicio.download(this.listado);
  }

  ionViewDidLoad() {
  }

}
