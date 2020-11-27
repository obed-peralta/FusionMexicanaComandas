<?php

	$connection = mysqli_connect(
		'b4nr5ofy10tdhdxpffcf-mysql.services.clever-cloud.com', //Host
        'uvsqhyvwxzzvjf8t', //USer
        'RATYvqXfzM9YJif3ed9E', //Password
        'b4nr5ofy10tdhdxpffcf'    // Database
	);

	if ($connection) {
		echo "Database is connected";
	}else{
		echo "Database isn't connected";
	}

?>