$('#chat').hide();
$("#btn-chat").click(function(){
	if($('#chat').css('display') == 'none'){
		$("#editor-screen").removeClass("col-12");
  		$("#editor-screen").addClass("col-9");
  		$('#chat').show();
  		console.log("Se muestra chat");
	}else{
		$("#editor-screen").removeClass("col-9");
  		$("#editor-screen").addClass("col-12");
  		$('#chat').hide();
  		console.log("Se esconde chat");
	}
	
});
