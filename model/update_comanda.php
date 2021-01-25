<?php

    include ('database.php');

    $id_comanda = $_POST['id_comanda'];
    $cuantosUpdate = $_POST['cuantosUpdate'];

    /* Conversión del array del _POST a un array en php */
    $orden = json_decode($_POST['arrayPlatillos']);
    $ordenLength = count($orden);
    $arrayPlatillos = array();
    for($i = 0; $i < $ordenLength; $i++){
        array_push($arrayPlatillos, array($orden[$i][0],$orden[$i][1],$orden[$i][2],$orden[$i][3],$orden[$i][4]));
    }

    for ($i=0; $i < $ordenLength; $i++) { 
        if($i < $cuantosUpdate){
            $cantidad = $arrayPlatillos[$i][3];
            $id_platillo = $arrayPlatillos[$i][0];
            $query =  "UPDATE detalle_comandas SET cantidad = $cantidad WHERE id_comanda = $id_comanda AND id_detalle_platillo = $id_platillo";
            $result = mysqli_query($connection, $query);
            if(!$result){
                die("No se actualizaron los platillos de la comanda ".mysqli_error($connection));
            }
        }else{
            $id_platillo = $arrayPlatillos[$i][0];
            $cantidad = $arrayPlatillos[$i][3];
            $query = "INSERT INTO detalle_comandas (id_comanda,id_detalle_platillo,cantidad) VALUES ($id_comanda,$id_platillo,$cantidad)";
            $result = mysqli_query($connection, $query);
            if(!$result){
                die("No se ingresaron los platillos en la comanda ".mysqli_error($connection));
            }
        }
    }
    echo "Guardado";

?>