function cargarPerfil(){

  $.ajax({
    url:"/cargar-perfil",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
    	respuesta=respuesta[0];
    	console.log(respuesta);
    	console.log( respuesta.txt_nombre_usuarios);
    	$('#nombre-perfil').val(respuesta.txt_nombre_usuarios);
    	$('#apellido-perfil').val(respuesta.txt_apellido_usuarios);
    	$('#email-perfil').val(respuesta.txt_correo_usuarios);

      }
    });
	
}

$(document).ready(function(){
	cargarPerfil();

});