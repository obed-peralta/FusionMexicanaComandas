<?php

	$connection = mysqli_connect(
		'localhost', //Host
        'root', //USer
        '', //Password
        'fusionmexicana'    // Database
	);

	if ($connection) {
		echo "Database is connected";
	}else{
		echo "Database isn't connected";
	}

?>