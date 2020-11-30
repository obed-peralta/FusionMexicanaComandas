<?php
function getDB(){
    $user='uvsqhyvwxzzvjf8t';
    $password='RATYvqXfzM9YJif3ed9E';
    $host='b4nr5ofy10tdhdxpffcf-mysql.services.clever-cloud.com';
    $dbName='b4nr5ofy10tdhdxpffcf';
    try{
        $connection= new PDO('mysql:host='.$host.';dbname='.$dbName.';',$usuario,$password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo "Connection failed: ". $e->getMessage();
    }
    return $connection;
}
	/*if ($connection) {

	}*/

?>
