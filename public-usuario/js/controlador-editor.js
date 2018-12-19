$(document).ready(function(){
	 cargarCodigo();
});

function cargarCodigo(){
	$.ajax({
            url:"/obtener-codigo",
            method:"POST",
            dataType:"json",
            success:function(respuesta){
            	respuesta=respuesta[0];
            	console.log(respuesta);
            	$("#lb-filename").html(respuesta.txt_nombre_archivos);
            	var editor= ace.edit("editor");
            	var filename= respuesta.txt_nombre_archivos;
            	console.log(filename);
            	console.log(respuesta.txt_nombre_archivos);
            	
            	var modelist = ace.require("ace/ext/modelist")
				var mode = modelist.getModeForPath(filename).mode;
				editor.session.setMode(mode) ;// mode now contains "ace/mode/javascript".
            	editor.setTheme("ace/theme/pacific");
				editor.setValue(respuesta.txt_contenido_archivos);

            }
        });
}

$("#btn-save-code").click(function(){
    var editor = ace.edit("editor");
    var parametros = "contenido="+editor.getValue();
    
	$.ajax({
		url:"/editar-archivo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				console.log('Se edito el archivo');
			}
			console.log(respuesta);
			
		}
	});
});
