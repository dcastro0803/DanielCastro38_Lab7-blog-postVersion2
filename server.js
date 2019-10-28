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

		return res.status(200).json(post);
	}

	if(req.query.author == ""){
		return res.status(406).json("Missing author param");
	}

	post.forEach(function(postObject){
		if(postObject.author == req.query.author){
			return res.status(200).json(postObject);
		}
	});

	return res.status(404).json("Author Not Found");

});

/*
app.get("/blog-posts", (req,res,next) => {
	//Data sent via query in postman use params
	console.log(req.query);
	if(!req.query.author){
		return res.status(406).json("Missing author param");
	}

	post.forEach(function(postObject){
		if(postObject.author == req.query.author){
			return res.status(200).json(postObject);
		}
	});

	return res.status(404).json("Author Not Found");
});
*/

app.listen("8080", () => {
	console.log("App running on localhost:8080"); 
});
