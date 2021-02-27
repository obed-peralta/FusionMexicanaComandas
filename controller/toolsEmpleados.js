$(document).ready(function(){

    let li_btn_inicio = $('#btn-inicio')[0].parentElement;
    let li_btn_empleados = $('#btn-empleados')[0].parentElement;
    let li_btn_comandas = $('#btn-comandas')[0].parentElement;

    let cargos;

    $('#containerEmpleados').hide();
    $('#containerComandas').hide();

    console.log('tools.js its working');

    extraerCargos();

    // Click en menú comandas
    $(document).on('click','#btn-comandas',function(){
        $('#containerEmpleados').hide();
        $('#containerComandas').show();
        $('#containerInicio').hide();

        $(li_btn_inicio).removeClass('active');
        $(li_btn_empleados).removeClass('active');
        $(li_btn_comandas).addClass('active');

        $.ajax({
            url: '../model/get_comandas_liberadas.php',
            type: 'GET',
            success: function(response){
                $('#containerComandas div').remove();
                let json = JSON.parse(response);
                console.log(json);
                let plantilla = `<div class="row">`;
                json.forEach(venta=>{
                    plantilla += `
                    <div class="card border-dark col-3 mr-2 mb-2 comandas" style="width: 18rem; cursor: pointer;" id="${venta.id_comanda}" data-toggle="modal" data-target="#modalVerComanda">
                        <div class="card-header text-center">
                            Comanda<br>${venta.id_comanda}
                        </div>
                        <div class="card-body">
                            <div class="card-title">Fecha: ${venta.fecha}</div>
                            <div class="card-title">Mesa: ${venta.id_mesa}</div>
                            <div class="card-title">Total: $ ${venta.total}</div>
                            <div class="card-title">Forma de Pago: ${venta.forma_pago}</div>
                        </div>
                    </div>
                    `;
                });
                plantilla += `</div>`;
                $('#containerComandas').append(plantilla);
            }
        });

    });

    // Click en tarjetas de comandas
    $(document).on('click', '.comandas', function(){
        let element = $(this)[0];
        let id = $(element).attr('id');
        $('#modalVerComanda .modal-dialog .modal-content .modal-header .modal-title').text(`Comanda ${id}`);
        id = parseInt(id);
        $.ajax({
            url: '../model/get_comanda_admin.php',
            type: 'POST',
            data: {id},
            success: function(response){
                let json = JSON.parse(response);
                //console.log(json);
                let plantilla = ``;
                let total = 0;
                json.forEach(platillo=>{
                    total += parseInt(platillo.precio) * parseInt(platillo.cantidad);
                    plantilla += `
                        <tr>
                            <th scope="row">${platillo.descripcion}</th>
                            <td class="text-center">${platillo.cantidad}</td>
                            <td class="text-right">$ ${platillo.precio}</td>
                            <td class="text-right">$ ${platillo.precio * platillo.cantidad}</td>
                        </tr>
                    `;
                });
                plantilla += `
                    <tr>
                        <th colspan="3" class="text-right">Total: </th>
                        <th class="text-right">$ ${total}</th>
                    </tr>
                `;
                $('#modalVerComanda .modal-dialog .modal-content .modal-body table tbody').html(plantilla);
            }
        });
    });

    // Cursor entrando en tarjetas de comandas
    $(document).on('mouseenter', '.comandas', function(){
        
        let element = $(this)[0];
        $(element).removeClass('bg-light');
        $(element).addClass('text-white');
        $(element).addClass('bg-info');

    });

    // Cursor saliendo en tarjetas de comandas
    $(document).on('mouseleave', '.comandas', function(){
        
        let element = $(this)[0];
        $(element).removeClass('text-white');
        $(element).removeClass('bg-info');
        $(element).addClass('bg-light');

    });

    // Click en botón empleados
    $(document).on('click', '#btn-empleados',function(){
        $('#containerInicio').hide();
        $('#containerComandas').hide();
        $('#containerEmpleados').show();
        
        $(li_btn_inicio).removeClass('active');
        $(li_btn_empleados).addClass('active');
        $(li_btn_comandas).removeClass('active');

        verEmpleados();
    });

    // Click en botón inicio
    $(document).on('click','#btn-inicio',function(){
        $('#containerEmpleados').hide();
        $('#containerComandas').hide();
        $('#containerInicio').show();

        $(li_btn_inicio).addClass('active');
        $(li_btn_empleados).removeClass('active');
        $(li_btn_comandas).removeClass('active');
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
                url: '../model/update_cargo.php',
                type: 'POST',
                data: {id_detalle_usuario,nuevo_id_cargo},
                success: function(response){
                    if(response.includes('OK')){
                        window.alert('Cargo asignado correctamente');
                        verEmpleados();
                    }else{
                        window.alert(response);
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
