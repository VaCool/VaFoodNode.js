    var modalId;
$(document).ready(function() { // зaпускaем скрипт пoсле зaгрузки всех элементoв
    getPizza();
    function getPizza(){
        $.ajax({
            url: "/pizza",
            method: "GET"
        }).then(function(pizzaGallery) {
            var $pizzaWrapper = $("#menu");
            pizzaGallery.forEach(function(pizza) {
                var $pizzaTemplate = $("#template > div").clone();
                $pizzaTemplate.find("[data-class]").attr("class","category " + pizza.categories);
                $pizzaTemplate.find("[data-id]").attr("href","#" + pizza.pizza_id);
                $pizzaTemplate.find("[data-url-small]").attr("src", pizza.URL);
                $pizzaTemplate.find("[data-name-first]").text(pizza.name);
                $pizzaTemplate.find("[data-weight]").text(pizza.weight);
                $pizzaTemplate.find("[data-price]").text(pizza.price);
                $pizzaTemplate.find("[data-link]").attr("id",pizza.pizza_id);
                $pizzaTemplate.find("[data-url-big]").attr("src", pizza.URL);          
                $pizzaTemplate.find("[data-name-second]").text(pizza.name);
                $pizzaTemplate.find("[data-consist]").text(pizza.consist);              
                $pizzaWrapper.append($pizzaTemplate);
        });

        if(localStorage.getItem("rights") === "admin"){
            $(".change").show();
            $(".add").show();
            $(".del").show();
        }
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, .overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa

    var massId = new Array();
    var massIdModal = new Array();
    var massIdElements = new Array();

    $(".open_modal").each(function (i) {
        massId.push($(this).attr('href'));  // (#1,#2,#3 создаем массив href елементов из класа open_modal       
    });
    massId.pop();


    $(".modal_div").each(function (i) {
        massIdModal.push($(this).attr('id')); // (1,2,3 //создаем массив id елементов из класа open_modal  
    });
    massIdModal.pop();

    var fp_next = $('.fp_next');
    var fp_prev = $('.fp_prev');
    var del = $('.del');
    var add = $('.add');
    var download = $('.download');
    var change = $('.change');
    var saveChange = $('.saveChange');
    var modal = $('.modal_div'); 
    var buy = $('.buy'); 


    fp_next.click(function(event){       // переключаем на следующую картинку
        var id = $.inArray($(this).parent().attr('id'), massIdModal);  // ищем в массиве id родительського div и записываем за переменной id его номер в массиве
        $(massId[id]).hide();  // прячем текущее модальное окно
        if(id==massId.length-1){  // проверяем или последний елемент
            id=-1;
        }
        var div = massId[id+1];
        openModal(div);
    });    

    fp_prev.click(function(event){       // переключаем на предыдущую картинку
        var id = $.inArray($(this).parent().attr('id'), massIdModal); 
        $(massId[id]).hide();
        if(id==0){
            id=massId.length;
        }
        var div = massId[id-1];
        openModal(div);
    });    

    open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
        event.preventDefault(); // вырубaем стaндaртнoе пoведение
        var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
        alert(div);
        openModal(div);
    });

    close.click( function(){ // лoвим клик пo крестику или oверлэю
        closeModal(modal);
    });

buy.click(function(event){ 
    if(localStorage.getItem("login") !== null){
        var buyName = $("#category").find("h1").text() + ' "' + $(this).parent().find("[data-name-second]").text() + '"';
        var buyWeight = $(this).parent().parent().find("[data-weight]").text();
        var buyPrice = $(this).parent().parent().find("[data-price]").text();
        var buyURL = $(this).parent().parent().find("[data-url-small]").attr("src");
        alert(buyURL);


        if(localStorage.getItem("buyName") !== null){
            if(localStorage.getItem("buyName").indexOf(buyName) + 1) {
                alert("Заказ уже был добавлен в корзину");
         
            }
            else{
                localStorage.setItem("buyName", localStorage.getItem("buyName") + "," + buyName);
                localStorage.setItem("buyWeight", localStorage.getItem("buyWeight") + "," + buyWeight);
                localStorage.setItem("buyPrice", localStorage.getItem("buyPrice") + "," + buyPrice);
                localStorage.setItem("buyURL", localStorage.getItem("buyURL") + "," + buyURL);
                localStorage.setItem("quantity", localStorage.getItem("quantity") + "," + "1");
            }
        }
        else{
            localStorage.setItem("buyName", buyName);
            localStorage.setItem("buyWeight", buyWeight);
            localStorage.setItem("buyPrice", buyPrice);
            localStorage.setItem("buyURL", buyURL);
            localStorage.setItem("quantity", "1"); 
        }
    }
    else{
        $('#forsignUp').hide(); 
        $('#forLogin').show();
        openModal("#loginModal");
    }
});

del.click(function(event){ 
    if(verification(localStorage.getItem("client_id"), localStorage.getItem("verification"))){
         $(this).parent().parent().parent().remove();
   alert($(this).parent().parent().find('.modal_div').attr('id'));
  $.ajax({
        url: "/delpizza",
        method: "POST",
        data:  
        {
            pizza_id: $(this).parent().parent().find('.modal_div').attr('id'),
            URL: "./public/img/pizza/" + $(this).parent().parent().parent().find('img')[1].src.split("/img/pizza/")[1],
        }
    });   
    }
   else{
        return;
   }
});    

download.click(function(event){
    if(verification(localStorage.getItem("client_id"), localStorage.getItem("verification"))){
            var check = "all";
    if ($("input[name='first']").prop('checked')){
        check = check + " " + "first";
    }
     if ($("input[name='second']").prop('checked')){
        check = check + " " + "second";
    }   
    if ($("input[name='popular']").prop('checked')){
        check = check + " " + "popular";
    }
    if ($("input[name='new']").prop('checked')){
        check = check + " " + "new";
    }
$.ajax({
        url: "/uploadPizza",
        method: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data:  new FormData(jQuery('#uploadForm')[0])
    }).then(function(res) {
        alert("Данные записаны успешно!");
        closeModal(modal);
    });
    }
    else{
        alert("Ошибка доступа");
        return;
    }
}); 

change.click(function(event){ 
    if(verification(localStorage.getItem("client_id"), localStorage.getItem("verification"))){
        openModal("#change");
    modalId = $(this).parent().parent().parent().find('.modal_div').attr('id');
    $("#change").find("input[name ='name']").val($(this).parent().parent().find("[data-name-first]").text());
    $("#change").find("input[name ='weight']").val($(this).parent().parent().find("[data-weight]").text());
    $("#change").find("input[name ='price']").val($(this).parent().parent().find("[data-price]").text());
    $("#change").find("textarea[name ='consist']").val($(this).parent().parent().find("[data-consist]").text());
    className = $(this).parent().parent().parent().find("[data-class]").attr("class");

    if(className.indexOf('first') + 1) {
        $("#change").find("input[name ='first']").attr("checked","checked");
    }
    if(className.indexOf('second') + 1) {
        $("#change").find("input[name ='second']").attr("checked","checked");
    }
    if(className.indexOf('popular') + 1) {
        $("#change").find("input[name ='popular']").attr("checked","checked");
    }
    if(className.indexOf('new') + 1) {
        $("#change").find("input[name ='new']").attr("checked","checked");
    }
    }
    else{
        alert("Ошибка доступа");
        return;
    }


    
}); 


saveChange.click(function(event){

    var check = "all";
    if ($("#change").find("input[name='first']").prop('checked')){
        check = check + " " + "first";
    }
     if ($("#change").find("input[name='second']").prop('checked')){
        check = check + " " + "second";
    }   
    if ($("#change").find("input[name='popular']").prop('checked')){
        check = check + " " + "popular";
    }
    if ($("#change").find("input[name='new']").prop('checked')){
        check = check + " " + "new";
    }

        $.ajax({
            url: "/pizzaChange",
            method: "POST",
            data:  
            {
                pizza_id: modalId,
                name:  $("#change").find("input[name ='name']").val(),
                weight:  $("#change").find("input[name ='weight']").val(),
                price: $("#change").find("input[name ='price']").val(),
                consist:  $("#change").find("textarea[name ='consist']").val(),
                categories: check,
            }
    }).then(function(res) {
        alert("Данные записаны успешно!");
        closeModal(modal);
    }); 


}); 

add.click(function(event){
    alert("hi");
    openModal("#add");
}); 


    });
}

















 








});