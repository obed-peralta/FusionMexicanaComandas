
$(document).ready(function () {
	

	console.log("login.js is working");

	$('form').submit(function(e){
		e.preventDefault();

		if ($('#user').val() && $('#user').val()) {
			let user = $('#user').val();
			let password = $('#password').val()

			$.ajax({
                url: 'model/login.php', //Archivo backend que nos devuelve la busqueda
                type: 'POST', //Método por el cuál se envían los datos
                data: {user, password}, //Parámetro enviado
                success: function(response){ //Si el servidor devuelve algo...
					console.log(response);                    
                }
            });
		}

	});


});