export class Encuesta {
    nombre:string;
    pregunta:string;
    MB:number;
    B:number;
    R:number;
    M:number;
    Si:number;
    No:number;
    PuedeSer:number;
    opcion:string;
    fecha:string;
   // present:boolean;

    constructor() {
        this.nombre = "";
        this.pregunta = "";
        this.MB = 0;
        this.B = 0;
        this.M = 0;
        this.R = 0;
        this.Si = 0;

        this.No = 0;
        this.PuedeSer = 0;
        this.opcion="";
        //this.present = false;
    }
}