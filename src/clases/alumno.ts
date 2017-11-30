export class Alumno{

  private legajo:string;
  private foto:string;
  private nombre:string;
  private aulas:Array<string>;
  private materias:Array<string>;
  private passw:string;
  private correo:string;
  private perfil:string;
  private horario:string;

  constructor(){
    this.legajo="";
    this.correo = "";
    this.foto="";
    this.nombre="";
    this.passw = "";
    this.perfil = "";
    this.horario = "";
    this.aulas=new Array<string>();
    this.materias=new Array<string>();
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
  public getAulas(){
    return this.aulas;
  }
  public getMaterias(){
    return this.materias;
  }
  public getPassword():string{
    return this.passw;
  }

  public getHorario() : string {
    return this.horario;
  }


  public setLegajo(_legajo:string):void{
    this.legajo = _legajo;
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
  public setHorario(_horario:string):void {
    this.horario = _horario;
  }



}
