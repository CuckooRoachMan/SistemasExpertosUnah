    $("#btn-registrar").click(function(){

        var parametros= "nombre="+$("#nombre").val() + "&" +
                        "apellido="+$("#apellido").val() + "&" +
                        "dob="+$("#dob").val() + "&" +
                        "email="+$("#email").val() + "&" +
                        "password="+$("#password").val();

        console.log(parametros);
        $.ajax({
            url:"/registrar-usuarios",
            method:"POST",
            data: parametros,
            dataType:"json", //json
            success: function(respuesta){ //200 OK
                console.log(respuesta);
                if(respuesta){
                    window.location = "login.html";
                  }

            }

            //error:function(error){
              //  console.error(error);
            //}
        });
    });
