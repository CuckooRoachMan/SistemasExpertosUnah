$("#btn-login").click(function(){
    if (
        validateEmail(document.getElementById("login-email")) &&
        validatePassword("login-password")
    ){

        var parametros = "email="+$("#login-email").val() + "&"+
                        "password="+$("#login-password").val();

        $.ajax({
            url:"/login",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                console.log(parametros);
                console.log(response);
                if (response.txt_email_usuarios == parametros.email){
                    console.log("Login Exitoso");
                    if(response)
                        window.location = "file-system.html";
                    else
                        window.location = "landing.html";
                }else{
                    //console.log(response);
                    console.log("Not logged")
                    $('#alert').show();
                }
            }
        });

    }else{
        validateEmail(document.getElementById("login-email"));
        validatePassword("login-password");
    }

});




function validatePassword(id){
    if (document.getElementById(id).value==" "){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return false;
    } else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
        return true;
    }
}

function validateEmail(etiqueta) {
    if (validatePassword('login-email')== true) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(etiqueta.value)){
            etiqueta.classList.remove("is-invalid");
            etiqueta.classList.add("is-valid");
            document.getElementById("show-feedback-email").innerHTML ="Campo Requerido";
            return true
        } else{
            etiqueta.classList.remove("is-valid");
            etiqueta.classList.add("is-invalid");
            document.getElementById("show-feedback-email").innerHTML ="Formato Incorrecto ";
            return false
        }
    }else{
        return false
    }

}
