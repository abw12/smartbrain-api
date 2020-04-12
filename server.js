const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres'	,		//owner of the database which is in our case is psotgres 
		password:'Maxwell@32',
		database:'smartbrain'
	}
});
const register= require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const app=express();
app.use(bodyParser.json());
app.use(cors());

/*const database={
	users:[
	{
		"id":'123',
		"name":"abhishek",
		"email":"wasaveabhishek@gmail.com",
		"password":"abw12",
		"entries":0,
		"joined":new Date()
	},
	{
		"id":'143',
		"name":"vedant",
		"email":"vedant@gamil.com",
		"password":"ved11",
		"entries":0,
		"joined":new Date()
	}

]}*/
app.get('/',(req, res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});


app.listen(3000,()=>{
	console.log("App is running on port 3000");
})