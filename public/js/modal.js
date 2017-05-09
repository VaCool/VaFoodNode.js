var overlay = $('.overlay');


function closeModal(modal){
	modal .animate({opacity: 0, top: '45%'}, 200, function(){ 
		$(this).css('display', 'none');
		overlay.fadeOut(400); 
	});
}

function openModal(div){
	overlay.fadeIn(400, function(){ 
		$(div) .css('display', 'block') .animate({opacity: 1, top: '50%'}, 0);
	});
}
