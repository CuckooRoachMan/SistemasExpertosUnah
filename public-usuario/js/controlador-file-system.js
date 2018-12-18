$(document).ready(function(){
  loadFileSystem();
  $('#folder').val(0);
});


///Si cambia de valor la carpeta
$('#folder').change(function(){
  loadFileSystem();
});
function loadFileSystem(){
  if($('#folder').val()==0){
    loadHomeRoot();
  }else if($('#folder').val()==-1){
    loadSharedFolders();
  }else{
    loadSubfolders();
  }
}
function loadSharedFolders(){
//cargar aqui la tabla de compartidos
}
function loadSubfolders(){
  //primero carga las carpetas
  loadFolders();
  //carga los archivos
  loadFiles();

}
function loadHomeRoot() {
$.ajax({
    url:"/cargar-root",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
      console.log("cargar archivos");
      console.log(respuesta);
        $("#file-system").html("");
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_carpetas_pk}" data-value="${respuesta[i].txt_nombre_carpetas}"
                        onclick="select(this.id);" ondblclick="openFolder(this.id);";>
                    <div class="col-3 flex-centered">
                      <center><i  class="${cssClass}"></i></center>
                    </div>
                    <div class="col-9 jc-flex-start-center"  title="${respuesta[i].txt_nombre_carpetas}">
                      <div class="text-overflow">${respuesta[i].txt_nombre_carpetas}</div>
                    </div>
              </div>
              <!--End of File-->
              `
              );

            }
      }
    });

}

function loadFolders(){
  //Cargar aqui lo de la tabla subcarpetas     //trabajado
  var parametros ="parentFolder="+$('#folder').val();
  $.ajax({
    url:"/obtener-subcarpetas",
    method:"POST",
    data: parametros,
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
        $("#file-system").html("");
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_subcarpetas_pk}" data-value="${respuesta[i].txt_nombre_subcarpetas}"
                        onclick="select(this.id);" ondblclick="openFolder(this.id);";>
                    <div class="col-3 flex-centered">
                      <center><i  class="${cssClass}"></i></center>
                    </div>
                    <div class="col-9 jc-flex-start-center"  title="${respuesta[i].txt_nombre_subcarpetas}">
                      <div class="text-overflow">${respuesta[i].txt_nombre_subcarpetas}</div>
                    </div>
              </div>
              <!--End of File-->
              `
              );

            }
      }
    });
}
function loadFiles(){
  //Cargar aqui lo de la tabla archivo
var parametros ="parentFolder="+$('#folder').val();

$.ajax({
    url:"/obtener-archivos",
    method:"POST",
    data: parametros,
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
        $("#file-system").html("");
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-file-code";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_archivos_pk}" data-value="${respuesta[i].txt_nombre_archivos}"
                        onclick="select(this.id);" ondblclick="openFile(this.id);";>
                    <div class="col-3 flex-centered">
                      <center><i  class="${cssClass}"></i></center>
                    </div>
                    <div class="col-9 jc-flex-start-center"  title="${respuesta[i].txt_nombre_archivos}">
                      <div class="text-overflow">${respuesta[i].txt_nombre_archivos}</div>
                    </div>
              </div>
              <!--End of File-->
              `
              );

            }
      }
    });
}

function select(id){
  if($('#prev-selected').val()!=''){
    var id_prev_selected=$('#prev-selected').val();
    //console.log(id_prev_selected);
     id_prev_selected ='#'+id_prev_selected;
    $(id_prev_selected).css('background-color', '#FFF');
  //console.log(id_prev_selected);
  }
  var id_format ='#'+id;
  //console.log(id_format);
  $(id_format).css('background-color', '#c9f6e9');
  $('#prev-selected').val(id);
  console.log(id);
}

function openFile(id){
  var file = $('#prev-selected').val();
        var parametros = "file="+file;
    $.ajax({
      url:"/obtener-codigo",
      method:"POST",
      data: parametros,
      dataType:"json",
      success:function(response){
        console.log(response);
        window.location = "editor.html";
      }

    });

}
function openFolder(id){
  $('#prev-folder').val($('#folder').val());
    console.log('Id'+$('#'+id).val());
    $('#folder').val(id).trigger('change');
    console.log($('#folder').val());

}
$(document).ready(function(){
  loadFileSystem();
  $('#folder').val(0);//Se carga inicialmente la carpeta root

});

$("#btn-new-file").click(function(){
  $('#modal-nuevo-archivo').modal('toggle');
});
$("#btn-new-folder").click(function(){
  $('#modal-nueva-carpeta').modal('toggle');
});
$("#btn-crear-carpeta").click(function(){
  ///Crear nueva carpeta
});
$("#btn-crear-archivo").click(function(){
  ///Crear nuevo archivo
});
