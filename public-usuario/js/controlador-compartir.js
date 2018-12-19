//////////Context Menu
// Antes de mostrar menu
$(document).bind("contextmenu", function (event) {


    $(event.target).trigger('click');
    
    // Mostar contextmenu
    if(event.target.matches('.subfolder *')){
      // Elimina el real
        event.preventDefault();
      console.log('Muestra Context menu');
       $(".custom-menu").finish().show(100).
      
    // En la posicion del mouse
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });

    }
   
});

// Cuando se da click
$(document).bind("mousedown", function (e) {
    
    // Si se da clic fuera del menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        
        // Esconder menu
        $(".custom-menu").hide(100);
    }
});


// Si se da click al menu
$(".custom-menu li").click(function(){
    
    // El nombre de la accion
    switch($(this).attr("data-action")) {
        
        // Caso para cada accion
        case "share": showShareModal();break;
        case "rename": showNameModal(); break;
        
    }
  
    // Esconder menu
    $(".custom-menu").hide(100);
  });
/////////////////Fin Context de Menu///////////////////
//////Share
function showShareModal(){
  $('#modal-compartir').modal('toggle');
}
///Validar correo para compartir
$( "#email-compartir" ).keyup(function(){
  if ( validarCampoVacio("email-compartir")){
    $( "#btn-compartir" ).prop( "disabled", false);
  }else{
    $( "#btn-compartir" ).prop( "disabled", true );
}
});

$("#btn-compartir").click(function(){
  $('#modal-compartir').modal('toggle');
  if ( validarCampoVacio("email-compartir")){
        var parametros = "correo="+$("#email-compartir").val() + "&"+
                        "id_carpeta="+$('#prev-selected').val();
    $.ajax({
      url:"/compartir",
      method:"POST",
      data: parametros,
      dataType:"json",
      success:function(response){
        if (response.affectedRows==1){
          console.log("Se compartio la carpeta");
        }else{
          console.log("No existe un usuario con esa carpeta o la carpeta ya estaba compartida");
        }
      }
    });
    
  }
});
////////////////////
function showNameModal(){
  $('#modal-nombre').modal('toggle');  
}

function validarCampoVacio(id){
    if (document.getElementById(id).value==""){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return false;
    } else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
        return true;
    }
}