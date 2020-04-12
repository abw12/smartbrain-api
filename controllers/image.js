const Clarifai =require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c529005ba69b47f59abeb53c2268eadc'
});

const handleApiCall=(req,res)=>{
	const {input}=req.body;
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL,input)
      .then(data=>{
      	res.json(data);
      })
      .catch(err=> res.status(400).json("Unable to work with Api"))
}

const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=> res.status(400).json("Unable to get Entry count"))
}
module.exports={
	handleImage,
	handleApiCall
};