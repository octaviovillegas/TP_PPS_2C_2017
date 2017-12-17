<?php
class AccesoDatos
{
    private static $ObjetoAccesoDatos;
    private $objetoPDO;
    
    private function __construct(){
        try {
            //CREACIÓN DE LA CONEXIÓN CON EL SERVIDOR EXTERNO 
            $servername = 'mysql.hostinger.com.ar';
            $dbname = 'u766132325_bd';
            $username = 'u766132325_us';
            $password = 'garbarino123';

/*
            //CREACIÓN DE LA CONEXIÓN CON EL SERVIDOR LOCAL
            $servername = 'localhost';
            $dbname = 'ejemploabm';
            $username = 'root';
            $password = '';
*/
            $this->objetoPDO = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password, 
                    array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this->objetoPDO->exec("SET CHARACTER SET utf8");
            }
        catch (PDOException $error){
            print "Error!: " . $error->getMessage();
            exit();
        }
    }
 
    public function ObtenerConsulta($sql)
    {
        return $this->objetoPDO->prepare($sql);
    }
 
    public static function ObtenerObjetoAccesoDatos()
    {
        if (!isset(self::$ObjetoAccesoDatos)) {
            self::$ObjetoAccesoDatos = new AccesoDatos();
        }
        return self::$ObjetoAccesoDatos;
    }
 
    //EVITA QUE EL OBJETO SE PUEDA CLONAR
    public function __clone()
    {
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
    }
}
?>