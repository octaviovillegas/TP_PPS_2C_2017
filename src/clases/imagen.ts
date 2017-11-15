export class Imagen{

          private nombre:string;
          private foto:any;

          constructor(){
              this.nombre = "";
              this.foto = undefined;
          }


          public setNombre(nombre:string):void{
            this.nombre = nombre;
          }
          public setFoto(foto:any):void{
            this.foto = foto;
          }

          public getNombre() : string {
            return this.nombre;
          }
          public getFoto():any{
            return this.foto;
          }


  }
