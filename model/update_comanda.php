<?php

    include ('database.php');

    $operacion = $_POST['operacion'];
    $id_platillo = $_POST['id_platillo'];
    $id_comanda = $_POST['id_comanda'];
    $query;
    $result;

    switch($operacion){
        case "delete":
            $query = "DELETE FROM detalle_comandas WHERE id_detalle_platillo=$id_platillo AND id_comanda=$id_comanda";
            $result = mysqli_query($connection, $query);
            if (!$result) {
                die("No se borró de la comanda ".mysqli_error($connection));
            }else{
                echo "OK";
            }
            break;
        case "less":
            $query = "UPDATE detalle_comandas SET cantidad = (cantidad-1) WHERE id_detalle_platillo = $id_platillo AND id_comanda=$id_comanda";
            $result = mysqli_query($connection,$query);
            if(!$result){
                die("No se pudo restarle uno");
            }else{
                echo "OK";
            }
            break;
        case "more":
            $query = "UPDATE detalle_comandas SET cantidad = (cantidad+1) WHERE id_detalle_platillo = $id_platillo AND id_comanda=$id_comanda";
            $result = mysqli_query($connection,$query);
            if(!$result){
                die("No se pudo agregarle uno");
            }else{
                echo "OK";
            }
            break;
    }
?>