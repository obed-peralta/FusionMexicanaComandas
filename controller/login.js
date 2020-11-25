$(document).ready(function () {
	

	console.log("login.js is working");

	$('form').submit(function(e){
		e.preventDefault();

		if ($('#user').val() && $('#user').val()) {
			console.log('Login');
		}
		
	});


});