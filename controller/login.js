
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
                	let json = JSON.parse(response);
                	// Según el cargo
                	if (window.sessionStorage) {
						
						sessionStorage.setItem("id_usuario",json.id_usuario);
						sessionStorage.setItem("nombre_usuario",json.nombre_usuario);
						sessionStorage.setItem("id_cargo",json.id_cargo);

						switch(json.id_cargo){
							case '-1':
								template="<div class='alert alert-danger' role='alert'>Datos Inválidos</div>";
								$('#Alert').html(template);
								sessionStorage.removeItem('id_usuario');
								sessionStorage.removeItem('nombre_usuario');
								sessionStorage.removeItem('id_cargo');
								break;
							case '1':
								$(window).attr('location','view/Administrador.html');
								break;
							case '2':
								$(window).attr('location','view/Mesero.html');
								break;
							case '3':
								$(window).attr('location','view/Cocinero.html');
								break;
							case '4':
								$(window).attr('location','view/Cajero.html');
								break;					
						}

					} else {

						throw new Error('Tu navegador web no soporta sessionStorage!');
						
					}
                }
            });
		}
	});

	$('#btn-enviar-registrar').on('click',function(){
		if($('#Nombre').val() && $('#Apellidos').val() && $('#Edad').val()){
			let url = "model/set_user.php";
			let nombre = $('#Nombre').val();
			let apellidos = $('#Apellidos').val();
			let edad = $('#Edad').val();
			let email = $('#Email').val();
			let telefono = $('#Telefono').val();
			
			$.post(url,{nombre,apellidos,edad,email,telefono},function(response){
				if(response.includes("OK")){
					let template = `<div class="alert alert-primary" role="alert">
										Registrado.
										El usuario es tú nombre
										Contraseña: GENERIC_PASSWORD
									</div>`;
					$('#title-alert').html("Operación Exitosa");
					$('#body-alert').html(template);
					$('#modalRegistrar').modal('hide');
					$('#alertModal').modal('show');
					$('#Nombre').val('');
					$('#Apellidos').val('');
					$('#Edad').val('')
					$('#Email').val('');
					$('#Telefono').val('');
				}else{
					let template = `<div class="alert alert-danger" role="alert">
										ERROR: ${response}
									</div>`;
					$('#title-alert').html("Ocurrió un error");
					$('#body-alert').html(template);
					$('#alertModal').modal('show');
				}
			});
		}else{
			let template = `<div class="alert alert-danger" role="alert">
								Complete los primeros 3 campos
							</div>`;
			$('#title-alert').html("Datos faltantes");
			$('#body-alert').html(template);
			$('#alertModal').modal('show');
			$('#Nombre').val('');
			$('#Apellidos').val('');
			$('#Edad').val('')
			$('#Email').val('');
			$('#Telefono').val('');
		}
	});
});
