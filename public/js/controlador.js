var usuarios = [];
var db;

function registrar(){
  var usuario = {

    firstname:document.getElementById(`firstname`).value,
    lastname:document.getElementById(`lastname`).value,
    email:document.getElementById(`email`).value,
    password:document.getElementById(`password`).value,
    birthday:document.getElementById(`birthday`).value
  }

  var transaccion= db.transaction(["usuarios"],"readwrite"); //read readonly
  var objectStoreUsuarios= transaccion.objectStore("usuarios");
  var solicitud= objectStoreUsuarios.add(usuario);

  solicitud.onsuccess = function(evento){
    console.log(`se agrego el usuario`);
    document.getElementById('contenido-tabla').innerHTML="";
    llenarTablaUsuarios();
  }
  solicitud.onerror = function(evento){
    console.log("Ocurrio un error al guardar el usuario");
  }
}

//si el navegador no soporta
(function(){
if(!(`indexedDB` in window)){
  console.err("El navegador no soporta indexedDB");
  return;
}
var solicitud = window.indexedDB.open("facebook", 1);

//si se abrio la base de datos
solicitud.onsuccess = function(evento){
  console.log(`Base de datos abierta exitosamente`);
  db=solicitud.result;
};
// no se pudo abrir la base de datos
solicitud.onerror = function(evento){
  console.err(`No se pudo abrir la base de datos`);
};

//solicitu para actualizar o crear la Base

solicitud.onupgradeneeded = function(evento){
  console.log("Creando base de datos");
  db= evento.target.result; //referencia a la base creada
  var objectStoreUsuarios = db.createObjectStore("usuarios", {keyPath: "codigo", autoIncrement: true});
  objectStoreUsuarios.transaction.oncomplete = function(evento){
    console.log(`Se creo objeto con exito`);

  }
  objectStoreUsuarios.transaction.onerror = function(evento){
    console.log(`Error al crear objeto`);
  }
  //en este punto se debe crear la base de designations
  // es necesario crear almacenes de objetos en la base de datos


}

})();

function llenarTablaUsuarios(){
  var transaccion = db.transaction(["usuarios"],"readonly");
  var objectStoreUsuarios= transaccion.objectStore("usuarios");
  var cursor= objectStoreUsuarios.openCursor();
  cursor.onsuccess = function(evento){
    if(evento.target.result){
      console.log(evento.target.result.value);
      var usuario= evento.target.result.value;
      document.getElementById("contenido-tabla").innerHTML+=
      `
      <tr>
        <td> ${usuario.firstname} </td>
        <td> ${usuario.lastname} </td>
        <td> ${usuario.email} </td>
        <td> ${usuario.birthday} </td>
      </tr>
      `;
      evento.target.result.continue();
    }


  }



}
