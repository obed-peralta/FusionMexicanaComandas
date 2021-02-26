<?php

    include ('database.php');

    $id_comanda = $_POST['id'];

    $query = "SELECT dc.id_detalle_platillo,dc.cantidad,dp.descripcion,dp.precio FROM detalle_comandas dc INNER JOIN detalle_platillo dp ON dc.id_detalle_platillo = dp.id_detalle_platillo WHERE dc.id_comanda = $id_comanda";
    $result = mysqli_query($connection,$query);
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'id_detalle_platillo' => $row['id_detalle_platillo'],
            'cantidad' => $row['cantidad'],
            'descripcion' => $row['descripcion'],
            'precio' => $row['precio']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

?>