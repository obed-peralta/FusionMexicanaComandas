<?php

	include('database.php');

	if (isset($_POST['user'])) {
		
		$user = $_POST['user'];
		$password = $_POST['password'];

		$query = "SELECT nombre_usuario, password_usuario FROM usuarios";
		$result = mysqli_query($connection, $query);

		if (!$result) {
			echo "Error to extract data users";
		}else{
			echo "OK";
		}

	}

?>