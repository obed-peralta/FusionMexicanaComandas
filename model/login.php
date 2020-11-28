<?php

	include('database.php');

	if (isset($_POST['user'])) {
		
		$user = $_POST['user'];
		$password = $_POST['password'];

		$query = "SELECT nombre_usuario, password_usuario FROM usuarios WHERE nombre_usuario='$user' AND password_usuario='$password'";
		$result = mysqli_query($connection, $query);
		if (!$result) {
			echo "NONE";
		}else{
			
			$row = mysqli_fetch_array($result);
			$id = $row['id_usuario'];

			$query = "SELECT c.nombre AS cargo FROM cargos c INNER JOIN detalle_usuarios du ON du.id_cargo = c.id_cargo INNER JOIN usuarios u ON u.id_detalle_usuario = du.id_detalle_usuario WHERE nombre_usuario='$id'";
			
			$result = mysqli_query($connection, $query);
			$row = mysqli_fetch_array($result);
			echo row['cargo'];
		}

	}

?>