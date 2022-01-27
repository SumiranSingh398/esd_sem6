const mongoose = require("mongoose");
const conn_str = "mongodb+srv://root:root@cluster0.fl0nu.mongodb.net/college?retryWrites=true&w=majority";
const port = 8080;
mongoose.connect(conn_str, { useNewUrlParser: true , useUnifiedTopology: true})
	.then( () => console.log("Connected successfully...") )
	.catch( (err) => console.log(err) );

  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
  });
  
  const user = new mongoose.model("student", userSchema);

  const express = require("express");
  const app = express();

app.use(express.json());

var cors = require('cors');
app.use(cors());

app.route("/student")
.get(async (req, res) => {
	let data = await user.find();
  console.log(data);  
	res.send(data);
})
.post(async (req, res) => {        
	req_data = req.body;
    //console.log(req_data);
	let obj = new user(req_data)
	let result = await obj.save();
    console.log(result);
	//res.send(req_data);
	res.send(result);
})
.put(async (req, res) => {
	req_data = req.body;
    console.log(req_data.id);
	let result = await user.updateOne({_id: req_data.id}, {$set : {city: req_data.city}})
	res.send(result);
	//res.send(req_data);
})
.delete(async (req, res) => {
	let result = await user.deleteOne({_id: req.query.id})
	res.send(result);
})


app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});

