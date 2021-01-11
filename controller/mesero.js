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
				//console.log(info);
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
				if(mesas.length!=0){
					let fila = '';
					let cards = '';
					//console.log(mesas);
					mesas.forEach(mesa => {
						cards = setTypeCard('dark',cards, mesa);
					});
					fila += `<div class="row">${cards}</div>`;
					$('.mesas').html(fila);
				}else{
					let message=`<h1 class='display-1'>No hay mesas ocupadas</h1>`;
					$('.mesas').html(message);
				}
			}
		});
	}

	function setTypeCard(type, cards, mesa){
		cards += `
		<div class="col-sm-3 col-lg-3 p-2">
			<div class="card text-white bg-${type} text-center" id="${mesa.id_mesa}">
				<div class="card-header">
					${mesa.estado}
				</div>
				<div class="card-body" id="${mesa.id_mesa}">
					<h5 class="card-title display-4">${mesa.id_mesa}</h5>
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
		return cards;
	}

	function verComanda(){

	}

	/*$(document).on('click','.btn-abrir-comanda',function (){
		let element = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(element).attr('id');
		$('#id-mesa').html(`<strong>Mesa: ${id}</strong>`);
		$('#numero_personas').val('1');
		$('#cuerpo-tabla').html('');
		document.querySelector('#abrir-btn-guardar').setAttribute('id-mesa',id);
	});*/

	$('#id-mesa').change(function(){
		document.querySelector('#abrir-btn-guardar').setAttribute('id-mesa',$(this).val());
	});

	$(document).on('click','.btn-modificar-comanda',function (){
		let element = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(element).attr('id');
		$('#id-mesa').html(`<strong>Mesa: ${id}</strong>`);
		$('#numero_personas').val('1');
		$('#cuerpo-tabla').html('');
	});

	$(document).on('click','.btn-cuenta',function(){
		let url = "https://www.facturaticket.mx/wp-content/uploads/2017/04/LAS-ALITAS-FACTURACION-TICKET.png";
		$(window).attr('location',url);
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
		//console.log(id);
		$.ajax({
			url: '../model/get_detalle_platillo.php',
			type: 'POST',
			data: {id},
			success: function(response){
				let json = JSON.parse(response);
				//console.log(json);
				let card = '';
				json.forEach(detalle => {
					card += 
					`
					<div class="card" data-dismiss="modal">
					  <div class="card-body btn btn-detalle-platillo" id=${detalle.id_detalle_platillo} price=${detalle.precio} description='${detalle.descripcion}'>
					    ${detalle.precio} ${detalle.descripcion}
					  </div>
					</div>
					`;
				});
				$('#body-modal').html(card);
			}
		});
	});

	var platillos = [];
	function agregarPlatillo(id,descripcion,precio,comentarios){
		if(platillos.length == 0){ //Si es el primer elemento
			platillos.push(new Array(id,descripcion,precio,1,comentarios)); //Pues se añade
		}else{// Si no
			//Se busca...
			let find = -1;
			for(let i = 0; i < platillos.length; i++){
				if(platillos[i][0] == id){ //Si se encuentra
					find = i; //Se almacena su indice
					break;
				}
			}
			if (find != -1) {
				//Si se encontró
				platillos[find][3] += 1; //Se agrega +1 en cantidad al platillo similar
				//Se actualiza la tabla
			}else{
				//Si No se encontró
				//Se agrega un nuevo elemento <array> al array
				platillos.push(new Array(id,descripcion,precio,1,comentarios));
			}
		}
		console.log(platillos);
		updateTable();
		//console.log(platillos);
		/*console.log("Longitud array: "+platillos.length);
		platillos.forEach(platillo=>{
			console.log("ID Platillo: "+platillo[0]);
			console.log("Cantidad: "+platillo[1]);
		});*/
	}
	function eliminarPlatillo(id,option){
		if (platillos.length != 0) {
			// Se busca
			let find = -1;
			for(let i = 0; i < platillos.length; i++){
				if(platillos[i][0] == id){ //Si se encuentra
					if(platillos[i][3] > 1){ //Si hay más de 1 en cantidad
						platillos[i][3] -= 1; // Se le resta 1
						if(option == 0){ //Si presionó el botón eliminar
							platillos.splice(i,1); //Se remueve el elemento completamente del array	
						}
					}else{ // Si no, si hay 1 solamente.
						platillos.splice(i,1); //Se remueve el elemento completamente del array
					}	
					break;
				}
			}
			// Se actualiza la tabla
			updateTable();
		}else{
			console.log("No hay elementos en el arreglo <platillos>");
		}
	}
	function updateTable(){
		$('#cuerpo-tabla tr').remove();
		for (let i = 0; i < platillos.length; i++) {
			let template = 
			`
			<tr>
				<th scope="row">${platillos[i][0]}</th>
				<td>${platillos[i][1]}</td>
				<td>${platillos[i][2]}</td>
				<td>${platillos[i][3]}</td>
				<td>${platillos[i][4]}</td>
				<td id=${platillos[i][0]}>
					<button type="button" class="btn btn-warning btn-less"><strong>-</strong></button>
					<button type="button" class="btn btn-danger btn-eliminar" id=${platillos[i][0]}>Eliminar</button>
					<button type="button" class="btn btn-primary btn-more"><strong>+</strong></button>
				</td>
			</tr>
			`;
			$('#cuerpo-tabla').append(template);
		}
	}

	$(document).on('click','.btn-detalle-platillo',function(){
		let detalle_platillo = $(this)[0];
		let id = $(detalle_platillo).attr('id');
		let precio = $(detalle_platillo).attr('price');;
		let descripcion = $(detalle_platillo).attr('description');
		agregarPlatillo(id,descripcion,precio,'');
	});

	$(document).on('click','.btn-eliminar',function(){
		let button = $(this)[0];
		let id = $(button).attr('id');
		eliminarPlatillo(id,0);
	});

	$(document).on('click','#abrir-btn-cancelar',function(){
		$("#id-mesa option[value='1']").attr("selected", true);
		$("#numero_personas option[value='1']").attr("selected", true);
		$('#cuerpo-tabla').html('');
	});

	$(document).on('click','#abrir-btn-guardar',function(){
		let url = '../model/set_comanda.php';
		let postData={		
			id_usuario: sessionStorage.getItem('id_usuario'),
			id_mesa : $(this).attr('id-mesa'),
			numero_personas : $('#numero_personas').val(),
			orden : JSON.stringify(platillos)
		};
		$.post(url, postData,function(response){
			console.log(response);
		});
	});

	$(document).on('click','.btn-logout',function(){
		sessionStorage.removeItem('id_usuario');
		sessionStorage.removeItem('nombre_usuario');
		sessionStorage.removeItem('id_cargo');
		$(window).attr('location','../index.html');
	});

	$(document).on('click','.btn-mas',function(){
		$("#id-mesa option[value='1']").attr("selected", true);
		$("#numero_personas option[value='1']").attr("selected", true);
		$('#cuerpo-tabla').html('');
	});

	$(document).on('click','.btn-more',function(){
		
		let element = $(this)[0].parentElement;
		let id = $(element).attr('id');
		agregarPlatillo(id);

	});

	$(document).on('click','.btn-less',function(){
		
		let element = $(this)[0].parentElement;
		let id = $(element).attr('id');
		eliminarPlatillo(id);

	});

});