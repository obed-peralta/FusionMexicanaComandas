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
			$('.drawer-title').html(`<label><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg>Bienvenido ${nombre_usuario}</label>`);
			getUserInfo(sessionStorage.getItem('id_usuario'));
			seeTables();
			fill_Drinks_And_Complements();
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

	function fill_Drinks_And_Complements(){
		$.ajax({
			url: '../model/get_bebidas.php',
			type: 'GET',
			success: function(response){
				let json = JSON.parse(response);
				let card = '';
				json.forEach(bebida => {
					card += 
					`<div class="col-3 p-2">
						<div class="card text-white bg-danger" id=${bebida.id_platillo}>
						  <div class="card-header text-center">
						    ${bebida.nombre}
						  </div>
						  <div class="card-body text-center">
						  		<button type="button" class="btn bebidas-complementos" data-toggle="modal" data-target="#staticBackdrop">
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
								</button>
						  </div>
						</div>
					</div>`;
				});
				let template = `<div class="row">${card}</div>`;
				$('#bebidas').html(template);
			}
		});
	}

	function fill_menu(){
		$.ajax({
			url: '../model/get_menu.php',
			type: 'GET',
			success: function(response){
				let json = JSON.parse(response);
				let card = '';
				json.forEach(platillo => {
					card += 
					`<div class="col-3 p-2">
						<div class="card text-white bg-info" id=${platillo.id_platillo}>
						  <div class="card-header text-center">
						    ${platillo.nombre}
						  </div>
						  <div class="card-body text-center">
						    	<button type="button" class="btn platillo-menu" data-toggle="modal" data-target="#staticBackdrop">
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
								</button>
						  </div>
						</div>
					</div>`;
				});
				let template = `<div class="row">${card}</div>`;
				$('#menu').html(template);
			}
		});
	}

	function fill_light_menu(){
		$.ajax({
			url: '../model/get_menu_light.php',
			type: 'GET',
			success: function(response){
				let json = JSON.parse(response);
				let card = '';
				json.forEach(platillo => {
					card += 
					`<div class="col-3 p-2">
						<div class="card bg-light" id=${platillo.id_platillo}>
						  <div class="card-header text-center">
						    ${platillo.nombre}
						  </div>
						  <div class="card-body text-center">
						    	<button type="button" class="btn platillo-menu-light" data-toggle="modal" data-target="#staticBackdrop">
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
								</button>
						  </div>
						</div>
					</div>`;
				});
				let template = `<div class="row">${card}</div>`;
				$('#menu_l').html(template);
			}
		});
	}

	function fill_kids_menu(){
		$.ajax({
			url: '../model/get_menu_kids.php',
			type: 'GET',
			success: function(response){
				let json = JSON.parse(response);
				let card = '';
				json.forEach(platillo => {
					card += 
					`<div class="col-3 p-2">
						<div class="card bg-dark text-white" id=${platillo.id_platillo}>
						  <div class="card-header text-center">
						    ${platillo.nombre}
						  </div>
						  <div class="card-body text-white text-center">
						    	<button type="button" class="btn platillo-menu-kids" data-toggle="modal" data-target="#staticBackdrop">
									<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
									  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
									</svg>
								</button>
						  </div>
						</div>
					</div>`;
				});
				let template = `<div class="row">${card}</div>`;
				$('#menu_i').html(template);
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
		if(mesa.estado==='Ocupada'){
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
							<div class="col-6" data-toggle="modal" data-target="#exampleModal">
								<button class="btn-modificar-comanda btn btn-primary">Modificar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
		}else{
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
							<div class="col-12" data-toggle="modal" data-target="#exampleModal">
								<button class="btn-abrir-comanda btn btn-primary">Abrir Comanda</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
		}
		return cards;
	}

	function verComanda(){

	}

	$(document).on('click','.btn-abrir-comanda',function (){
		let element = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(element).attr('id');
		$('#id-mesa').html(`<strong>Mesa: ${id}</strong>`);
		$('#numero_personas').val('1');
		$('#cuerpo-tabla').html('');
		/*$postData = {
			id_mesa : id
		};
		$.post('',postData,function (response){

			}
		);*/
	});

	$(document).on('click','.btn-modificar-comanda',function (){
		let element = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(element).attr('id');
		$('#id-mesa').html(`<strong>Mesa: ${id}</strong>`);
		$('#numero_personas').val('1');
		$('#cuerpo-tabla').html('');
	});

	$(document).on('click','#menu1',function(){
		fill_Drinks_And_Complements();
	});
	$(document).on('click','#menu2',function(){
		fill_menu();
	});
	$(document).on('click','#menu3',function(){
		fill_light_menu();
	});
	$(document).on('click','#menu4',function(){
		fill_kids_menu();
	});

	$(document).on('click','.bebidas-complementos, .platillo-menu, .platillo-menu-light, .platillo-menu-kids',function(){
		let element = $(this)[0].parentElement.parentElement;
		let id = $(element).attr('id');
		console.log(id);
		$.ajax({
			url: '../model/get_detalle_platillo.php',
			type: 'POST',
			data: {id},
			success: function(response){
				let json = JSON.parse(response);
				console.log(json);
				let card = '';
				json.forEach(detalle => {
					card += 
					`
					<div class="card" data-dismiss="modal">
					  <div class="card-body btn btn-detalle-platillo" id=${detalle.id_detalle_platillo} price=${detalle.precio} desciption='${detalle.descripcion}'>
					    ${detalle.precio} ${detalle.descripcion}
					  </div>
					</div>
					`;
				});
				$('#body-modal').html(card);
			}
		});
	});

	$(document).on('click','.btn-detalle-platillo',function(){
		let detalle_platillo = $(this)[0];
		let id = $(detalle_platillo).attr('id');
		let desciption = $(detalle_platillo).attr('desciption');
		let price = $(detalle_platillo).attr('price');
		let template = 
		`
		<tr>
      		<th scope="row">${id}</th>
      		<td>${desciption}</td>
      		<td>${price}</td>
    	</tr>
		`;
		$('#cuerpo-tabla').append(template);
	});

	$(document).on('click','#abrir-btn-guardar',function(){

	});

	$(document).on('click','.btn-logout',function(){
		sessionStorage.removeItem('id_usuario');
		sessionStorage.removeItem('nombre_usuario');
		sessionStorage.removeItem('id_cargo');
		$(window).attr('location','../index.html');
	});

});