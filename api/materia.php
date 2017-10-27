<?php
require_once "accesoDatos.php";
class Materia
{
 public $idMateria;
	public $idDia;
	public $idAula;
 	public $nombre;
  	public $cuatrimestre;
	public $division;
	public function __construct($idDia, $idAula, $Nombre, $Cuatrimestre, $Division){
		$this->idDia = $idDia;
		$this->idAula = $idAula;
		$this->nombre = $Nombre;
		$this->cuatrimestre = $Cuatrimestre;
		$this->division=$Division;
	}
	public static function TraerMateriasSegunDia($dia){
		$sql = 'SELECT * FROM materias WHERE idDia = :dia';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':dia', $dia, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	//OBTENCION DE TODOS LAS Materias DE LA BASE DE DATOS
	public static function TraerTodasLasMaterias(){
		$sql = 'SELECT * FROM materias';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	//ELIMINACION DE UNA PERSONA DE LA BASE DE DATOS
	public static function BorrarMateria($idMateria){
		$sql = 'DELETE FROM materias WHERE idMateria = :idMateria';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->execute();
	}
/*	public static function BorrarPersona($id){
		$sql = 'DELETE FROM persona WHERE id = :id';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	}*/
	public function __construc ($idMateria, $idDia, $idAula, $nombre, $cuatrimestre, $division){
		$this->idMateria = $idMateria;
		$this->idDia = $idDia;
		$this->idAula = $idAula;
		$this->nombre = $nombre;
		$this->cuatrimestre = $cuatrimestre;
		$this->division = $division;
	}
	public static function TraerMaterias(){
		$sql =
			'SELECT *
			FROM materias';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerDispositivo($idUsuario){
		$sql = 'SELECT d.*
				FROM dispositivos AS d, usuarios AS u
				WHERE d.idUsuario = :idUsuario
					AND d.idUsuario = u.idUsuario
					AND u.estado = 1';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_INT);
	    $consulta->execute();
	    return $consulta->fetch(PDO::FETCH_ASSOC);
	}
	public static function GuardarDispositivo($idUsuario, $plataforma, $version, $fabricante, $modelo){
		if (Materia::TraerDispositivo($idUsuario) == NULL) {
			$sql = 'INSERT INTO dispositivos (idUsuario, plataforma, version, fabricante, modelo)
					VALUES (:idUsuario, :plataforma, :version, :fabricante, :modelo)';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_INT);
			$consulta->bindValue(':plataforma', $plataforma, PDO::PARAM_STR);
			$consulta->bindValue(':version', $version, PDO::PARAM_STR);
			$consulta->bindValue(':fabricante', $fabricante, PDO::PARAM_STR);
			$consulta->bindValue(':modelo', $modelo, PDO::PARAM_STR);
			$consulta->execute();
		}
		else{
			$sql = 'UPDATE dispositivos
					SET plataforma = :plataforma,
						version = :version,
						fabricante = :fabricante,
						modelo = :modelo
					WHERE idUsuario = :idUsuario';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_INT);
			$consulta->bindValue(':plataforma', $plataforma, PDO::PARAM_STR);
			$consulta->bindValue(':version', $version, PDO::PARAM_STR);
			$consulta->bindValue(':fabricante', $fabricante, PDO::PARAM_STR);
			$consulta->bindValue(':modelo', $modelo, PDO::PARAM_STR);
			$consulta->execute();
		}
	}
	public static function TraerIdProfesorSegunIdUsuario($idUsuario){
		$sql =
			'SELECT idProfesor
			FROM profesores
			WHERE idUsuario = :idUsuario';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerIdAlumnoSegunIdUsuario($idUsuario){
		$sql =
			'SELECT idAlumno
			FROM alumnos
			WHERE idUsuario = :idUsuario';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnoAsistenciaSegunMateriaAlumnoDetalle($idMateria, $idAlumno){
		$sql =
			'SELECT a.asistencia, a.fecha
			FROM asistencias AS a, alumnos AS al, usuarios AS u
			WHERE a.idAlumno = :idAlumno
				AND a.idMateria = :idMateria
				AND a.idAlumno = al.idAlumno
				AND al.idUsuario = u.idUsuario
				AND u.estado = 1
			ORDER BY a.fecha';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnoAsistenciaSegunMateriaAlumnoResumen($idMateria, $idAlumno){
		$sql =
			'SELECT a.asistencia, COUNT(a.asistencia) AS cantidad
			FROM asistencias AS a, alumnos AS al, usuarios AS u
			WHERE a.idAlumno = :idAlumno
				AND a.idMateria = :idMateria
				AND a.idAlumno = al.idAlumno
				AND al.idUsuario = u.idUsuario
				AND u.estado = 1
			GROUP BY a.asistencia';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnosSegunMateria($idMateria){
		$sql =
			'SELECT a.*
			FROM alumnos AS a, alumnos_materias AS am, usuarios AS u
			WHERE am.idAlumno = a.idAlumno
				AND am.idMateria = :idMateria
				AND a.idUsuario = u.idUsuario
				AND u.estado = 1
			ORDER BY a.apellido, a.nombre';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
	    $consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnoAsistenciaSegunFechaMateriaAlumno($fecha, $idMateria, $idAlumno){
		$sql =
			'SELECT a.*, asi.asistencia
			FROM alumnos AS a, asistencias AS asi, usuarios AS u
			WHERE a.idAlumno = asi.idAlumno
				AND asi.fecha = :fecha
				AND asi.idMateria = :idMateria
				AND asi.idAlumno = :idAlumno
				AND a.idUsuario = u.idUsuario
				AND u.estado = 1
			ORDER BY a.apellido, a.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriasSegunDiaYAlumno($idDia, $idAlumno){	
		$sql = 'SELECT m.*
				FROM materias AS m, alumnos_materias AS am, alumnos AS al, usuarios AS u
				WHERE m.idDia = :idDia
					AND am.idMateria = m.idMateria
					AND am.idAlumno = :idAlumno
					AND am.idAlumno = al.idAlumno
					AND al.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY m.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriasSegunAlumno($idAlumno){
		$sql = 'SELECT m.*
				FROM materias AS m, alumnos_materias AS am, alumnos AS al, usuarios AS u
				WHERE am.idMateria = m.idMateria
					AND am.idAlumno = :idAlumno
					AND am.idAlumno = al.idAlumno
					AND al.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY m.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnoSegunId($idAlumno){
		$sql = 'SELECT a.*
				FROM alumnos AS a, usuarios AS u
				WHERE a.idAlumno = :idAlumno
					AND a.idUsuario = u.idUsuario
					AND u.estado = 1';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAlumnosSegunDia($idDia){
		$sql = 'SELECT DISTINCT a.*
				FROM alumnos AS a, materias AS m, alumnos_materias AS am, usuarios AS u
				WHERE a.idAlumno = am.idAlumno
					AND m.idMateria = am.idMateria
					AND idDia = :idDia
					AND a.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY a.apellido, a.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriasSegunDiaYAula($idDia, $idAula){
		$sql = 'SELECT *
				FROM materias
				WHERE idDia = :idDia
					AND idAula = :idAula
				ORDER BY nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->bindValue(':idAula', $idAula, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAulaSegunId($idAula){
		$sql = 'SELECT *
				FROM aulas
				WHERE idAula = :idAula';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idAula', $idAula, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAulasSegunDia($idDia){
		$sql = 'SELECT DISTINCT a.*
				FROM aulas AS a, materias AS m
				WHERE m.idDia = :idDia
					AND a.idAula = m.idAula
				ORDER BY a.numero';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriasSegunDiaYProfesor($idDia, $idProfesor){
		$sql = 'SELECT m.*
				FROM materias AS m, profesores_materias AS pm, profesores AS p, usuarios AS u
				WHERE pm.idProfesor = :idProfesor
					AND pm.idMateria = m.idMateria
					AND m.idDia = :idDia
					AND pm.idProfesor = p.idProfesor
					AND p.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY m.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->bindValue(':idProfesor', $idProfesor, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerProfesorSegunId($idProfesor){
		$sql = 'SELECT p.*
				FROM profesores AS p, usuarios AS u
				WHERE p.idProfesor = :idProfesor
					AND p.idUsuario = u.idUsuario
					AND u.estado = 1';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idProfesor', $idProfesor, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriasSegunIdProfesor($idProfesor){
		$sql = 'SELECT m.*
				FROM materias AS m, profesores_materias AS pm, profesores AS p, usuarios AS u
				WHERE pm.idProfesor = :idProfesor
					AND m.idMateria = pm.idMateria
					AND pm.idProfesor = p.idProfesor
					AND p.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY m.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idProfesor', $idProfesor, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerProfesoresSegunDia($idDia){
		$sql = 'SELECT DISTINCT p.*
				FROM profesores AS p, materias AS m, profesores_materias AS pm, usuarios AS u
				WHERE m.idDia = :idDia
					AND p.idProfesor = pm.idProfesor
					AND m.idMateria = pm.idMateria
					AND p.idUsuario = u.idUsuario
					AND u.estado = 1
				ORDER BY p.apellido, p.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idDia', $idDia, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerAsistencia($fecha, $idMateria, $idAlumno){
		$sql = 'SELECT a.*
				FROM asistencias AS a, alumnos AS al, usuarios AS u
				WHERE a.fecha = :fecha
					AND a.idMateria = :idMateria
					AND a.idAlumno = :idAlumno
					AND a.idAlumno = al.idAlumno
					AND al.idUsuario = u.idUsuario
					AND u.estado = 1';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
	    $consulta->execute();
	    return $consulta->fetch(PDO::FETCH_ASSOC);
	}
	public static function GuardarAsistencia($fecha, $idMateria, $idAlumno, $asistencia){
		if (Materia::TraerAsistencia($fecha, $idMateria, $idAlumno) == NULL) {
			$sql = 'INSERT INTO asistencias (fecha, idMateria, idAlumno, asistencia)
					VALUES (:fecha, :idMateria, :idAlumno, :asistencia)';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
			$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
			$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
			$consulta->bindValue(':asistencia', $asistencia, PDO::PARAM_INT);
			$consulta->execute();
		}
		else{
			$sql = 'UPDATE asistencias
					SET asistencia = :asistencia
					WHERE fecha = :fecha
						AND idMateria = :idMateria
						AND idAlumno = :idAlumno';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
			$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
			$consulta->bindValue(':idAlumno', $idAlumno, PDO::PARAM_INT);
			$consulta->bindValue(':asistencia', $asistencia, PDO::PARAM_INT);
			$consulta->execute();
		}
	}
	public static function TraerAlumnosAsistenciaSegunFechaMateria($fecha, $idMateria){
		$sql =
			'SELECT a.*, asi.asistencia
			FROM alumnos AS a, asistencias AS asi, usuarios AS u
			WHERE a.idAlumno = asi.idAlumno
				AND asi.fecha = :fecha
				AND asi.idMateria = :idMateria
				AND a.idUsuario = u.idUsuario
				AND u.estado = 1
			ORDER BY a.apellido, a.nombre';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	public static function TraerMateriaSegunIdMateria($idMateria){
		$sql = 'SELECT * FROM materias WHERE idMateria = :idMateria';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria', $idMateria, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	
	//OBTENCION DE TODOS LAS PERSONAS DE LA BASE DE DATOS
	public static function TraerTodasLasPersonas(){
		$sql = 'SELECT * FROM personas';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	//ELIMINACION DE UNA PERSONA DE LA BASE DE DATOS
	public static function BorrarPersona($id){
		$sql = 'DELETE FROM personas WHERE id = :id';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
	}
	//CREACION DEL PERSONA EN LA BASE DE DATOS
	public static function InsertarMateria($materia){
		//VERIFICACION DE EXISTENCIA DEL USUARIO
		//if (Materia::ObtenerMateria($materia) != NULL) {
		//return false;//EL USUARIO YA EXISTIA PREVIAMENTE EN LA BASE DE DATOS
		//}
	//	else{
			//CREACION DE la materia EN LA BASE DE DATOS
			$sql = 'INSERT INTO materias (idDia,idAula,nombre, cuatrimestre, division) VALUES (:idDia, :idAula, :nombre, :cuatrimestre, :division)';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':idDia', $materia->idDia, PDO::PARAM_INT);
			$consulta->bindValue(':idAula', $materia->idAula, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $materia->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':cuatrimestre', $materia->cuatrimestre, PDO::PARAM_STR);
			$consulta->bindValue(':division', $materia->division, PDO::PARAM_STR);
			$consulta->execute();
			return true;//ALTA EXITOSA
		}
  public static function ModificarMaterias($idDia,$idAula,$nombre,$cuatrimestre,$division,$idMateria)
  {
        $sql = 'UPDATE materias SET idDia=:idDia,
				idAula=:idAula,
				nombre=:nombre,
				cuatrimestre=:cuatrimestre,
				division=:division
        WHERE idMateria=:idMateria';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
      $consulta->bindValue(':idMateria',$idMateria, PDO::PARAM_INT);
      $consulta->bindValue(':idDia',$idDia, PDO::PARAM_INT);
      $consulta->bindValue(':idAula', $idAula, PDO::PARAM_INT);
      $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
      $consulta->bindValue(':cuatrimestre', $cuatrimestre, PDO::PARAM_STR);
      $consulta->bindValue(':division', $division, PDO::PARAM_STR);
			$consulta->execute();
      return true;
    }
	//OBTENCION DE UN USUARIO
	public static function ObtenerMateria($idMateria){
		$sql = "SELECT * FROM `materias` WHERE idMateria=:idMateria";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':idMateria',$idMateria, PDO::PARAM_INT);
	    $consulta->execute();
      return $consulta->fetchAll();
	    //return $consulta->fetch(PDO::FETCH_ASSOC);
	}
}
?>