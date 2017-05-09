var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var namefile;

var storageOfPizza = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/Pizza/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        namefile = "img/pizza/" + file.originalname;
    }
});

var storageOfPaste = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/paste/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        namefile = "img/paste/" + file.originalname;
    }
});

var storageOfRisotto = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/risotto/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        namefile = "img/risotto/" + file.originalname;
    }
});

var storageOfDessert = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/dessert/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        namefile = "img/dessert/" + file.originalname;
    }
});

var uploadPizza = multer({ storage: storageOfPizza });
var uploadPaste = multer({ storage: storageOfPaste });
var uploadRisotto = multer({ storage: storageOfRisotto });
var uploadDessert = multer({ storage: storageOfDessert });
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("public"));
app.listen(3000);
console.log('server is start');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  	host     : 'localhost',
 	user     : 'root',
  	password : '19911812',
  	database : 'vafood'
});






/// пицца
app.get('/pizza', function (req, res, next) {
  connection.query('SELECT *  FROM pizza;', 
  function (error, results, fields) {
     if (error) throw error;
	   res.send(results);
  });
});




app.post('/delpizza', function (req, res) {
	fs.unlink(req.body.URL, function (err) {
    if (err) throw err;
    console.log("file deleted");
  });
  connection.query("DELETE FROM `pizza` WHERE `pizza_id`=" + req.body.pizza_id + ";", 
  function (error, results, fields) {
  	if (error) throw error;
  });
});

app.post('/uploadPizza', uploadPizza.single('fileupload-input'), function(req, res, next) {
	var categories = "all ";
	if(req.body.first == "on"){
		categories = categories + " " + "first";
	}
  if (req.body.second == "on"){
    categories = categories + " " + "second";
  }
  if (req.body.popular == "on"){
    categories = categories + " " + "popular";
  }   
  if (req.body.new == "on"){
    categories = categories + " " + "new";
  }
	connection.query("INSERT INTO pizza VALUES(NULL, '" + req.body.name + "', '" + req.body.weight + "', '" + 
	                 req.body.price + "', '" + namefile + "', '" + req.body.consist + "', '" + categories + "');", 
  function (error, results, fields) {
  	if (error) throw error;
  });
  res.send('ok')
});

app.post('/pizzaChange', function (req, res) {
  connection.query("UPDATE pizza  SET  name = '" + req.body.name + "', weight = '" + req.body.weight + "', price = '" + 
                   req.body.price + "', consist = '" + req.body.consist +"', categories = '" + req.body.categories + 
                   "' WHERE pizza_id = " + req.body.pizza_id +";", 
  function (error, results, fields) {
    if (error) throw error;
  });
   res.send('ok')
});

/// конец пиццы







