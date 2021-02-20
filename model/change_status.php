<?php

    include ('database.php');

    $id_detalle_usuario = $_POST['id'];

    $query = "UPDATE detalle_usuarios SET status = false WHERE id_detalle_usuario = $id_detalle_usuario";
    mysqli_query($connection,$query);

?>