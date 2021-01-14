<?php
    include ('database.php');

    $id_mesa = $_POST['id_mesa'];
    $num_personas;
    $id_comanda;
    $array_platillos = array();
    $json = array();

    $query = "SELECT numero_personas FROM mesas WHERE id_mesa=$id_mesa";
    $result = mysqli_query($connection,$query);
    if(!$result){
        die("No se pudo extraer el número de personas");
    }else{
        $row = mysqli_fetch_array($result);
        $numero_personas = $row['numero_personas'];

        $query = "SELECT MAX(id_comanda) AS id_comanda FROM comandas WHERE id_mesa = $id_mesa";
        $result = mysqli_query($connection, $query);
        if (!$result) {
            die("No se pudo obtener la comanda de la mesa ".mysqli_error($connection));
        }else{
            if(mysqli_num_rows($result)>0){
                $row = mysqli_fetch_array($result);
                $id_comanda = $row['id_comanda'];
                $query = "SELECT dp.id_detalle_platillo, dp.descripcion, dp.precio, dc.cantidad FROM detalle_comandas dc INNER JOIN detalle_platillo dp ON dc.id_detalle_platillo=dp.id_detalle_platillo WHERE dc.id_comanda=$id_comanda";
                $result = mysqli_query($connection,$query);
                if(!$result){
                    die("No se pudo obtener el detalle de la comanda y platillos ".mysqli_error($connection));
                }else{
                    if (mysqli_num_rows($result)>0) {
                        while ($row = mysqli_fetch_array($result)) {
                            array_push($array_platillos,array($row['id_detalle_platillo'],$row['descripcion'],$row['precio'],$row['cantidad'],''));
                        }
                        $json[] = array(
                            'id_comanda' => $id_comanda,
                            'id_mesa' => $id_mesa,
                            'numero_personas' => $numero_personas,
                            'platillos' => $array_platillos
                        );
                    }
                }
            }
        }
        $json_string = json_encode($json);
        echo $json_string;
    }
?>