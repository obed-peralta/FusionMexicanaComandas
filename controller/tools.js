$(document).ready(function(){

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
        continuar = false;
    });

    // Click en botón inicio
    $(document).on('click','#btn-inicio',function(){
        continuar = true;
        $('#containerEmpleados').hide();
        $('#containerComandas').hide();
        $('#containerVentas').hide();
        $('#containerInicio').show();
    });

});