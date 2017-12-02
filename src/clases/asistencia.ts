export class Asistencia{
    
    private legajo:string;
    private nombre:string;
    private clave:number;
    private perfil:string;
    private correo:string;
    private foto:string;
    private loginSocial:boolean;

      constructor(){
        this.legajo="";
        this.correo = "";
        this.foto="";
        this.nombre="";
       // this.aulas=new Array<string>();
        //this.materias=new Array<string>();
      }
    
      public getPerfil(){
        return this.perfil;
      }
      public getCorreo(){
        return this.correo;
      }

      public getLegajo():string{
        return this.legajo;
      }
      public getFoto():string{
        return this.foto;
      }
      public getNombre():string{
        return this.nombre;
      }
     
     
    
    
      public setFoto(_foto:string):void{
        this.foto = _foto;
      }
      public setNombre(_nombre:string):void{
        this.nombre = _nombre;
      }
   /*   public setAulas(_aula:string):boolean{
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
    /*
      public setPassword(password:string):void{
        this.passw = password;
      }
      public setCorreo(mail:string):void{
        this.correo = mail;
      }
      public setPerfil(_perfil:string):void{
        this.perfil = _perfil;
      }
      /*
      public setHorario(_horario:string):void {
        this.horario = _horario;
      }*/
    
    
    
    }