let express = require("express"); // create the server 
let morgan = require("morgan"); // log events
let uuid = require("uuid");

// required for the post 
let bodyParser = require("body-parser"); 
let jsonParser = bodyParser.json();

let app =  express();

//Specify the use of an html where to find it
app.use(express.static("public"));

app.use(morgan("dev"))

const post = [
	{
		id: uuid.v4(),
		title: "Title1",
		content: "Content1",
		author: "Author1",
		publishedDate: "27-Oct-2019"
	},{
		id: uuid.v4(),
		title: "Title2",
		content: "Content2",
		author: "Author2",
		publishedDate: "27-Oct-2019"
	},{
		id: uuid.v4(),
		title: "Title3",
		content: "Content3",
		author: "Author3",
		publishedDate: "27-Oct-2019"
	}
]

//Start the server requests

app.get("/blog-posts", (req,res,next) => {
	// Check if there are params 
	console.log(req.query);

	if(!(req.query.author)){

		return res.status(200).json({
			content: post,
			message: "All posts in Database"
		});
	}

	if(req.query.author == ""){
		return res.status(406).json("Missing author param");
	}

	post.forEach(function(postObject){
		if(postObject.author == req.query.author){
			return res.status(200).json({
				content: postObject,
				message: "Author Found"
				});
		}
	});

	return res.status(404).json("Author Not Found");

});

app.post("/blog-posts", jsonParser , (req,res,next) =>{
	// body with all fields except id 
	console.log(req.body);
	if(!req.body.title || !req.body.content ||
		!req.body.author || !req.body.publishedDate){
		return res.status(406).json({
			code: 406,
			message: "title, content, author or publishedDate missed"
		});
	}
	//Create object with data 
	let postObject = {
		id: uuid.v4(),
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishedDate: req.body.publishedDate
	}
	// Push Object to list 
	post.push(postObject);

	//
	return res.status(201).json({
			code: 201,
			content: postObject
	});


});

app.delete("/blog-posts/:id", (req, res , next) => {
	console.log(req.params.id);
	console.log(post);
	let i = 0;
	post.forEach(function(postObject){
		if(postObject.id == req.params.id){
			post.splice(i,1); 
			return res.status(200).json({
				content: postObject,
				message: "Object Deleted"
			});
		}
		i++;
	});
	return res.status(404).json("ID doesn't exist");
});

app.put("/blog-posts/:id", jsonParser , (req, res , next) => {
	console.log(req.params.id);
	console.log(post);
	console.log(req.body.id);
	if(!req.body.id){
		return res.status(406).json("ID missed in body");
	}

	if(req.body.id != req.params.id){
		return res.status(409).json("ID's doesn't match");
	}
	post.forEach(function(postObject){
		if(postObject.id == req.params.id){
			//Update what the object contains
			if(req.body.title){
				postObject.title = req.body.title;
			}
			if(req.body.content){
				postObject.content = req.body.content;
			}
			if(req.body.author){
				postObject.author = req.body.author;
			}
			if(req.body.publishedDate){
				postObject.publishedDate = req.body.publishedDate;
			}
			return res.status(202).json({
				content: postObject,
				message: "Object Updated"
			});
		}
	})
});



app.listen("8080", () => {
	console.log("App running on localhost:8080"); 
});
