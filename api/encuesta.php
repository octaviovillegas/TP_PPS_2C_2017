<?php

require_once"accesoDatos.php";

class Encuesta
{
	public $pregunta1;
	public $respuesta1;
 	public $pregunta2;
  	public $repuesta2;
	public $pregunta3;
	public $respuesta3;

	//CONSTRUCTOR
	public function __construct($pregunta1, $respuesta1, $pregunta2, $repuesta2, $pregunta3 , $respuesta3){
		$this->pregunta1 = $pregunta1;
		$this->respuesta1 = $respuesta1;
		$this->pregunta2 = $pregunta2;
		$this->repuesta2 = $repuesta2;
		$this->pregunta3 = $pregunta3;
        $this->respuesta3 = $respuesta3;
	}
	//OBTENCION DE TODOS LAS PERSONAS DE LA BASE DE DATOS
	public static function obtenerTodas(){
		$sql = 'SELECT * FROM encuesta';
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);	
	}

	public static function agregar($pregunta1,$respuesta1,$pregunta2,$respuesta2,$pregunta3,$respuesta3){
			$sql = 'INSERT INTO encuesta (pregunta1,respuesta1,pregunta2,respuesta2,pregunta3,respuesta3) VALUES (:pregunta1, :respuesta1, :pregunta2, :respuesta2, :pregunta3,:respuesta3)';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':pregunta1', $pregunta1, PDO::PARAM_STR);
			$consulta->bindValue(':respuesta1', $respuesta1, PDO::PARAM_STR);
			$consulta->bindValue(':pregunta2', $pregunta2, PDO::PARAM_STR);
			$consulta->bindValue(':respuesta2', $respuesta2, PDO::PARAM_STR);
			$consulta->bindValue(':pregunta3', $pregunta3, PDO::PARAM_STR);
			$consulta->bindValue(':respuesta3', $respuesta3, PDO::PARAM_STR);
			$consulta->execute();
			return true;//ALTA EXITOSA
		}

}