const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const db=knex({
	client:'pg',
	connection:{
		connectionString:process.env.DATABASE_URL,
		ssl:true,
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
	res.send('its working');
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

const PORT=process.env.PORT
app.listen(process.env.PORT,()=>{
	console.log("App is running on port "+PORT);
})