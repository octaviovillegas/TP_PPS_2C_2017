<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once "materia.php";
require_once "persona.php";
require_once "encuesta.php";
require 'vendor/autoload.php';
require_once 'MWparaAutentificar.php';
require_once 'MWparaCORS.php';

$app = new \Slim\App(['settings' => ['determineRouteBeforeAppMiddleware' => true,'displayErrorDetails' => true,'addContentLengthHeader' => false]]);


$app->add(function (Request $request, Response $response, $next) {
    $response = $next($request, $response);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')//servidor
			//->withHeader('Access-Control-Allow-Origin', 'http://localhost:8100')//local
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
$app->get('/test', function (Request $request, Response $response){  
return "esta cosa funciona";
});

$app->get('/crearToken', function (Request $request, Response $response) {
	
	$email = $request->getParam('email');	
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');	
	$img = $request->getParam('img');	
    $datos = array('email' => $email,'rol' => $rol, 'nombre' => $nombre,'apellido' => $apellido,'imagen'=>$img);
    $datos = array('usuario' => 'rogelio@agua.com','perfil' => 'profe', 'alias' => "PinkBoy");
    
    $token= AutentificadorJWT::CrearToken($datos); 
	//$payload=AutentificadorJWT::ObtenerPayload($token);
	/*
	try 
      {
        AutentificadorJWT::verificarToken($token);
        $esValido=true;      
      }
      catch (Exception $e) {      
        //guardar en un log
        echo $e;
      }
	*/
    $newResponse = $response->withJson($token, 200); 
    
    //$newResponse = $response->withJson($token, 200); 
    return $newResponse;
  });

$app->get('/materia/TraerMaterias', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMaterias());
});

$app->get('/materia/TraerIdProfesorSegunIdUsuario', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerIdProfesorSegunIdUsuario($request->getParam('idUsuario')));
});

$app->get('/materia/TraerIdAlumnoSegunIdUsuario', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerIdAlumnoSegunIdUsuario($request->getParam('idUsuario')));
});

$app->post('/materia/GuardarDispositivo', function (Request $request, Response $response) {
	return $response->withJson(Materia::GuardarDispositivo($request->getParam('idUsuario'), $request->getParam('plataforma'), $request->getParam('version'), $request->getParam('fabricante'), $request->getParam('modelo')));
});

$app->get('/materia/TraerAlumnoAsistenciaSegunMateriaAlumnoDetalle', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnoAsistenciaSegunMateriaAlumnoDetalle($request->getParam('idMateria'), $request->getParam('idAlumno')));
});

$app->get('/materia/TraerAlumnoAsistenciaSegunMateriaAlumnoResumen', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnoAsistenciaSegunMateriaAlumnoResumen($request->getParam('idMateria'), $request->getParam('idAlumno')));
});

$app->get('/materia/TraerAlumnoAsistenciaSegunFechaMateriaAlumno', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnoAsistenciaSegunFechaMateriaAlumno($request->getParam('fecha'), $request->getParam('idMateria'), $request->getParam('idAlumno')));
});

$app->get('/materia/TraerMateriasSegunDiaYAlumno', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunDiaYAlumno($request->getParam('idDia'), $request->getParam('idAlumno')));
});

$app->get('/materia/TraerMateriasSegunAlumno', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunAlumno($request->getParam('idAlumno')));
});

$app->get('/materia/TraerAlumnoSegunId', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnoSegunId($request->getParam('idAlumno')));
});

$app->get('/materia/TraerAlumnosSegunDia', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnosSegunDia($request->getParam('idDia')));
});

$app->get('/materia/TraerMateriasSegunDiaYAula', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunDiaYAula($request->getParam('idDia'), $request->getParam('idAula')));
});

$app->get('/materia/TraerAulaSegunId', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAulaSegunId($request->getParam('idAula')));
});

$app->get('/materia/TraerAulasSegunDia', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAulasSegunDia($request->getParam('idDia')));
});

$app->get('/materia/TraerMateriasSegunDiaYProfesor', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunDiaYProfesor($request->getParam('idDia'), $request->getParam('idProfesor')));
});

$app->get('/materia/TraerProfesorSegunId', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerProfesorSegunId($request->getParam('idProfesor')));
});

$app->get('/materia/TraerMateriasSegunIdProfesor', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunIdProfesor($request->getParam('idProfesor')));
});

$app->get('/materia/TraerProfesoresSegunDia', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerProfesoresSegunDia($request->getParam('idDia'), $request->getParam('idMateria')));
});

$app->get('/materia/TraerAlumnosAsistenciaSegunFechaMateria', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnosAsistenciaSegunFechaMateria($request->getParam('fecha'), $request->getParam('idMateria')));
});

$app->get('/materia/TraerMateriaSegunIdMateria', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriaSegunIdMateria($request->getParam('idMateria')));
});

$app->get('/materia/TraerMateriasSegunDia', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerMateriasSegunDia($request->getParam('idDia')));
});

$app->get('/materia/TraerAlumnosSegunMateria', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerAlumnosSegunMateria($request->getParam('idMateria')));
});

