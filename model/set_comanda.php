<?php 

	//include('database.php');

	$id_usuario = $_POST['id_usuario'];
	$id_mesa = $_POST['id_mesa'];
	$numero_personas = $_POST['numero_personas'];
	$orden = json_decode($_POST['orden']);
	$OrdenLength = count($orden);
	
	/*echo "ID MESA: ".$id_mesa."\n";
	echo "NUMERO DE PERSONAS: ".$numero_personas."\n";
	echo "-----PLATILLOS-----\n";
	for ($i=0; $i < $OrdenLength; $i++) { 
		echo 'ID PLATILLO PHP: '.$orden[$i]."\n";
	}*/

	$query = "UPDATE mesas SET estado='Ocupada', numero_personas=$numero_personas WHERE id_mesa=$id_mesa";

	$result = mysqli_query($connection, $query);

	if (!$result) {
		die("No se actualizó la mesa");
	}else{
		$query = "INSERT INTO comandas (id_mesa,fecha,id_usuario) VALUES($id_mesa,CURDATE(),$id_usuario)";
		$result = mysqli_query($connection, $query);
		if (!$result) {
			die("No se generó la comanda");
		}else{
			$query = "SELECT MAX(id_comanda) AS id_comanda FROM comandas WHERE id_mesa=$id_mesa AND fecha=CURDATE() AND id_usuario=$id_usuario";
			$result = mysqli_query($connection, $query);
			if(mysqli_num_rows($result)>0){
				$row = mysqli_fetch_array($result);
				$id_comanda = $row['id_comanda'];

				for($i = 0; $i < $OrdenLength; $i++){
//Inserción Pendiente
				}
				$query = "INSERT INTO detalle_comandas (id_comanda,id_detalle_platillo,cantidad) VALUES ()";
				$result = mysqli_query($connection, $query);
			}
		}
	}

?>