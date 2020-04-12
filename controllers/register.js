const handleRegister=(req,res,bcrypt,db)=>{
	const {email,name,password}=req.body;
	if(!email || !name || !password){
		return res.status(400).json("Incorrect Form submission");
	}
	const hash=bcrypt.hashSync(password);					//encrypting password into hash value using bcrypt synchronous method
	db.transaction(trx=>{									//knex transaction property of db allow to commit change in both table orelse and maintain consistancy of data in both table
		trx.insert({
			hash:hash,
			email:email
		})
	.into('login')											//login table in smartbrain DB
	.returning('email')										//return the email id of register user
	.then(loginEmail=>{
		return trx('users')
		.returning('*')
		.insert({
			email:loginEmail[0],						//loginEmail is the Email id we got from returning('email')
			name:name,
			joined:new Date()
		})
		.then(user=>{
			res.json(user[0]);
		})
	})
		.then(trx.commit)									//commit will add data in both tables
		.catch(trx.rollback)								//if json is not in correct format as required then data will rollback
	})
	.catch(err=> res.status(400).json("Unable to register"))
}
	module.exports={
		handleRegister:handleRegister
	};