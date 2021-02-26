<?php

    include ('database.php');

    $query = "SELECT comandas.*,ventas.total,ventas.forma_pago FROM comandas INNER JOIN ventas ON comandas.id_comanda = ventas.id_comanda";

    $result = mysqli_query($connection, $query);

    $json = array();

    while($row = mysqli_fetch_array($result)){

        $json[] = array(
            'id_comanda' => $row['id_comanda'],
            'id_mesa' => $row['id_mesa'],
            'fecha' => $row['fecha'],
            'total' => $row['total'],
            'forma_pago' => $row['forma_pago']
        );

    }

    $jsonString = json_encode($json);

    echo $jsonString;

?>
