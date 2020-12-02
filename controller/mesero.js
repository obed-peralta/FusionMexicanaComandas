$(document).ready(function () {
	console.log('mesero.js is working');

	$('#drawer-demo').drawer({
		//backdrop: 'static',
		//keyboard: false,
		focus: false,
		show: false
	});

	if (window.sessionStorage) {
		if (sessionStorage.getItem('id_usuario')) {
			//console.log(sessionStorage.getItem('id'));
			let nombre_usuario = sessionStorage.getItem('nombre_usuario');
			$('#titulo').html("Mesas");
			$('.drawer-title').html("Bienvenido "+nombre_usuario);
			getUserInfo(sessionStorage.getItem('id_usuario'));
			seeTables();
		} else {
			$(window).attr('location','../index.html');
		}
	} else {
		throw new Error('Tu navegador web no soporta sessionStorage!');
	}

	function getUserInfo(id) {
		$.ajax({
			url: '../model/get_user_info.php',
			type: 'POST',
			data: {id},
			success: function(response){
				let info = JSON.parse(response);
				console.log(info);
				$('#nombre').html(`<label><strong>Nombre</strong></label><br><p>${info.nombre} ${info.apellidos}</p>`);
				$('#numero_telefonico').html(`<label><strong>Teléfono</strong><p>${info.telefono}</p>`);
				$('#email').html(`<label><strong>Email</strong><p>${info.email}</p>`);
			}
		});
	}

	function seeTables(){
		$.ajax({
			url: '../model/get_mesas.php',
			type: 'GET',
			success: function (response){
				let mesas = JSON.parse(response);
				let fila = '';
				let cards = '';
				console.log(mesas);
				mesas.forEach(mesa => {
					switch (mesa.estado) {
						case 'Disponible':
							cards = setTypeCard('secondary',cards, mesa);
							break;
						case 'Ocupada':
							cards = setTypeCard('success',cards, mesa);
							break;
					}
				});
				fila += `<div class="row">${cards}</div>`;
				$('.mesas').html(fila);
			}
		});
	}

	function setTypeCard(type, cards, mesa){
		cards += `
		<div class="col-sm-3 col-lg-3 p-2">
			<div class="card text-white bg-${type} text-center" id="${mesa.id_mesa}">
				<div class="card-header">
					${mesa.id_mesa}
				</div>
				<div class="card-body" id="${mesa.id_mesa}">
					<h5 class="card-title">${mesa.estado}</h5>
					<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<div class="row">
						<div class="col-6">
							<button class="btn-cuenta btn btn-danger">Cuenta</button>
						</div>
						<div class="col-6">
							<button class="btn-agregar btn btn-primary">Agregar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
		return cards;
	}

	$(document).on('click','.btn-agregar',function (){
		let element = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(element).attr('id');
		console.log(id);
	});

});