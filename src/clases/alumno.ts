export class Alumno{

  private legajo:string;
  private foto:string;
  private nombre:string;
  private aulas:Array<any>;
  private materias:Array<any>;

  constructor(){
    this.legajo="";
    this.foto="";
    this.nombre="";
    this.aulas=new Array<any>();
    this.materias=new Array<any>();
  }

  public getDni():string{
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

  public setDni(_legajo:string):void{
    this.legajo = _legajo;
  }
  public setFoto(_foto:string):void{
    this.foto = _foto;
  }
  public setNombre(_nombre:string):void{
    this.nombre = _nombre;
  }
  public setAula(_aula:string):boolean{
    if (this.aulas!=undefined && this.aulas!=null) {
      this.aulas.push(_aula);
      return true;
    } else {
      return false;
    }
  }
  public setMateria(_materia:string):boolean{
    if (this.materias!=undefined && this.materias!=null) {
      this.materias.push(_materia);
      return true;
    } else {
      return false;
    }
  }




}
