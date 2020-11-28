
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
							$(window).attr('location','view/Administrador.html');
							break;
						case "Mesero":
							$(window).attr('location','view/Mesero.html');
							break;
						case "Cocinero":
							$(window).attr('location','view/Cocinero.html');
							break;
						case "Cajero":
							$(window).attr('location','view/Cajero.html');
							break;					
					}               
                }
            });
		}
	});
});
