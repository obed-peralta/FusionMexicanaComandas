$(document).ready(function(){

    let li_btn_inicio = $('#btn-inicio')[0].parentElement;
    let li_btn_empleados = $('#btn-empleados')[0].parentElement;
    let li_btn_comandas = $('#btn-comandas')[0].parentElement;
    let li_btn_ventas = $('#btn-ventas')[0].parentElement;

    $('#containerEmpleados').hide();
    $('#containerComandas').hide();
    $('#containerVentas').hide();

    console.log('tools.js its working');

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

    function verEmpleados(){
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
                json.forEach(empleado=>{
                    elemento = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${empleado.nombre} ${empleado.apellidos}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Edad de ${empleado.edad} años</li>
                            <li class="list-group-item">Correo Electrónico: ${empleado.email}</li>
                            <li class="list-group-item">Teléfono: ${empleado.telefono}</li>
                        </ul>
                        <div class="card-body">
                            <a class="card-link btn-outline-danger" role="button"><i class="bi bi-x"></i></a>
                            <a class="card-link btn-outline-info" role="button"><i class="bi bi-info"></i></a>
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
                    }
                });
            }
        });
    }

});