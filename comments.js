// Create web server application with Node.js
// 1. Create a Node.js application that starts a server and listens on port 3000 for connections.
// 2. When you visit the homepage (http://localhost:3000), it should display a welcome message, 
//    welcoming you to the homepage of the server.
// 3. When you visit the comments page (http://localhost:3000/comments), it should display 
//    the message: "Welcome to the comments page!"
// 4. When you visit the comments/new page (http://localhost:3000/comments/new), it should 
//    display the message: "Welcome to the comments page!"
// 5. When you visit any other page, it should display the message: "Page not found!"
// 6. Use the fs module to read the comments.json file and display the comments on the comments 
//    page. You should use the readFile method and not the readFileSync method. 
//    You should also use the JSON.parse method to parse the contents of the file.
// 7. Add a form to the comments/new page with two inputs, one for the username and one for the 
//    comment. The form should make a POST request to /comments when submitted.
// 8. Add a POST route to /comments that will read the contents of the comments.json file, parse 
//    the contents into a JavaScript object, add the new comment to the comments array, save the 
//    comments array to the comments.json file, and redirect the user back to the /comments page.
// 9. Add a DELETE route to /comments that will read the contents of the comments.json file, parse 
//    the contents into a JavaScript object, remove the comment with the specified index from the 
//    comments array, save the comments array to the comments.json file, and redirect the user back 
//    to the /comments page.
// 10. Add a form to the comments page with one input for the index and one submit button. The form 
//     should make a POST request to /comments/:index when submitted.
// 11. Add a POST route to /comments/:index that will read the contents of the comments.json file, 
//     parse the contents into a JavaScript object, remove the comment with the specified index from 
//     the comments array, save the comments array to the comments.json file, and redirect the user 
//     back

// 1. Create a Node.js application that starts a server and listens on port 3000 for connections.
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('view engine', 'ejs');

// 2. When you visit the homepage (http://localhost:3000), it should display a welcome message, 
//    welcoming you to the homepage of the server.
app.get('/', function(req, res){
	res.render('home');
});

// 3. When you visit the comments page (http://localhost:3000/comments), it should display 
//    the message: "Welcome to the comments page!"
app.get('/comments', function(req, res){
	res.render('comments');
});

// 4. When you visit the comments/new page (http://localhost:3000/comments/new), it should 
//    display the message: "Welcome to the comments page!"
app.get('/comments/new', function(req, res){
	res.render('new');
});

// 6. Use the fs module to read the comments.json file and display the comments on the comments 
//    page. You should use the readFile method and not the readFileSync method. 
//    You should also use the JSON.parse method to parse the contents of the file.
app.get('/comments', function(req, res){
	fs.readFile('./comments.json', function(err, data){
		if(err){
			console.log(err);
		}
		var comments = JSON.parse(data);
		res.render('comments', {comments: comments});
	});
});

// 7. Add a form to the comments/new page with two inputs, one for the username and one for the 
//    comment. The form should make a POST request to /comments when submitted.
app.use(bodyParser.urlencoded({extended: true}));
app.post('/comments', function(req, res){
	fs.readFile('./comments.json', function(err, data){
		if(err){
			console.log(err);
		}
		var comments = JSON.parse(data);
		comments.push(req.body);
		fs.writeFile('./comments.json', JSON.stringify(comments), function(err){
			if(err){
				console.log(err);
			}
			res.redirect('/comments');
		});
	});
});

// 9. Add a DELETE route to /comments that will read the contents of the comments.json file, parse