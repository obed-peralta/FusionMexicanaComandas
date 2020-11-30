<?php
	/*$connection = mysqli_connect(
		'localhost', //Host
        'root', //USer
        '', //Password
        'fusionmexicana'    // Database
    );*/
    $usuario='uvsqhyvwxzzvjf8t';
    $password='RATYvqXfzM9YJif3ed9E';
    try{
        $connection= new PDO('mysql:host=b4nr5ofy10tdhdxpffcf-mysql.services.clever-cloud.com;dbname=b4nr5ofy10tdhdxpffcf',$usuario,$password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo "Connection failed: ". $e->getMessage();
    }
	/*if ($connection) {

	}*/

?>
