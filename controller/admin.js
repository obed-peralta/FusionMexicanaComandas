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
    
    // Función para obtener la información del usuario
    function getUserInfo(id){
        $.ajax({
            url: '../model/get_user_info.php',
            type: 'POST',
            data: {id},
            success: function(response){
                let info = JSON.parse(response);
				//console.log(info);
				$('#nombre').html(`<label for="nombreUsuario">Nombre</label><input class="form-control" id="nombreUsuario" type="text" value="${info.nombre}" disabled></input>`);
                $('#apellidos').html(`<label for="apellidosUsuario">Apellidos</label><input class="form-control" id="apellidosUsuario" type="text" value="${info.apellidos}" disabled></input>`);
				$('#numero_telefonico').html(`<label for="numeroUsuario">Teléfono</label><input class="form-control" id="numeroUsuario" type="text" value="${info.telefono}" disabled></input>`);
				$('#email').html(`<label for="emailUsuario">Email</label><input class="form-control" id="emailUsuario" type="text" value="${info.email}" disabled></input>`);
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

    // Función para cerrar sesión
    $(document).on('click','.btn-logout',function(){
        window.sessionStorage.removeItem('id_usuario');
        window.sessionStorage.removeItem('nombre_usuario');
        window.sessionStorage.removeItem('id_cargo');
        window.sessionStorage.removeItem('id_detalle_usuario');
        $(window).attr('location','../index.html');
    });

    // Función para modificar la información del usuario
    $(document).on('click','#btn-modificar-usuario',function(){
        $('#nombreUsuario').prop('disabled',false);
        $('#apellidosUsuario').prop('disabled',false);
        $('#numeroUsuario').prop('disabled',false);
        $('#emailUsuario').prop('disabled',false);
        
        let element = $(this)[0];
        $(element).text('Guardar');
        $(element).attr('id','btn-guardar-usuario');

    });

    // Función para guardar la información del usuario
    $(document).on('click','#btn-guardar-usuario',function(){

        // Falta VALIDAR
        let id_usuario = parseInt(sessionStorage.getItem('id_usuario'));
        let nombre = $('#nombreUsuario').val();
        let apellidos = $('#apellidosUsuario').val();
        let numero = $('#numeroUsuario').val();
        let email = $('#emailUsuario').val();

        let element = $(this)[0];

        let objectPOST = {id_usuario,nombre,apellidos,numero,email};


        $.post('../model/save_info_user.php',objectPOST,function(response){
            if(response == '1'){
                $('#nombreUsuario').prop('disabled',true);
                $('#apellidosUsuario').prop('disabled',true);
                $('#numeroUsuario').prop('disabled',true);
                $('#emailUsuario').prop('disabled',true);
                $(element).text('Modificar');
                $(element).attr('id','btn-modificar-usuario');
            }else{
                alert(response);
            }
        });

    });

});