// паста
app.get('/paste', function (req, res, next) {
  connection.query('SELECT *  FROM paste;', 
  function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});


app.post('/delpaste', function (req, res) {
  fs.unlink(req.body.URL, function (err) {
  if (err) throw err;
    console.log("file deleted");
  });
  connection.query("DELETE FROM `paste` WHERE `paste_id`=" + req.body.paste_id + ";", 
  function (error, results, fields) {
    if (error) throw error;
  });
});

app.post('/uploadpaste', uploadPaste.single('fileupload-input'), function(req, res, next) {
  var categories = "all ";
  if(req.body.first == "on"){
    categories = categories + " " + "first";
  }
  if (req.body.second == "on"){
    categories = categories + " " + "second";
  }
  if (req.body.popular == "on"){
    categories = categories + " " + "popular";
  }   
  if (req.body.new == "on"){
    categories = categories + " " + "new";
  }
  connection.query("INSERT INTO paste VALUES(NULL, '" + req.body.name + "', '" + req.body.weight + "', '" + 
                  req.body.price + "', '" + namefile + "', '" + req.body.consist + "', '" + categories + "');", 
  function (error, results, fields) {
    if (error) throw error;
  });
   res.send('ok')
});

app.post('/pasteChange', function (req, res) {
  connection.query("UPDATE paste  SET  name = '" + req.body.name + "', weight = '" + req.body.weight + "', price = '" + 
                  req.body.price + "', consist = '" + req.body.consist +"', categories = '" + req.body.categories + 
                  "' WHERE paste_id = " + req.body.paste_id +";", 
  function (error, results, fields) {
    if (error) throw error;
  });
   res.send('ok')
});

// конец пасты






// ризотто
app.get('/risotto', function (req, res, next) {
connection.query('SELECT *  FROM risotto;', 
function (error, results, fields) {
    if (error) throw error;
    res.send(results);
});
});


app.post('/delpaste', function (req, res) {
  fs.unlink(req.body.URL, function (err) {
    if (err) throw err;
    console.log("file deleted");
});
  console.log(req.body.paste_id);

connection.query("DELETE FROM `risotto` WHERE `risotto_id`=" + req.body.risotto_id + ";", 
function (error, results, fields) {
    if (error) throw error;

});
});

app.post('/uploadrisotto', uploadRisotto.single('fileupload-input'), function(req, res, next) {
  var categories = "all ";
  if(req.body.first == "on"){
    categories = categories + " " + "first";
  }
    if (req.body.second == "on"){
        categories = categories + " " + "second";
    }
     if (req.body.popular == "on"){
        categories = categories + " " + "popular";
    }   
    if (req.body.new == "on"){
        categories = categories + " " + "new";
    }
  connection.query("INSERT INTO risotto VALUES(NULL, '" + req.body.name + "', '" + req.body.weight + "', '" + 
  req.body.price + "', '" + namefile + "', '" + req.body.consist + "', '" + categories + "');", 
function (error, results, fields) {
    if (error) throw error;
});

   res.send('ok')
});

app.post('/risottoChange', function (req, res) {
connection.query("UPDATE risotto  SET  name = '" + req.body.name + "', weight = '" + req.body.weight + "', price = '" + 
  req.body.price + "', consist = '" + req.body.consist +"', categories = '" + req.body.categories + 
  "' WHERE risotto_id = " + req.body.risotto_id +";", 
function (error, results, fields) {
    if (error) throw error;
});

   res.send('ok')

});


//конец риззото





// десертф
app.get('/dessert', function (req, res, next) {
connection.query('SELECT *  FROM dessert;', 
function (error, results, fields) {
    if (error) throw error;
    res.send(results);
});
});


app.post('/deldessert', function (req, res) {
  fs.unlink(req.body.URL, function (err) {
    if (err) throw err;
    console.log("file deleted");
});
  console.log(req.body.dessert_id);

connection.query("DELETE FROM `dessert` WHERE `risotto_id`=" + req.body.dessert_id + ";", 
function (error, results, fields) {
    if (error) throw error;

});
});

app.post('/uploaddessert', uploadDessert.single('fileupload-input'), function(req, res, next) {
  var categories = "all ";
  if(req.body.first == "on"){
    categories = categories + " " + "first";
  }
    if (req.body.second == "on"){
        categories = categories + " " + "second";
    }
     if (req.body.popular == "on"){
        categories = categories + " " + "popular";
    }   
    if (req.body.new == "on"){
        categories = categories + " " + "new";
    }
  connection.query("INSERT INTO dessert VALUES(NULL, '" + req.body.name + "', '" + req.body.weight + "', '" + 
  req.body.price + "', '" + namefile + "', '" + req.body.consist + "', '" + categories + "');", 
function (error, results, fields) {
    if (error) throw error;
});

   res.send('ok')
});

app.post('/dessertChange', function (req, res) {
connection.query("UPDATE dessert  SET  name = '" + req.body.name + "', weight = '" + req.body.weight + "', price = '" + 
  req.body.price + "', consist = '" + req.body.consist +"', categories = '" + req.body.categories + 
  "' WHERE dessert_id = " + req.body.dessert_id +";", 
function (error, results, fields) {
    if (error) throw error;
});

   res.send('ok')

});

// конец десертов





app.get('/vote', function (req, res, next) {
connection.query('SELECT client.name, reviews.date, reviews.review  FROM client inner join reviews on client.client_id=reviews.client_id;', 
function (error, results, fields) {
    if (error) throw error;
    res.send(results);
});
});








app.post('/sendreviews', function(req, res, next) {
	console.log("INSERT INTO reviews VALUES(NULL, NULL, '" + req.body.review + "', '" + req.body.client_id + "');");
	connection.query("INSERT INTO reviews VALUES(NULL, NULL, '" + req.body.review + "', '" + req.body.client_id + "');", 
function (error, results, fields) {
  	if (error) throw error;
});
   res.send('ok')
});

app.post('/verification', function (req, res) {
	console.log('hi');
	var client_id;
	connection.query("SELECT client_id FROM client WHERE client_id = '" + req.body.client_id + "' AND verification = '" + req.body.verification + "';", 
	function (error, results, fields) {
  		if (error) throw error;
  		results.forEach(function(results) {
  			client_id =  results.client_id;	
  		});	
  			if(client_id == req.body.client_id){
  				console.log('true');
  				res.send(true);
  			}
  			else{
  				console.log('false');
  			 	res.send(false);
			}
	});
});





app.post('/registration', function (req, res) {
	var login;
	connection.query("SELECT login FROM client WHERE login = '" + req.body.login + "';", 
	function (error, results, fields) {
  		if (error) throw error;
  		results.forEach(function(results) {
  			login =  results.login;	
  		});	
  			if(login === req.body.login){
  				res.send('Пользователь с таким логином уже сущестует!')
  			}
  			else{
  				console.log(req.body.verification);
				connection.query("INSERT INTO client VALUES(NULL, '" + req.body.name + "', '" + req.body.login + "', '" + req.body.password + "', '" + 
				req.body.phone + "', NULL, '"+ req.body.email  + "', '" + req.body.verification  + "');", 
				function (error, results, fields) {
  					if (error) throw error;
				});
  			 	res.send('Регистрация прошла успешно')
			}
	});
});










app.post('/login', function (req, res) {
	var login;
	var password;
	console.log(req.body.login);
	console.log(req.body.password);
	connection.query("SELECT login, password, verification, rights, name, client_id FROM client WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "';", 
	function (error, results, fields) {
  		if (error) throw error;
  		results.forEach(function(results) {
  			login =  results.login;
  			password = results.password;
  		});	
  			if(login === req.body.login && password === req.body.password){
  				console.log(results);
  				res.send(results)
  			}
  			else{
  				console.log(req.body.password);
  			 	res.send('Не верно введен логин или пароль!');
			}
	});
});