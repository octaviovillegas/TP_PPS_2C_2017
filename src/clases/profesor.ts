export class Profesor{

    private dni:string;
    private foto:string;
    private nombre:string;
    private aulas:Array<string>;
    private materias:Array<string>;
    private passw:string;
    private correo:string;
    private perfil:string;

    constructor(){
      this.dni="";
      this.correo = "";
      this.foto="";
      this.nombre="";
      this.passw = "";
      this.perfil = "";
      this.aulas=new Array<string>();
      this.materias=new Array<string>();
    }

    public getPerfil(){
      return this.perfil;
    }
    public getCorreo(){
      return this.correo;
    }
    public getDNI():string{
      return this.dni;
    }
    public getFoto():string{
      return this.foto;
    }
    public getNombre():string{
      return this.nombre;
    }
    public getAulas(){
      return this.aulas;
    }
    public getMaterias(){
      return this.materias;
    }
    public getPassword():string{
      return this.passw;
    }

    public setDNI(_legajo:string):void{
      this.dni = _legajo;
    }
    public setFoto(_foto:string):void{
      this.foto = _foto;
    }
    public setNombre(_nombre:string):void{
      this.nombre = _nombre;
    }
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
    }




  }
