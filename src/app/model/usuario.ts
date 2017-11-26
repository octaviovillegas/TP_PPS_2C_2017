import { Rol } from './rol.enum'

export class Usuario
{
    // Propiedades de todos los usuarios de la app
    // Correo electrónico
    public email: string;
    // Contraseña
    public password: string;
    // Rol del usuario (puede ser Administrador, Administrativo, Profesor o Alumno)
    public rol: Rol;
    // Nombre de la persona
    public nombre: string;
    // Apellido de la persona
    public apellido: string;
    // Domicilio de la persona
    public domicilio: string;
    // Legajo de la persona
    public legajo: number;
    // Foto
    public foto: string;




}