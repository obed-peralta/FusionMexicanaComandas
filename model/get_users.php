<?php

    include ('database.php');

    $noIncluido = $_POST['id'];

    $consulta = "SELECT * FROM detalle_usuarios WHERE id_detalle_usuario NOT IN (SELECT id_detalle_usuario FROM usuarios WHERE id_usuario = $noIncluido)";
    $ejecutar = mysqli_query($connection, $consulta);

    $json = array();
    while($fila = mysqli_fetch_array($ejecutar)){
        $json[] = array(
            'nombre' => $fila['nombre'],
            'apellidos' => $fila['apellidos'],
            'edad' => $fila['edad'],
            'email' => $fila['email'],
            'telefono' => $fila['telefono'],
            'id_cargo' => $fila['id_cargo'],
            'status' => $fila['status']
        );
    }

    $jsonString = json_encode($json);
    echo $jsonString;

?>