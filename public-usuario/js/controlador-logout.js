$("#btn-logout").click(function(){	
	$.ajax({
		url:"/logout",
		method:"GET",
		dataType:"json",
		success:function(response){
			//$("body").hide(); 
			window.location = "login.html";
		}

		
	});
});