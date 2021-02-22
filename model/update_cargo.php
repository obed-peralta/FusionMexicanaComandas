<?php

    include ('database.php');

    $id_detalle_usuario = $_POST['id_detalle_usuario'];
    $nuevo_id_cargo = $_POST['nuevo_id_cargo'];

    $query = "UPDATE detalle_usuarios SET id_cargo = $nuevo_id_cargo WHERE id_detalle_usuario = $id_detalle_usuario";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('No se pudo realizar la actualización');
    }else{
        echo 'OK';
    }

?>