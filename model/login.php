<?php

	include('database.php');

	if (isset($_POST['user'])) {
		
		$user = $_POST['user'];
		
		$password = $_POST['password'];

		$query = "SELECT id_usuario FROM usuarios WHERE nombre_usuario='$user' AND password_usuario='$password'";
		
		$result = mysqli_query($connection, $query);

		if (!$result) {

			die("Error en la BD Login");

		}else{
			//Si me devuelve más de una fila, es decir que si se validó el login
			if (mysqli_num_rows($result)>0) { //https://es.stackoverflow.com/questions/159758/registro-vac%C3%ADo-en-sql-con-php
				
				$row = mysqli_fetch_array($result); //Almacenamos el resultado en una lista

				$id = $row['id_usuario']; //Extraemos el id y lo guardamos

				$query = "SELECT c.nombre FROM cargos c INNER JOIN detalle_usuarios du ON du.id_cargo = c.id_cargo INNER JOIN usuarios u ON u.id_detalle_usuario = du.id_detalle_usuario WHERE u.id_usuario=$id"; //Extraemos el cargo del usuario según su id
				
				
				$result = mysqli_query($connection, $query); 
				
				$row = mysqli_fetch_array($result); //Almacenamos el resultado en una nueva lista
				 
				$cargo = $row['nombre']; // Extraemos el dato del nombre del cargo

				
				echo $cargo; //Envíamos el nombre del cargo

			}else{
				
				echo "false"; //No existió el usuario
			
			}
			
		}

	}

?>