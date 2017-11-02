export class Usuario {

    id : number;
    nombre : string;


    
      constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
          this[f] = fields[f];
        }
      }
    
    }