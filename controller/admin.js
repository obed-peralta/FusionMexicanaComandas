$(document).ready(function(){

    console.log("admin.js it works");
    
    /**
     * INICIO Bloque de acceso e información del usuario
     */
    if(window.sessionStorage){
        if(sessionStorage.getItem('id_usuario')){
            let nombre_usuario = sessionStorage.getItem('nombre_usuario');
            $('h2').append(sessionStorage.getItem('nombre_usuario'));
            $('.drawer-title').html(`${nombre_usuario}`);
            getUserInfo(sessionStorage.getItem('id_usuario'));
            animacionInicio();
        }else{
            $(window).attr('location','../index.html');
        }
    }else{
        throw new Error('Tu navegador web no soporta sesiones');
    }
    function getUserInfo(id){
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
    $('#drawer-demo').drawer({
		//backdrop: 'static',
		//keyboard: false,
		focus: false,
		show: false
	});

    /**
     * FIN Bloque de acceso e información del usuario
     */

    /**
     * INICIO Bloque para generar animación de circulos
     */
    function animacionInicio(){
        let container = document.querySelector('#container');
        for (let i = 0; i <= 7; i++) {          
            let blocks = document.createElement('div');
            blocks.classList.add('block');
            container.appendChild(blocks);
        }
        animar();
    }
    function animar(){
        anime({
            targets: '.block',
            translateX: function(){
                return anime.random(-500,500);
            },
            translateY: function(){
                return anime.random(-200,200);
            },
            scale: function(){
                return anime.random(1,3);
            },
            easing: 'linear',
            duration: 3000,
            delay: anime.stagger(10),
            complete: animar,
        });
    }
    /**
     * FIN Bloque para generar animación de circulos
     */

     $(document).on('click','.btn-logout',function(){
        window.sessionStorage.removeItem('id_usuario');
        window.sessionStorage.removeItem('nombre_usuario');
        window.sessionStorage.removeItem('id_cargo');
        window.sessionStorage.removeItem('id_detalle_usuario');
        $(window).attr('location','../index.html');
     });

});