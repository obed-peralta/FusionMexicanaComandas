<?php

    include ('database.php');

    $pagar = $_POST['pagar'];
    $tipo = $_POST['tipo'];
    $id_comanda = $_POST['id_comanda'];
    $id_mesa = $_POST['id_mesa'];
    $total = 0;
    /* Conversión del array del _POST a un array en php */
    $platillos = json_decode($_POST['platillos']);
    $platillosLength = count($platillos);

    // Sacando total
    for ($i=0; $i < $platillosLength; $i++) { 
        $total += ($platillos[$i][2]*$platillos[$i][3]);
    }

    //Guardar Venta en MySQL
    $query = "INSERT INTO ventas (id_comanda,total,forma_pago) VALUES($id_comanda,$total,'$tipo')";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die("No se pudo guardar la venta ".mysqli_error($connection));
    }else{
        $query = "UPDATE mesas SET estado='Disponible', numero_personas=0 WHERE id_mesa=$id_mesa";
        $result = mysqli_query($connection,$query);
        echo "OK";
    }
?>