$(document).ready(function () {
	console.log('mesero.js is working');
	if (window.sessionStorage) {
		if (sessionStorage.getItem('id')) {
			console.log(sessionStorage.getItem('id'));
		} else {
			$(window).attr('location','../index.html');
		}
	} else {
		throw new Error('Tu navegador web no soporta sessionStorage!');
	}
});