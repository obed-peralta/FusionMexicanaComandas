<?php 

	include ('database.php');

	$query = "SELECT * FROM platillo WHERE id_platillo BETWEEN 8 AND 11";

	$result = mysqli_query($connection, $query);

	if (mysqli_num_rows($result)>0 && $result) {
		$json = array();
		while ($row = mysqli_fetch_array($result)) {
			$json[] =  array(
				'id_platillo' => $row['id_platillo'],
				'nombre' => $row['nombre']
			);
		}
		$jsonString = json_encode($json);
		echo $jsonString;
	}

?>