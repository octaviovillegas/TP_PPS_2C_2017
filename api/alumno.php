<?php

require_once"accesoDatos.php";

class Alumno
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
}
?>