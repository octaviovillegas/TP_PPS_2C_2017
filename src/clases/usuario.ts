export class Usuario{

      private id:number;
      private nombre:string;
      private clave:number;
      private perfil:string;
      private correo:string;

      constructor(){
          this.id = null;
          this.nombre = "";
          this.clave = null;
          this.perfil = "";
          this.correo = "";
      }

      public getId():number{
          return this.id;
      }

      public getNombre():string{
          return this.nombre;
      }

      public getClave():number{
          return this.clave;
      }

      public getPerfil():string{
          return this.perfil;
      }

      public getCorreo():string{
        return this.correo;
      }

      public setId(id:number){
          if (id != undefined && id != null) {
              this.id = id;
          }
      }

      public setNombre(nombre:string){
        this.nombre = nombre;
      }

      public setClave(clave:number){
          if (clave != null && clave != undefined) {
              this.clave = clave;
          }
      }

      public setPerfil(perfil:string){
          if (perfil != "") {
              this.perfil = perfil;
          }
      }


      public setCorreo(correo:string){
        if (correo != "") {
            this.correo = correo;
        }
    }




  }
