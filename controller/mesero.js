$(document).ready(function() {
	if (window.sessionStorage) {
		if (sessionStorage.getItem('id')) {
			console.log(sessionStorage.getItem('id'));
		} else {
			console.log('ID NO DEFINIDO');
		}
	} else {
		throw new Error('Tu navegador web no soporta sessionStorage!');
	}
});