$(document).ready(function(){

    let li_btn_inicio = $('#btn-inicio')[0].parentElement;
    let li_btn_empleados = $('#btn-empleados')[0].parentElement;
    let li_btn_comandas = $('#btn-comandas')[0].parentElement;
    let li_btn_ventas = $('#btn-ventas')[0].parentElement;

    let cargos;

    $('#containerEmpleados').hide();
    $('#containerComandas').hide();
    $('#containerVentas').hide();

    console.log('tools.js its working');

    extraerCargos();

    // Click en botón empleados
    $(document).on('click','#btn-empleados',function(){
        $('#containerInicio').hide();
        $('#containerComandas').hide();
        $('#containerVentas').hide();
        $('#containerEmpleados').show();
        
        $(li_btn_inicio).removeClass('active');
        $(li_btn_empleados).addClass('active');
        $(li_btn_comandas).removeClass('active');
        $(li_btn_ventas).removeClass('active');

        verEmpleados();
    });

    // Click en botón inicio
    $(document).on('click','#btn-inicio',function(){
        $('#containerEmpleados').hide();
        $('#containerComandas').hide();
        $('#containerVentas').hide();
        $('#containerInicio').show();

        $(li_btn_inicio).addClass('active');
        $(li_btn_empleados).removeClass('active');
        $(li_btn_comandas).removeClass('active');
        $(li_btn_ventas).removeClass('active');
    });

    $(document).on('click','.btn-delete-user', function(){
        if(window.confirm('¿Realmente está seguro de eliminar el usuario?\nEsta acción es permanentemente*')){
            const elementoPadre = $(this)[0].parentElement;
            let id = $(elementoPadre).attr('id');
            borrarEmpleado(id);
        }else{
            window.alert('No se realizó la operación');
        }
    });

    $(document).on('click','.btn-modify-user',function(){
        let id_detalle_usuario = $($(this)[0].parentElement).attr('id');
        console.log(id_detalle_usuario);
        $('#modalEditarCargo div div .modal-footer').attr('id',id_detalle_usuario);
    });

    $(document).on('click','#modalEditarCargo div div .modal-footer .btn-primary', function(){
        let id_detalle_usuario = $($(this)[0].parentElement).attr('id');
        let nuevo_id_cargo = $('#cargos option:selected').attr('value');
        if(nuevo_id_cargo != undefined){
            nuevo_id_cargo = parseInt(nuevo_id_cargo);
            $.ajax({
                url: '',
                type: 'POST',
                data: {id_detalle_usuario,nuevo_id_cargo},
                success: function(response){
                    if(response.includes('OK')){
                        window.alert('Cargo asignado correctamente');
                    }else{
                        window.alert('No se pudo asignar el cargo');
                    }
                }
            });
        }else{
            window.alert('Elija una opción por favor');
        }
    });

    function verEmpleados(){
        
        $('#seccionMesero div').remove();
        $('#seccionCocinero div').remove();
        $('#seccionCajero div').remove();
        $('#seccionSinCargo div').remove();

        $.ajax({
            url: '../model/get_users.php',
            type: 'POST',
            data: {
                id: parseInt(sessionStorage.getItem('id_usuario'))
            },
            success: function(response){
                let json = JSON.parse(response);
                console.log(json);
                let elemento = ``;
                let estado;
                json.forEach(empleado=>{
                    switch(parseInt(empleado.status)){
                        case 1:
                            estado = `<p class="card-text text-center alert-success">Activo</p>`;
                            break;
                        case 0:
                            estado = `<p class="card-text text-center alert-danger">Inactivo</p>`;
                            break;
                    }
                    elemento = `
                    <div class="card col-3 mr-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${empleado.nombre} ${empleado.apellidos}</h5>
                            ${estado}
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Edad de ${empleado.edad} años</li>
                            <li class="list-group-item">Correo Electrónico: ${empleado.email}</li>
                            <li class="list-group-item">Teléfono: ${empleado.telefono}</li>
                        </ul>
                        <div class="card-body text-center" id=${empleado.id_detalle_usuario}>
                            <a class="card-link btn btn-outline-danger btn-delete-user" role="button" data-toggle="tooltip" data-placement="left" title="Eliminar Usuario"><i class="bi bi-x"></i></a>
                            <a class="card-link btn btn-outline-info btn-modify-user" role="button" data-toggle="modal" data-target="#modalEditarCargo" title="Editar Usuario"><i class="bi bi-pencil"></i></a>
                        </div>
                    </div>
                    `;
                    switch(parseInt(empleado.id_cargo)){
                        case 2:
                            $('#seccionMesero').append(elemento);
                            break;
                        case 3:
                            $('#seccionCocinero').append(elemento);
                            break;
                        case 4:
                            $('#seccionCajero').append(elemento);
                            break;
                        case 5:
                            $('#seccionSinCargo').append(elemento);
                            break;
                    }
                });
            }
        });
    }

    function borrarEmpleado(id){
        $.ajax({
            url: '../model/delete_user.php',
            type: 'POST',
            data: {id},
            success: function(respuesta){
                if(!respuesta.includes('!')){
                    verEmpleados();
                    alert('Empleado borrado con éxito. ');
                }else{
                    alert('No se eliminó al empleado. ');
                }
            }
        });
    }

    function extraerCargos(){

        $.ajax({
            url: '../model/get_cargos.php',
            type: 'GET',
            success: function(response){
                
                cargos = JSON.parse(response);

                let plantilla = `<div class="input-group mb-3"><div class="input-group-prepend"><label class="input-group-text" for="cargos">Cargos Disponibles</label></div>`;
                let select=`<select class="custom-select" id="cargos"><option selected>Elija una opción</option>`;

                cargos.forEach(cargo=>{
                    select+=`<option value="${cargo.id_cargo}">${cargo.nombre}</option>`;
                });

                select+=`</select>`;

                plantilla+=select+`</div>`;

                $('#modalEditarCargo div div .modal-body').html(plantilla);

            }
        });


    }

});