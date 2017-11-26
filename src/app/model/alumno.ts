import { Usuario } from "./usuario";
import { Rol } from "./rol.enum";
import { Materia } from "./materia.enum";

export class Alumno extends Usuario{
    
    materias: Array<Materia>;
    
    
    constructor()
    {
        super();
        this.rol = Rol.Alumno;
        this.materias = new Array<Materia>();
    }
}