<?php

    include ('database.php');

    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $edad = $_POST['edad'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $Usuario = $_POST['Usuario'];
    $Password = $_POST['Password'];

    $query = "CALL guardar_info_usuario('$nombre','$apellidos',$edad,'$email','$telefono',5,'$Usuario','$Password')";
    $result = mysqli_query($connection, $query);
    if($result){
        echo "OK";
    }else{
        die("No se registró =: ".mysqli_error($connection));
    }
?>