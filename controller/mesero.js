$(document).ready(function () {
	console.log('mesero.js is working');

	$('#drawer-demo').drawer({
		//backdrop: 'static',
		//keyboard: false,
		focus: false,
		show: false
	});

	/*if (window.sessionStorage) {
		if (sessionStorage.getItem('id_usuario')) {
			//console.log(sessionStorage.getItem('id'));
			let nombre_usuario = sessionStorage.getItem('nombre_usuario');
			$('#titulo').html("Bienvenido " + nombre_usuario);
		} else {
			$(window).attr('location','../index.html');
		}
	} else {
		throw new Error('Tu navegador web no soporta sessionStorage!');
	}*/
});