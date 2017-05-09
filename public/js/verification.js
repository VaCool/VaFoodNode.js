
function verification (client_id, verification){
        $.ajax({
            url: "/verification",
            method: "POST",
            async: false,
            data:  
            {
                client_id:  client_id,
                verification:  verification,
            }
    }).then(function(res) {
        alert(res);
		return true;
    }); 
}