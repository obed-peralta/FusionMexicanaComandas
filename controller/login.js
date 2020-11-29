
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
                	let template='';
                	// Según la respuesta
					switch(response){
						case "false":
							template="<div class='alert alert-danger' role='alert'>Datos Inválidos</div>";
							$('#Alert').html(template);
							break;
						case "Administrador":
							console.log(response);
							break;
						case "Mesero":
							console.log(response);
							break;
						case "Cocinero":
							console.log(response);
							break;
						case "Cajero":
							console.log(response);
							break;					
					}               
                }
            });
		}
	});
});
