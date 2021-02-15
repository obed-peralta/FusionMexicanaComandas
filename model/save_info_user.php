<?php

    include ('database.php');

    $id_usuario = $_POST['id_usuario'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $telefono = $_POST['numero'];
    $email = $_POST['email'];

    $query = "UPDATE detalle_usuarios SET nombre='$nombre',apellidos='$apellidos',telefono='$telefono',email='$email' WHERE id_detalle_usuario=(select id_detalle_usuario from usuarios where id_usuario=$id_usuario)";
    $result = mysqli_query($connection, $query);
    if($result){
        echo '1';
    }else{
        die(mysqli_error($connection));
    }

?>