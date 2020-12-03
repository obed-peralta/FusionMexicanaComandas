<?php 

	include ('database.php');

	if (isset($_POST['id'])) {

		$id = $_POST['id'];
		$query = "SELECT id_detalle_platillo,descripcion,precio FROM detalle_platillo dp INNER JOIN platillo p ON dp.id_platillo = p.id_platillo WHERE p.id_platillo=$id";
		$result = mysqli_query($connection, $query);

		if ($result && mysqli_num_rows($result)>0) {
			$json = array();
			while ($row = mysqli_fetch_array($result)) {
				$json[] = array(
					'id_detalle_platillo' => $row['id_detalle_platillo'],
					'descripcion' => $row['descripcion'],
					'precio' => $row['precio']
				);
			}
			$jsonString = json_encode($json);
			echo $jsonString;
		}
	}

?>