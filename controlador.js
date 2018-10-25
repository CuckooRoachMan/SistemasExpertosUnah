var db;

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
