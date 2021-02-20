<?php

    include ('database.php');

    $id_to_delete = $_POST['id'];
    $query = "CALL borrar_info_usuario($id_to_delete)";
    $result = mysqli_query($connection, $query);
    if($result){
        echo 'OK';
    }else{
        echo '!OK';
    }

?>