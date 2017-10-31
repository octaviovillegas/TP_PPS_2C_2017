import { Injectable } from '@angular/core';
import { Http ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServMateriaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServMateriaProvider {
   //route : string ="http://localhost/TPsegParcialPPS2017/API/index.php/";
   route : string = "http://nggroup.esy.es/api/index.php/";
   
   data:Array<Object>;
     constructor(public http: Http) {
       console.log('Hello ServMaterias Provider');
     }
   //TRAER TODAS LAS MATERIAS
       load() {
     if (this.data) {
       // already loaded data
       return Promise.resolve(this.data);
   
     }
   
     // don't have the data yet
     return new Promise(resolve => {
       // We're using Angular HTTP provider to request the data,
       // then on the response, it'll map the JSON data to a parsed JS object.
       // Next, we process the data and resolve the promise with the new data.
       this.http.get('http://localhost/TPsegParcialPPS2017/API/index.php/persona/obtenerTodas')
         .map(res => res.json())
         .subscribe(data => {
           this.data =data.Persona;
   
           // we've got back the raw data, now generate the core schedule data
           // and save the data for later reference
           this.data = data;
           resolve(this.data);});
     });
   }
   AgregarMateria(formData){
     return this.http.post(this.route + "materia/agregar", formData).toPromise();
   }
   
   TraerMaterias(){
       return this.http.get(this.route + "materia/obtenerTodas").toPromise().then(data => data.json());
     }
     BorrarMateria(idMateria){
      //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP
      let requestOptions = new RequestOptions({
        body : {"idMateria" : idMateria}
      });
      return this.http.delete(this.route + "materia/borrar", requestOptions).toPromise();
    }
   
    ObtenerMateria(idMateria){
   
      var data = {"idMateria":idMateria}
       return this.http.post(this.route + "materia/ObtenerMateria", data).toPromise().then(data => data.json());
      }
   
      Modificar(formData){
        console.log(formData[0].numDia);
        console.log(formData[0].numAula);
        console.log(formData[0].cuatrimestre);
        console.log(formData[0].nombreMateria);
        console.log(formData[0].division);
        console.log(formData[0].idMateria);
   
   
       var body = {"idDia" : formData[0].numDia,
                   "idAula" : formData[0].numAula,
                   "nombre" : formData[0].nombreMateria,
                   "cuatrimestre" : formData[0].cuatrimestre,
                   "division" : formData[0].division,
                   "idMateria" : formData[0].idMateria,
                   }
     return this.http.post(this.route + "materia/modificar",body).toPromise();
   }
   
     /*ModificarMateria(formData){
        return this.http.post(this.route + "materia/modificar", formData).toPromise();
      }*/
   
   
   }
