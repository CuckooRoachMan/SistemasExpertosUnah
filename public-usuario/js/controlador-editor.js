$(document).ready(function(){
	 cargarCodigo();
});

function cargarCodigo(){
	$.ajax({
            url:"/obtener-archivo",
            method:"POST",
            dataType:"json",
            success:function(respuesta){
            	$("#lb-nombre-archivo").html(respuesta.nombre_archivo);
            	var editor= ace.edit("editor");
            	var filename= respuesta.nombre_archivo;
            	var modelist = ace.require("ace/ext/modelist")
				var mode = modelist.getModeForPath(filename).mode;
				editor.session.setMode(mode) ;// mode now contains "ace/mode/javascript".
            	editor.setTheme("ace/theme/cobalt");
				editor.setValue(respuesta.contenido);

            }
        });
}

$("#btn-save-code").click(function(){
    var editor = ace.edit("editor");
    var parametros = "contenido="+editor.getValue();
    
	$.ajax({
		url:"/guardar-archivo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				console.log('Se guardo');
			}
			console.log(respuesta);
			
		}
	});
});
