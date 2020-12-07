<?php 

	include('database.php');

	$id = $_POST['id'];

	$query = "UPDATE mesas SET estado='Ocupada' WHERE id_mesa=$id";

	$result = mysqli_query($connection, $query);

	if (!$result) {
		die("No se actualizó el estado de la mesa");
	}else{
		echo "Estado Actualizado";
	}

 ?>