$(function() {

	var newSelection = "";
	
	$("#category a").click(function(){
	

	
		$("#category a").removeClass("current");
		$(this).addClass("current");
		
		newSelection = $(this).attr("rel");
		
		$(".category").not("."+newSelection).slideUp(200);
		$("."+newSelection).slideDown(300);
		

		
	});
	
});