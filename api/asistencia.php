<?php

require_once"accesoDatos.php";

class Persona
{
	public $fecha;
	public $nombre;
 	public $idMateria;
	public $idAlumno;
	public $asistencia;

	//CONSTRUCTOR
	public function __construct($fecha, $nombre, $idMateria, $idAlumno, $asistencia){
		$this->fecha = $fecha;
		$this->nombre = $nombre;
		$this->idMateria = $idMateria;
		$this->idAlumno = $idAlumno;
		$this->asistencia = $asistencia;
	}
}

?>