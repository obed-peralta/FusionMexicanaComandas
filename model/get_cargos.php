<?php

    include ('database.php');

    $query = "SELECT id_cargo,nombre FROM cargos";
    $result = mysqli_query($connection, $query);

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[]=array(
            'id_cargo' => $row['id_cargo'],
            'nombre' => $row['nombre'],
        );
    }

    $jsonString = json_encode($json);
    echo $jsonString;

?>