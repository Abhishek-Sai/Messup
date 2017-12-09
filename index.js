
var express = require('express');
var app = express();
const admin = require("firebase-admin");
var functions = require("firebase-functions");
var firebase = require('firebase')
app.use(express.static( __dirname + '/public'));
app.set('view engine', 'ejs');
var path = require('path');

var config = {
    apiKey: "AIzaSyAZwXUWpgP_cIhCJy8QSmCMnMIVSDuba9s",
    authDomain: "studyowl-abhishek.firebaseapp.com",
    databaseURL: "https://studyowl-abhishek.firebaseio.com",
    projectId: "studyowl-abhishek",
    storageBucket: "studyowl-abhishek.appspot.com",
    messagingSenderId: "437916882074"
  };
  firebase.initializeApp(config);
	admin.initializeApp(functions.config().firebase);
var db = admin.firestore();


var cookieSession = require('firebase-cookie-session');

app.use(cookieSession({
  keys: ['asdf'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.get('/signup',function (req,res) {
	res.sendFile(path.join(__dirname,  '../public','form.html'));
})

app.get('/formSubmit',function (req,res) {

	req.session.status=1;
	var n=req.query.name;
	var obj={
	  gen:req.query.gender,
  	 invites: req.query.invite,
  	 name:req.query.name,
  	 username: req.query.username,
  	 pass:req.query.pass,
  	 lastName: req.query.lastName,
  	 dob:req.query.dob,
  	 email:req.query.email
	};

	var email=req.query.email;
	var check=db.collection('Users');
	var ch=check.where('email', '==', email).get()
		.then(snapshot=>{
			snapshot.forEach(doc=>{
				console.log('Error getting documents');
				res.send('Email already exists.')
			});
		})
		.catch(err=>{
			if(req.session.status=1){
		
				var users=db.collection('Users').doc(n);
				var adduser =  users.set(obj);
				res.render('login',{res:obj})
		
			}
			else{
				console.log("There is an error");
			}
		});
});

app.get('/login',function (req,res) {
	res.sendFile(path.join(__dirname,  '../public','loginform.html'));
});


app.get('/loginSubmit',function (req,res) {
	var user= req.query.username;
	var pass=req.query.pass;
	var confirm=db.collection('Users');
	var con=confirm.where('username', '==', user).where('pass', '==', pass).get()
		.then(snapshot=>{
			if(snapshot.length>0){
				snapshot.forEach(doc=>{
				console.log(doc.data());
				res.render('dashboard');
				})
			}
			else{
				console.log(doc.data());
				res.send('Either username or password is wrong or you are not an existing user');
			}
		})

		.catch(err=>{
			console.log('Error getting documents',err);
		})
			

})

app.get('/updateProf',function (req,res) {
	res.render('update_prof')
})














exports.app= functions.https.onRequest(app);



/*app.get('/signup',function (req,res) {
	res.sendFile(path.join(__dirname,  '../public','form.html'));
})*/

/*app.get('/formSubmit',function(req,res){
	
	req.session.status=1;
	var n=req.query.name;
	var obj={
	  gen:req.query.gender,
  	 invites: req.query.invite,
  	 name:req.query.name,
  	 username: req.query.username,
  	 pass:req.query.pass,
  	 lastName: req.query.lastName,
  	 dob:req.query.dob,
  	 email:req.query.email,
  	 num:req.query.number
	};

	if(req.session.status=1){
		console.log("kkk");
		var users=db.collection('Users').doc(n);
		var adduser=users.set(obj);
		res.render('login',{res:obj})
		
	}
	else{
		console.log("There is an error");
	}

	/*var i=req.query.email;
	var check=db.collection('Users');
	var ch=check.where('email','==', i ).get()
		.then(snapshot=>{
			snapshot.forEach(doc => {
				res.send("E-mail already used");
				
		});
		})
		.catch(err => {
			if(req.session.status=1){
		console.log("kkk");
		var users=db.collection('Users').doc(n);
		var adduser=users.set(obj)
		res.render('login',{res:obj})
		
		}
			else{
				console.log("There is an error");
			}
			
        
    	});
	


	app.get('/login',function(req,res){
		res.sendFile(path.join(__dirname, '../public', 'loginform.html'));
		var user= req.query.username;
		var pass=req.query.password;
		var confirm=db.collection('Users');
		var con=confirm.where('username', '==', user).where('password', '==', pass).get()
			.then(snapshot=>{
				snapshot.forEach(doc=>{
					res.render('onemore');
				})
			.catch(err=>{
				console.log('There is an error');
			});
			});

	});*/


	/*if(req.session.status=1){
		console.log("kkk");
		var users=db.collection('Users').doc(n);
		var adduser=users.set(obj)
		res.render('login',{res:obj})
		
	}
	else{
		console.log("There is an error");
	}


	

	
});*/









