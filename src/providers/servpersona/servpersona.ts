import { Injectable } from '@angular/core';
import { Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServpersonaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServpersonaProvider {

  route : string = "http://nggroup.esy.es/api/index.php/";     
  constructor(private http : Http) { }

  GuardarDispositivo(idUsuario, plataforma, version, fabricante, modelo){
    let body = {
        "idUsuario" : idUsuario,
        "plataforma" : plataforma,
        "version" : version,
        "fabricante" : fabricante,
        "modelo" : modelo
    }
    return this.http.post(this.route + "materia/GuardarDispositivo", body).toPromise().then(data => data.json());
  } 

  TraerAlumnoAsistenciaSegunMateriaAlumnoResumen(idMateria, idAlumno){
    let requestOptions = new RequestOptions({
      params : {
        "idMateria" : idMateria,
        "idAlumno" : idAlumno
      }
    });
    return this.http.get(this.route + "materia/TraerAlumnoAsistenciaSegunMateriaAlumnoResumen", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnoAsistenciaSegunMateriaAlumnoDetalle(idMateria, idAlumno){
    let requestOptions = new RequestOptions({
      params : {
        "idMateria" : idMateria,
        "idAlumno" : idAlumno
      }
    });
    return this.http.get(this.route + "materia/TraerAlumnoAsistenciaSegunMateriaAlumnoDetalle", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnoAsistenciaSegunFechaMateriaAlumno(fecha, idMateria, idAlumno){
    let requestOptions = new RequestOptions({
      params : {
        "fecha" : fecha,
        "idMateria" : idMateria,
        "idAlumno" : idAlumno
      }
    });
    return this.http.get(this.route + "materia/TraerAlumnoAsistenciaSegunFechaMateriaAlumno", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriasSegunAlumno(idAlumno){
    let requestOptions = new RequestOptions({
      params : {
        "idAlumno" : idAlumno
      }
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunAlumno", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriasSegunDiaYAlumno(idDia, idAlumno){
    let requestOptions = new RequestOptions({
      params : {
        "idDia" : idDia,
        "idAlumno" : idAlumno
      }
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunDiaYAlumno", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnoSegunId(idAlumno){
    let requestOptions = new RequestOptions({
      params : {"idAlumno" : idAlumno}
    });
    return this.http.get(this.route + "materia/TraerAlumnoSegunId", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnosSegunDia(idDia){
    let requestOptions = new RequestOptions({
      params : {"idDia" : idDia}
    });
    return this.http.get(this.route + "materia/TraerAlumnosSegunDia", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriasSegunDiaYAula(idDia, idAula){
    let requestOptions = new RequestOptions({
      params : {
        "idDia" : idDia,
        "idAula" : idAula
      }
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunDiaYAula", requestOptions).toPromise().then(data => data.json());
  }

  TraerAulaSegunId(idAula){
    let requestOptions = new RequestOptions({
      params : {"idAula" : idAula}
    });
    return this.http.get(this.route + "materia/TraerAulaSegunId", requestOptions).toPromise().then(data => data.json());
  }

  TraerAulasSegunDia(idDia){
    let requestOptions = new RequestOptions({
      params : {"idDia" : idDia}
    });
    return this.http.get(this.route + "materia/TraerAulasSegunDia", requestOptions).toPromise().then(data => data.json());
  }


  TraerMateriasSegunDiaYProfesor(idDia, idProfesor){
    let requestOptions = new RequestOptions({
      params : {
        "idDia" : idDia,
        "idProfesor" : idProfesor
      }
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunDiaYProfesor", requestOptions).toPromise().then(data => data.json());
  }

  TraerProfesorSegunId(idProfesor){
    let requestOptions = new RequestOptions({
      params : {"idProfesor" : idProfesor}
    });
    return this.http.get(this.route + "materia/TraerProfesorSegunId", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriasSegunIdProfesor(idProfesor){
    let requestOptions = new RequestOptions({
      params : {"idProfesor" : idProfesor}
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunIdProfesor", requestOptions).toPromise().then(data => data.json());
  }

  TraerProfesoresSegunDia(idDia){
    let requestOptions = new RequestOptions({
      params : {"idDia" : idDia}
    });
    return this.http.get(this.route + "materia/TraerProfesoresSegunDia", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnosAsistenciaSegunFechaMateria(fecha, idMateria){
    let requestOptions = new RequestOptions({
      params : {
        "fecha" : fecha,
        "idMateria" : idMateria
      }
    });
    return this.http.get(this.route + "materia/TraerAlumnosAsistenciaSegunFechaMateria", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriaSegunIdMateria(idMateria){
    let requestOptions = new RequestOptions({
      params : {"idMateria" : idMateria}
    });
    return this.http.get(this.route + "materia/TraerMateriaSegunIdMateria", requestOptions).toPromise().then(data => data.json());
  }

  TraerMateriasSegunDia(idDia){
    let requestOptions = new RequestOptions({
      params : {"idDia" : idDia}
    });
    return this.http.get(this.route + "materia/TraerMateriasSegunDia", requestOptions).toPromise().then(data => data.json());
  }

  TraerAlumnosSegunMateria(idMateria){
    let requestOptions = new RequestOptions({
      params : {"idMateria" : idMateria}
    });
    return this.http.get(this.route + "materia/TraerAlumnosSegunMateria", requestOptions).toPromise().then(data => data.json());
  }
  
  GuardarAsistencia(fecha, idMateria, datos){    
    var body = {"fecha" : fecha,
                "idMateria" : idMateria,
                "datos" : datos};
    return this.http.post(this.route + "materia/GuardarAsistencia", body).toPromise().then(data => data.json());
  }

  TraerPersonas(){
    return this.http.get(this.route + "persona/obtenerTodas").toPromise().then(data => data.json());
  }
  VerificarEmail(email){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"email":email}
    return this.http.post(this.route + "persona/vermail", data).toPromise();
  }
  VerificarDni(dni){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"dni":dni}
    return this.http.post(this.route + "persona/verdni", data).toPromise();
  }
  VerificarLegajo(legajo){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"legajo":legajo}
    return this.http.post(this.route + "persona/verlegajo", data).toPromise();
  }
  TraerUsuarios(id){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"id":id}
    return this.http.post(this.route + "persona/traerusuarios", data).toPromise().then(data => data.json());
  }
  
   
   TraerUsuariosPorEmail(email){

    let requestOptions = new RequestOptions({
      params : {
        "email" : email
      }
    });
    return this.http.get(this.route + "persona/traerusuariosporemail", requestOptions).toPromise().then(data => data.json());
  } 

  TraerUsuariosMasDatos(id){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"id":id}
    return this.http.post(this.route + "persona/traerusuariosmasdatos", data).toPromise().then(data => data.json());
  }
  BorrarPersona(id,rol){
    //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP      
    var data = {"id":id,"rol":rol}
    return this.http.post(this.route + "persona/borrarpersona", data).toPromise();
  }
  ModificarPersona(formData){         
      var body = {"email" : formData[0].email,
                  "rol" : formData[0].rol,
                  "password" : formData[0].password,
                  "nombre" : formData[0].nombre,
                  "apellido" : formData[0].apellido,
                  "dni" : formData[0].dni,
                  "legajo" : formData[0].legajo,
                  "id" : formData[0].id,
                  "img" : formData[0].img,
                  }    
    return this.http.post(this.route + "persona/modificar", body).toPromise();
  }
  AgregarPersona(formData){         
      var body = {"email" : formData[0].email,
                  "rol" : formData[0].rol,
                  "password" : formData[0].password,
                  "nombre" : formData[0].nombre,
                  "apellido" : formData[0].apellido,
                  "dni" : formData[0].dni,
                  "legajo" : formData[0].legajo,
                  "img" : formData[0].img
                  }    
    return this.http.post(this.route + "persona/agregar", body).toPromise();
  }
  token(formData){    
     var body = {"email" : formData[0].email,
                  "rol" : formData[0].idrol,                  
                  "nombre" : formData[0].nombre,
                  "apellido" : formData[0].apellido,                  
                  "img" : formData[0].imagen
                }    
                console.info(body)          
    return this.http.get(this.route + "crearToken", body).toPromise();
  }
}
