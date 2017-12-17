<?php

require_once"accesoDatos.php";


class Persona
{
	public $idAlumno;
	public $idUsuario;
	public $nombre;
 	public $apellido;
	public $dni;
	public $legajo;

	//CONSTRUCTOR
	public function __construct($idAlumno, $idUsuario, $nombre, $apellido, $dni,$legajo){
		$this->idAlumno = $idAlumno;
		$this->idUsuario = $idUsuario;
		$this->nombre = $nombre;
		$this->apellido = $apellido;
		$this->dni = $dni;
		$this->legajo = $legajo;
	}

	//OBTENCION DE TODOS LAS PERSONAS DE LA BASE DE DATOS

   public static function TraerUsuariosPorEmail($email){  
	   
		$sql = "SELECT * FROM `usuarios` WHERE email=:email";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':email', $email, PDO::PARAM_STR);			
	    $consulta->execute();			
		
		return $consulta->fetchAll();	
	}
	public static function profesorXMateria($materia){     
		$sql = "
		SELECT profesores_materias.idprofesor,profesores.nombre,profesores.apellido,profesores_materias.idmateria from profesores_materias
		left join profesores on (profesores.idprofesor=profesores_materias.idprofesor)
		where profesores_materias.idmateria=".$materia."
		union
		select profesores.idprofesor,profesores.nombre,profesores.apellido,0
		from profesores
		where profesores.idprofesor not in (select idprofesor from profesores_materias where idmateria=".$materia.") 
		";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        //$consulta->bindValue(':materia', $materia, PDO::PARAM_STR);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
	public static function alumnosXMateria($materia){     
		$sql = "
		SELECT alumnos_materias.idalumno,alumnos.nombre,alumnos.apellido,alumnos_materias.idmateria 
		from alumnos_materias
		left join alumnos on (alumnos.idalumno=alumnos_materias.idalumno)
		where alumnos_materias.idmateria=".$materia."
		union
		select alumnos.idalumno,alumnos.nombre,alumnos.apellido,0 
		from alumnos 
 		where alumnos.idalumno not in (select idalumno from alumnos_materias where idmateria=".$materia.")
		";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        //$consulta->bindValue(':materia', $materia, PDO::PARAM_STR);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
	public static function ListarMaterias(){     
		$sql = "SELECT idmateria,nombre from materias";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}	
	public static function TraerTodasLasPersonas(){     
		$sql = "SELECT CONCAT(Nombre, ' ', Apellido) as nomap ,idUsuario,imagen FROM `usuarios`
        where estado=true
                order by nomap asc";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}


    public static function InsertarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo,$img){

        $sql = 'INSERT INTO usuarios (idrol,email,password,nombre,apellido,imagen) VALUES (:rol, :email,:password,:nombre,:apellido,:img)';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':rol', $rol, PDO::PARAM_INT);
			$consulta->bindValue(':email', $email, PDO::PARAM_STR);			
			$consulta->bindValue(':password', $password, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
            $consulta->bindValue(':img', $img, PDO::PARAM_STR);
			$consulta->execute();
        $ultimoid=Persona::TraerUltimoId();
        switch($rol){
            case 3:
                $sql = 'INSERT INTO alumnos  (idusuario,nombre,apellido,dni,legajo) VALUES (:ultimoid,:nombre,:apellido,:dni,:legajo)';
			    $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
                $consulta->bindValue(':ultimoid', $ultimoid, PDO::PARAM_INT);
                $consulta->bindValue(':dni', $dni, PDO::PARAM_INT);
			    $consulta->bindValue(':legajo', $legajo, PDO::PARAM_INT);			
                $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
                $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
			    $consulta->execute();
            break;
            case 4:
                $sql = 'INSERT INTO profesores (idusuario,nombre,apellido) VALUES (:ultimoid,:nombre,:apellido)';
			    $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
                $consulta->bindValue(':ultimoid', $ultimoid, PDO::PARAM_INT);
                $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
                $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
                $consulta->execute();
            break;            
        }
			
			return true;//ALTA EXITOSA
		
	}    
    public static function TraerUltimoId(){     
		$sql = "SELECT idUsuario FROM `usuarios` order by idUsuario desc limit 1";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchColumn();	
	}
    public static function VerificarMail($email){     
		$sql = "SELECT email FROM `usuarios` WHERE email like '%".$email."%'";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);        
	    $consulta->execute();			
		return $consulta->fetchColumn();	
	}
    public static function VerificarDni($dni){     
		$sql = "SELECT dni FROM `alumnos` WHERE dni=:dni";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        $consulta->bindValue(':dni', $dni, PDO::PARAM_STR);			
	    $consulta->execute();			
		return $consulta->fetchColumn();	
	}
    public static function VerificarLegajo($legajo){     
		$sql = "SELECT legajo FROM `alumnos` WHERE legajo=:legajo";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        $consulta->bindValue(':legajo', $legajo, PDO::PARAM_STR);			
	    $consulta->execute();			
		return $consulta->fetchColumn();	
	}
    public static function TraerUsuarios($id){     
		$sql = "SELECT * FROM `usuarios` WHERE idusuario=:id";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        $consulta->bindValue(':id', $id, PDO::PARAM_STR);			
	    $consulta->execute();			
		return $consulta->fetchAll();	
	} 

        public static function TraerUsuariosMasDatos($id){     
		$sql = "SELECT * FROM `alumnos` WHERE idusuario=:id";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        $consulta->bindValue(':id', $id, PDO::PARAM_STR);			
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
    public static function ModificarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo,$id,$img){

        $sql = 'UPDATE usuarios SET nombre=:nombre,
                apellido=:apellido,
                idrol=:rol,
                email=:email,
                password=:password,
                imagen=:img
                WHERE idusuario=:id
                ';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);
			$consulta->bindValue(':rol', $rol, PDO::PARAM_INT);
			$consulta->bindValue(':email', $email, PDO::PARAM_STR);			
			$consulta->bindValue(':password', $password, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
            $consulta->bindValue(':img', $img, PDO::PARAM_STR);
			$consulta->execute();        
        switch($rol){
            case 3:
                $sql = 'UPDATE  alumnos SET nombre=:nombre,
                apellido=:apellido,
                dni=:dni,
                legajo=:legajo
                where idusuario=:id';
			    $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
                $consulta->bindValue(':id', $id, PDO::PARAM_INT);                
                $consulta->bindValue(':dni', $dni, PDO::PARAM_INT);
			    $consulta->bindValue(':legajo', $legajo, PDO::PARAM_INT);			
                $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
                $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
			    $consulta->execute();
            break;
            case 4:
                $sql = 'UPDATE  profesores SET nombre=:nombre, apellido=:apellido WHERE idusuario=:id';
			    $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
                $consulta->bindValue(':id', $id, PDO::PARAM_INT);                
                $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
                $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
                $consulta->execute();
            break;            
        }			
			return true;//ALTA EXITOSA
		
	}
    //AGREGAR UN ESTADO QUE SEA BOOL PARA NO ELIMINAR EL DATO
    public static function BorrarPersona($id,$rol){     
		$sql = "UPDATE usuarios set estado=false where idusuario=:id";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
        $consulta->bindValue(':id', $id, PDO::PARAM_STR);			        		
	    $consulta->execute();			
 	
		return true;	
	}
}
?>