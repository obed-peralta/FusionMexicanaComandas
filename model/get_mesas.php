<?php

    include('database.php');

    $query = "SELECT * FROM mesas";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die("Error en ver mesas sql");
    }else{
        $json = array();
        if (mysqli_num_rows($result)>0) {
            while ($row = mysqli_fetch_array($result)) {
                $json[] = array(
                    'id_mesa' => $row['id_mesa'],
                    'numero_personas' => $row['numero_personas'],
                    'estado' => $row['estado']
                );
            }
            $jsonString = json_encode($json);
            echo $jsonString;
        }
    }

?>