<?php

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = "SELECT nombre,apellidos,email,telefono FROM detalle_usuarios du INNER JOIN usuarios u ON u.id_detalle_usuario = du.id_detalle_usuario WHERE id_usuario = $id";
        $result = mysqli_query($connection, $query);
        if (!$result) {
            die("Error en ver mesas sql");
        }else{
            $json = array();
            if (mysqli_num_rows($result)>0) {
                while ($row = mysqli_fetch_array($result)) {
                    $json[] = array(
                        'nombre' => $row['nombre'],
                        'apellidos' => $row['apellidos'],
                        'email' => $row['email'],
                        'telefono' => $row['telefono']
                    );
                }
                $jsonString = json_encode($json[0]);
                echo $jsonString;
            }
        }
    }    

?>