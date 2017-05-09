var massIdButtons = ['li1','li2', 'li3','li4', 'li5', 'li6', 'li7'];
var computedStyle = getComputedStyle(document.body); // не понимаю почему работает
document.getElementById('li1').style.backgroundColor = "#ffe714";
$('#workspace').load('./home.html');

$(document).ready(function() {

	if(localStorage.getItem("login") !== null){
		$("#buttonLogin").hide();
    	$("#buttonSingUp").hide(); 
     	$("#buttonExit").show();
	}

	var li1 = $('#li1');
 	var li2 = $('#li2');
 	var li3 = $('#li3');
 	var li4 = $('#li4');
 	var li5 = $('#li5');
 	var li6 = $('#li6');
 	var li7 = $('#li7');

	li1.click(function(event){ 
		changeColorUl("li1");
	});

	li2.click(function(event){ 
		changeColorUl("li2");
	});

	li3.click(function(event){ 
		changeColorUl("li3");
	});

	li4.click(function(event){ 
		changeColorUl("li4");
	});

	li5.click(function(event){ 
		changeColorUl("li5");
	});

	li6.click(function(event){ 
		changeColorUl("li6");
	});

	li7.click(function(event){ 
		changeColorUl("li7");
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} 
		else {
			$('.scrollup').fadeOut();
		}
	});
 





 
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	var close = $('.modal_close, .overlay');
	var buttonLogin = $('#buttonLogin, #login');
	var buttonSingUp = $('#buttonSingUp, #signUp');
	var saveSignUp = $('#saveSignUp');
	var saveLogin = $('#saveLogin');
	var buttonExit = $('#buttonExit');


    var modal = $('.modal_div'); 

	buttonLogin.click( function(event){ 
        openModal($('#loginModal'));
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        $('#login').parent().css({"background":"#826464", "border-bottom-right-radius":"20px", "border-top-right-radius":"20px" }); 
        $('#signUp').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 


    });

	buttonSingUp.click( function(event){ 
        openModal($('#loginModal'));
        $('#forLogin').hide(); 
        $('#forsignUp').show();
        $('#signUp').parent().css({"background":"#826464", "border-bottom-left-radius":"20px", "border-top-left-radius":"20px"}); 
        $('#login').parent().css({"background":"#4c2c2c", "border-radius:":"none" }); 

    });

  	close.click( function(){ 
        closeModal(modal);
    });

	buttonExit.click( function(event){ 
    	$("#buttonLogin").show();
    	$("#buttonSingUp").show(); 
    	$("#buttonExit").hide(); 
    	localStorage.clear(); 
    });

  	saveSignUp.click( function(){ 
  		if($("#forsignUp").find("input[name ='name']").val() == "" || $("#forsignUp").find("input[name ='login']").val() == "" ||
  		   $("#forsignUp").find("input[name ='password']").val() == "" || $("#forsignUp").find("input[name ='repeatPassword']").val() == "" ||
  		   $("#forsignUp").find("input[name ='email']").val() == "" || $("#forsignUp").find("input[name ='phone']").val() == "380"){
  		alert("Не все поля заполнины!");
		}
		else{
  			if($("#forsignUp").find("input[name ='password']").val()===$("#forsignUp").find("input[name ='repeatPassword']").val()){
  				var now = new Date();
  				$.ajax({
            		url: "/registration",
            		method: "POST",
            		data:  
            			{
                			name:  $("#forsignUp").find("input[name ='name']").val(),
                			login:  $("#forsignUp").find("input[name ='login']").val(),
                			password:  $("#forsignUp").find("input[name ='password']").val(),
                			email: $("#forsignUp").find("input[name ='email']").val(),
                			phone:  $("#forsignUp").find("input[name ='phone']").val(),
                			verification: window.btoa("" + now.getFullYear() + now.getMonth() + now.getHours() + now.getDate() + 
                				 		  now.getMinutes() + now.getSeconds() + now.getMilliseconds()),
            			}
    				}).then(function(res) {
        				alert(res);
        				if(res != "Пользователь с таким логином уже сущестует!"){
        					closeModal(modal);
        				}
    				});
  				}
  			else{
  				alert("Введенные пароли не совпадают!");
  			}
  		}
    });

  	saveLogin.click( function(){ 
  		$.ajax({
        	url: "/login",
            method: "POST",
            data:  
            	{
                	login:  $("#forLogin").find("input[name ='login']").val(),
                	password:  $("#forLogin").find("input[name ='password']").val(),
            	}
    		 }).then(function(res) {
    		 	if(res == "Не верно введен логин или пароль!"){
    		 		alert(res);
    		 	}
    		 	else{
    		 	res.forEach(function(pizza) {
            	var login = pizza.login;
            	var password = pizza.password;
            	var verification  = pizza.verification;
            	var rights = pizza.rights;
            	var name = pizza.name;
            	var client_id = pizza.client_id;
        		localStorage.setItem("login", login);
    		 	localStorage.setItem("password", password);
    		 	localStorage.setItem("verification", verification);
    		 	localStorage.setItem("rights", rights);
    		 	localStorage.setItem("name", name);
    		 	localStorage.setItem("client_id", client_id);
    		 	$("#buttonLogin").hide();
    		 	$("#buttonSingUp").hide(); 
    		 	$("#buttonExit").show();
    		 	closeModal(modal);
    			});  	
    		}
  				
		});
	});
















	$('.navbar li a').hover(
		function(e) {
			$(this).stop().animate({ marginTop: -50}, 100);
		},
		function(e) {
			$(this).stop().animate({ marginTop: 0}, 100);
		});
	});

	function changeColorUl(element){
		var id = element;
		for(var i = 0; i < massIdButtons.length; i++) {
			document.getElementById(massIdButtons[i]).style = computedStyle;
		}
	document.getElementById(id).style.backgroundColor = "#ffe714";
	switch(id) {
		case 'li1':  
			$('#workspace').load('./home.html');
    		break;
		case 'li2':  
			$('#workspace').load('./pizza.html');
    		break;
   	 	case 'li3':  
			$('#workspace').load('./paste.html');
    		break;
    	case 'li4':  
			$('#workspace').load('./risotto.html');
    		break;
    	case 'li5':  
			$('#workspace').load('./dessert.html');
    		break;
    	case 'li6':  
			$('#workspace').load('./reviews.html');
    		break;
    	case 'li7':  
			$('#workspace').load('./basket.html');
    		break;

 		default:
			break;
	}

}




