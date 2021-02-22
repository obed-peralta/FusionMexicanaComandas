<?php

	include('database.php');
	if (isset($_POST['user'])) {

		$user = $_POST['user'];
		$password = $_POST['password'];
		
		$query = "SELECT id_usuario,nombre_usuario,id_detalle_usuario FROM usuarios WHERE nombre_usuario='$user' AND password_usuario='$password'";
		
		$result = mysqli_query($connection, $query);

		if (!$result) {

			die("Error en la BD Login");

		}else{

			$json = array();

			//Si me devuelve más de una fila, es decir que si se validó el login
			if (mysqli_num_rows($result)>0) { //https://es.stackoverflow.com/questions/159758/registro-vac%C3%ADo-en-sql-con-php
				
				$row = mysqli_fetch_array($result); //Almacenamos el resultado en una lista

				$id = $row['id_usuario']; //Extraemos el id y lo guardamos
				$nombre = $row['nombre_usuario']; //Extraemos el nombre y lo guardamos
				$id_detalle_usuario = $row['id_detalle_usuario']; //Extraemos el detalle del usuario

				$query = "SELECT c.id_cargo FROM cargos c INNER JOIN detalle_usuarios du ON du.id_cargo = c.id_cargo INNER JOIN usuarios u ON u.id_detalle_usuario = du.id_detalle_usuario WHERE u.id_usuario=$id"; //Extraemos el cargo del usuario según su id
				
				
				$result = mysqli_query($connection, $query); 
				
				$row = mysqli_fetch_array($result); //Almacenamos el resultado en una nueva lista
				 
				$idCargo = $row['id_cargo']; // Extraemos el dato del id del cargo

				if($idCargo != 5){

					//Actualizamos su estado (sesión)
					$query = "UPDATE detalle_usuarios SET status = true WHERE id_detalle_usuario = $id_detalle_usuario";
					mysqli_query($connection,$query);

					$json[]=array(
						'id_usuario' => $id,
						'nombre_usuario' => $nombre,
						'id_cargo' => $idCargo
					);

					$jsonString = json_encode($json[0]);
					
					echo $jsonString; //Envíamos el json con información.

				}else{
					$json[] = array(
						'id_cargo' => '5'
					);
	
					$jsonString = json_encode($json[0]);
					
					echo $jsonString; //Envíamos el json con cargo 5 de que no tiene cargo asignado aún.
				}

			}else{
			
				$json[] = array(
					'id_cargo' => '-1'
				);

				$jsonString = json_encode($json[0]);
				
				echo $jsonString; //Envíamos el json con false de que no se encontró ningún usuario.
			
			}
			
		}
	}

?>
