export class Encuesta{
    
      private codigo:string;
    
      private pregunta:string;
      private opcion1:string;
      private opcion2:string;
      private opcion3:string;
      private fechaI:string;
      private fechaExp:string;
    
      constructor(){
        this.codigo="";
        this.pregunta = "";
        this.opcion1="";
        this.opcion2 = "";
        this.opcion3 = "";
        this.fechaI="";
        this.fechaExp="";
      }
    
      public getCodigo(){
        return this.codigo;
      }
      public getPregunta(){
        return this.pregunta;
      }
     
      public getfechai():string{
        return this.fechaI;
      }
      public getfechaE():string{
        return this.fechaExp;
      }
      public getOpcion1(){
        return this.opcion1;
      }
    
      public getOpcion2():string{
        return this.opcion2;
      }
      public getOpcion3():string{
        return this.opcion3;
      }
    
    
    
      public setCodigo(_codigo:string):void{
        this.codigo = _codigo;
      }
      public setPregunta(_pregunta:string):void{
        this.pregunta = _pregunta;
      }
      public setOpcion1(_opcion1:string):void{
        this.opcion1 = _opcion1;
      }
      public setOpcion2(_opcion2:string):void{
        this.opcion2 = _opcion2;
      }
      public setOpcion3(_opcion3:string):void{
        this.opcion3 = _opcion3;
      }

      public setfechaE(_fechaExp:string):void{
        this.fechaExp = _fechaExp;
      }
      public setfechaI(_fechaI:string):void{
        this.fechaI = _fechaI;
      }

      /*
      public setAulas(_aula:string):boolean{
        if (this.aulas!=undefined && this.aulas!=null) {
          this.aulas.push(_aula);
          return true;
        } else {
          return false;
        }
      }

      public setMateria(_materia:string[]):boolean{
        if (_materia!=undefined && _materia!=null) {
          this.materias = _materia;
          return true;
        } else {
          return false;
        }
      }
    
      public setPassword(password:string):void{
        this.passw = password;
      }
      public setCorreo(mail:string):void{
        this.correo = mail;
      }
      public setPerfil(_perfil:string):void{
        this.perfil = _perfil;
      }*/
    
    
    
    
    }
    