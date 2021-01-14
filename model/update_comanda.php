<?php

    include ('database.php');

    $operacion = $_POST['operacion'];
    $id_platillo = $_POST['id_platillo'];
    $query;
    $result;
    switch($operacion){
        case "delete":
            $query = "DELETE FROM detalle_comandas WHERE id_platillo=$id_platillo";
            $result = mysqli_query($connection, $query);
            if (!$result) {
                die("No se borró de la comanda ".mysqli_error($connection));
            }else{
                
            }
            break;
        case "less":
            break;
        case "more":
            break;
    }
?>