import { Component } from '@angular/core';

//agrege para el csv
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import * as papa from 'papaparse';

//$IMPORTSTATEMENT
/**
 * Generated class for the ListadoAlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//$IONICPAGE
@Component({
  selector: 'page-listado-alumnos',
  templateUrl: 'listado-alumnos.html',
})
export class ListadoAlumnosPage {

  csvData: any[] = [];
  headerRow: any[] = [];
  mostrarBotones:boolean;

  constructor(public navCtrl: NavController, private http: Http) {
    this.mostrarBotones=true;
    
  }

 /* private readCsvData() {
    this.http.get('assets/PPS -4A-2c2017.csv')
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }*/
 abrir4A(){
  this.http.get('assets/PPS-4A-2c2017.csv')
  .subscribe(
  data => this.extractData(data),
  err => this.handleError(err)
  );
  this.mostrarBotones=false;
 }
 abrir4B(){
  this.http.get('assets/PPS-4B-2c2017.csv')
  .subscribe(
  data => this.extractData(data),
  err => this.handleError(err)
  );
  this.mostrarBotones=false;
   }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
 
   // this.headerRow = parsedData[0];
 
    //sparsedData.splice(0, 1);
    this.csvData = parsedData;
  }
 
  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
 
    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 
  private handleError(err) {
    console.log('something went wrong: ', err);
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }
 
}