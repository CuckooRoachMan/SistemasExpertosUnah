
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
    url:"/obtener-Carpeta-Root",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
      console.log(respuesta);
        $("#file-system").html("");
            for(var i=0; i<respuesta.length;i++){
                var cssClass="fas fa-folder";
              $("#file-system").append(
                      `<!--File-->
                    <div  class="row file" id="${respuesta[i].id_archivos_pk}" data-value="${respuesta[i].txt_nombre_archivos}"
                        onclick="select(this.id);" ondblclick="open(this.id,'${respuesta[i].tipo_archivo}');";>
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

function loadFolders(){
  //Cargar aqui lo de la tabla subcarpetas
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
                    <div  class="row file" id="${respuesta[i].id_archivos_pk}" data-value="${respuesta[i].txt_nombre_archivos}"
                        onclick="select(this.id);" ondblclick="open(this.id,'${respuesta[i].tipo_archivo}');";>
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
                        onclick="select(this.id);" ondblclick="open(this.id,'${respuesta[i].tipo_archivo}');";>
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

}
function open(id,type){

}