$app->post('/materia/GuardarAsistencia', function (Request $request, Response $response) {
    $fecha = $request->getParam('fecha');
	$idMateria = $request->getParam('idMateria');
	$datos = $request->getParam('datos');
	foreach ($datos as $idAlumno => $asistencia) {
		Materia::GuardarAsistencia($fecha, $idMateria, $idAlumno, $asistencia);
	}
	return $response->withJson("Exito");
});	

$app->post('/persona/borrarpersona', function (Request $request, Response $response) {
	return $response->withJson(Persona::BorrarPersona($request->getParam('id'),$request->getParam('rol')));
    
});

$app->get('/persona/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Persona::TraerTodasLasPersonas());
});
$app->get('/persona/ListarMaterias', function (Request $request, Response $response){
    return $response->withJson(Persona::ListarMaterias());
});
$app->get('/usuario/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Usuario::ObtenerPersona($request->getParam('email'),$request->getParam('pass')));
});
$app->post('/persona/alumnosXMateria', function (Request $request, Response $response){
  $materia = $request->getParam('materia');
  return $response->withJson(Persona::alumnosXMateria($materia));

});   
$app->post('/persona/vermail', function (Request $request, Response $response){
	$email = $request->getParam('email');
    return $response->withJson(Persona::VerificarMail($email));

});
$app->post('/persona/verdni', function (Request $request, Response $response){
	$dni = $request->getParam('dni');
    return $response->withJson(Persona::VerificarDni($dni));
});
$app->post('/persona/verlegajo', function (Request $request, Response $response){
	$legajo = $request->getParam('legajo');
    return $response->withJson(Persona::VerificarLegajo($legajo));
});
$app->post('/persona/traerusuarios', function (Request $request, Response $response){
	$id = $request->getParam('id');
    return $response->withJson(Persona::TraerUsuarios($id));
});

$app->get('/persona/traerusuariosporemail', function (Request $request, Response $response){  
	return $response->withJson(Persona::TraerUsuariosPorEmail($request->getParam('email')));
});


$app->post('/persona/traerusuariosmasdatos', function (Request $request, Response $response){
	$id = $request->getParam('id');
    return $response->withJson(Persona::TraerUsuariosMasDatos($id));
});
$app->post('/persona/agregar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');
	$password = $request->getParam('password');
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$legajo = $request->getParam('legajo');
	$img = $request->getParam('img');
	return $response->withJson(Persona::InsertarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo,$img));     
});	
$app->post('/persona/modificar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');
	$password = $request->getParam('password');
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$legajo = $request->getParam('legajo');
	$id = $request->getParam('id');
	$img = $request->getParam('img');	
	return $response->withJson(Persona::ModificarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo,$id,$img));     
});	

$app->delete('/materia/borrar', function (Request $request, Response $response) {
	Materia::BorrarMateria($request->getParam('idMateria'));
    return $response;
});
$app->get('/materia/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Materia::TraerTodasLasMaterias());
});
$app->post('/materia/ObtenerMateria', function (Request $request, Response $response){
	$idMateria = $request->getParam('idMateria');
    return $response->withJson(Materia::ObtenerMateria($idMateria));
});
$app->post('/materia/modificar', function (Request $request, Response $response) {
	$idDia = $request->getParam('idDia');
	$idAula = $request->getParam('idAula');
    $nombre = $request->getParam('nombre');
	$cuatrimestre = $request->getParam('cuatrimestre');
  $division = $request->getParam('division');
	$idMateria = $request->getParam('idMateria');
	return $response->withJson(Materia::ModificarMaterias($idDia,$idAula,$nombre,$cuatrimestre,$division,$idMateria));
});
$app->post('/materia/agregar', function (Request $request, Response $response) {
     //DECODIFICACION DE DATOS DE FORMULARIO Y ALMACENAMIENTO EN ARRAY ASOCIATIVO
  $datosForm = $request->getParsedBody();
     $mensajeError = null;
  //CREACION DE PERSONA CON FOTO
     if(Materia::InsertarMateria(new Materia($datosForm['idDia'], $datosForm['idAula'], $datosForm['nombre'], $datosForm['cuatrimestre'], $datosForm['division']))){
 
  }
  //MENSAJE POR USUARIO DUPLICADO
  else{
   $mensajeError = 'La  materia ya existe previamente en la base de datos';
  }
 //CODIFICACION DEL MENSAJE DE ERROR
  return $response->withJson($mensajeError);
 });

 $app->get('/encuesta/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Encuesta::obtenerTodas());
});

$app->post('/encuesta/agregar', function (Request $request, Response $response) {
   	$pregunta1 = $request->getParam('pregunta1');
	$respuesta1 = $request->getParam('respuesta1');
    $pregunta2 = $request->getParam('pregunta2');
	$respuesta2 = $request->getParam('respuesta2');
  $pregunta3 = $request->getParam('pregunta3');
	$respuesta3 = $request->getParam('respuesta3');
	return $response->withJson(Encuesta::agregar($pregunta1,$respuesta1,$pregunta2,$respuesta2,$pregunta3,$respuesta3));
});
$app->run();