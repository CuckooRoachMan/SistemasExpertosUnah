function loadhomeroot() {

  var parametros=null;
  ajax({
    url: "/load-file-system-root",
    method:"POST",
    data:parametros,
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
      $('#file-show').val(respuesta.file);
    }
  })


  $(  ).ready(function() {
      console.log( "ready!" );
  });





};
