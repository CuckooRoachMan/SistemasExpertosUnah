$(document).ready(function(){
  loadFileSystem();
  $('#folder').val(0);
  $('#btn-new-file').hide();
  if($('#premium').val()==1){
    $("#btn-upgrade").hide();
  }
});

///Si cambia de valor la carpeta
$('#folder').change(function(){
  console.log('cambio la carpeta');
  loadFileSystem();
  if ($('#folder').val()==0 || $('#folder').val()==-1) {
    $('#btn-new-file').hide();
  }else{
    $('#btn-new-file').show();
  };
});

function loadFileSystem(){
  if($('#folder').val()==0){
    $("#lb-folder").html("Root");
    loadHomeRoot();
  }else if($('#folder').val()==-1){
    loadSharedFolders();
    $("#lb-folder").html("Compartidos");
  }else{
    loadSubfolders();
    //$("#lb-folder").html("Subcarpeta");
  }
}
function loadSharedFolders(){
  console.log('Se llamo a compartidos');
//cargar aqui la tabla de compartidos
  $.ajax({
    url:"/cargar-compartidos",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
      console.log(respuesta[0]);
        $("#file-system").html("");
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_carpetascompartidas_pk}" data-value="${respuesta[i].txt_nombre_subcarpetas}"
                        onclick="select(this.id);" ondblclick="openFolder(this.id,'${respuesta[i].txt_nombre_subcarpetas}');">
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
function loadSubfolders(){
  $("#file-system").html("");
  //carga las carpetas
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
        $("#file-system").append(
                      `<!--Shared Folder-->
                    <div  class="row file" id="-1" data-value=""
                        onclick="select(this.id);" ondblclick="openFolder(this.id,'Compartidos');">
                    <div class="col-3 flex-centered">
                      <center><i  class="fas fa-folder"></i></center>
                    </div>
                    <div class="col-9 jc-flex-start-center"  title="Compartidos">
                      <div class="text-overflow">Compartidos</div>
                    </div>
              </div>
              <!--End of Folder-->
              `
              );
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_carpetas_pk}" data-value="${respuesta[i].txt_nombre_carpetas}"
                        onclick="select(this.id);" ondblclick="openFolder(this.id,'${respuesta[i].txt_nombre_carpetas}');">
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
        
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file subfolder" id="${respuesta[i].id_subcarpetas_pk}" data-value="${respuesta[i].txt_nombre_subcarpetas}"
                        onclick="select(this.id);" ondblclick="openFolder(this.id,'${respuesta[i].txt_nombre_subcarpetas}');";>
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
       //ob$("#file-system").html("");
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


$("#btn-upgrade").click(function(){
  $('#modal-plan-premium').modal('toggle');
});

$("#btn-adquirir").click(function(){
  $('#modal-plan-premium').modal('toggle');
  $("#btn-upgrade").hide();
  $('#premium').val(1);

});

function openFile(id){
  var file = $('#prev-selected').val();
        var parametros = "file="+file;
    $.ajax({
      url:"/open-file",
      method:"get",
      data: parametros,
      dataType:"json",
      success:function(response){
        console.log(response);
        window.location = "editor.html";
      }

    });

}
function openFolder(id,nombre){
  $("#lb-folder").html(nombre);
  console.log(nombre);
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

  if ( validarCampoVacio("txt-new-folder")){
      if ($('#folder').val() == 0) {
        var parametros = "nombre="+$("#txt-new-folder").val();
    
        //se crean carpetas porque se encuentra en Root
          $.ajax({
                url:"/crear-carpeta",
                method:"POST",
                data: parametros,
                dataType:"json",
                success:function(response){
                  console.log(response);
                  if (response.affectedRows==1){
                          loadFileSystem();//Se vuelve a cargar el sistema

                  }
                }
          });

      }else{
        //se crean subcarpetas
        var parametros = "nombre="+$("#txt-new-folder").val() + "&"+
                        "id="+$('#folder').val();
        $.ajax({
          ///crea subcarpeta
                url:"/crear-subcarpeta",
                method:"POST",
                data: parametros,
                dataType:"json",
                success:function(response){
                  console.log(response);
                  if (response.affectedRows==1){
                         
                          loadFileSystem();//Se vuelve a cargar el sistema

                  }
                }
          });
    
      }
      
    
  }
  $('#modal-nueva-carpeta').modal('toggle');
});




$("#btn-crear-archivo").click(function(){
  if ( validarCampoVacio("txt-new-file")){
      ///Crear nuevo archivo
        var parametros = "nombre="+$("#txt-new-file").val() + "&"+
                        "id="+$('#folder').val();
        $.ajax({
          ///crea subcarpeta
                url:"/crear-archivo",
                method:"POST",
                data: parametros,
                dataType:"json",
                success:function(response){
                  console.log(response);
                  if (response.affectedRows==1){
                         
                          loadFileSystem();//Se vuelve a cargar el sistema

                  }
                }
          });
          $('#modal-nuevo-archivo').modal('toggle');
  }
  
});
//Cargar Compartidos
function openShared(){
    $('#prev-folder').val($('#folder').val());
    console.log('Id'+$('#'+id).val());
    $('#folder').val(id).trigger('change');
    console.log($('#folder').val());

}

////Validar Campos Vacios
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


