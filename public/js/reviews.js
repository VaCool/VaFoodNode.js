

$(document).ready(function() {
var send = $('#send'); 
var $booksWrapper = $("#reviews");

     $.ajax({
        url: "/vote",
        method: "GET"
    }).then(function(Reviews) {
        console.log(Reviews);
        

        Reviews.forEach(function(Review) {
            var $bookTemplate = $("#template > div").clone();
    
            $bookTemplate.find("[data-name]").text(Review.name);
            $bookTemplate.find("[data-date]").text(Review.date.split("T")[0] + "," + Review.date.split("T")[1].split(".000Z")[0]);
            $bookTemplate.find("[data-review]").text(Review.review);


            $booksWrapper.prepend($bookTemplate);
        });
    })



send.click(function(event){
    if(localStorage.getItem("login") !== null){
        if($('textarea').val().length < 25){
            alert("Отзыв должен состоять не менее чем из 25 символов");
        }
        else{

            alert($('textarea').val());

                $.ajax({
                    url: "/sendreviews",
                    method: "POST",
                    data:  
                        {
                            client_id:  localStorage.getItem("client_id"),
                            review: $('textarea').val(),
                        }
                }).then(function(res) {
                    alert(res);
                    var $bookTemplate = $("#template > div").clone();
                    $bookTemplate.find("[data-name]").text(localStorage.getItem("login"));
                    $bookTemplate.find("[data-date]").text("Только что");
                    $bookTemplate.find("[data-review]").text($('textarea').val());
                    $booksWrapper.prepend($bookTemplate);
                });
        }
    }
    else{
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        openModal("#loginModal");
    }
});  


     
});








