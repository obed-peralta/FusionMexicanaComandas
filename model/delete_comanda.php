<?php

    include ('database.php');

    $id_platillo = $_POST['id_platillo'];
    $id_comanda = $_POST['id_comanda'];

    $query = "DELETE FROM detalle_comandas WHERE id_comanda=$id_comanda AND id_detalle_platillo=$id_platillo";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die(mysqli_error($connection));
    }else{
        echo "OK";
    }
?>