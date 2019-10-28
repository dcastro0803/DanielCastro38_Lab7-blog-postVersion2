function init(){
	//the url is in the folder so we can use the endpoint 
	let url = "/blog-posts";
	let settings = {
		method : "GET"
	}
	//fetch the data from the server and do something with it
	fetch(url, settings)
		.then( response =>{ 
			if(response.ok){
				return response.json();
			}

			throw new Error (response.statusText);
		})
		.then(responseJSON => {
			console.log(responseJSON);
			console.log(responseJSON.content[0].id);
			console.log($(".listOfPosts").val());
			for(let i = 0 ; i < responseJSON.content.length; i++){
				$(".listOfPosts").append(`<div>
											<li>
												${responseJSON.content[i].id}
											</li>
											<li>
												${responseJSON.content[i].title}
											</li>
											<li>
												${responseJSON.content[i].content}
											</li>
											<li>
												${responseJSON.content[i].author}
											</li>
											<li>
											${responseJSON.content[i].publishedDate}
											</li>
										</div><br>`);
			}
		})
		.catch( err => {
			console.log(err);
		})
}

let post = {
	id: "",
	title: "",
	content:"",
	author: "",
	publishedDate:""
}
url = "/blog-posts";

//function Submit form 
function submitPost(){
	$("#submitButtonPost").on("click",function(event){
		event.preventDefault(); 
		// capture all the inputs 
		let title = $("#titlePost").val();
		let content = $("#contentPost").val();
		let author = $("#authorPost").val();
		let publishedDate = $("#publishedDatePost").val();
		// store data in post
		post.title = title;
		post.content = content; 
		post.author = author; 
		post.publishedDate = publishedDate;

		// send the inputs to the database
		$.ajax({
			url: url,
			method: "POST",
			data: JSON.stringify(post),
			datatype: "json",
			contentType: "application/json",
			success: function(data){
				//what to do with data
				console.log(data);

			},
			error: function(err) {
		    	console.log('error:' + err)
		  	}
		})
		// Clean Data
		post.title = "";
		post.content = ""; 
		post.author = ""; 
		post.publishedDate = "";
	});
}

function submitDelete() {
	$("#submitButtonDelete").on("click",function(event){
		event.preventDefault(); 

		let id = $("#idDelete").val();
		url = `/blog-posts/${id}`;
		post.id = id; 
		// Send Data 
		$.ajax({
				url: url,
				method: "DELETE",
				data: JSON.stringify(post.id),
				datatype: "json",
				contentType: "application/json",
				success: function(data){
					//what to do with data
					console.log(data);

				},
				error: function(err) {
			    	console.log('error:' + err)
			  	}
			});

		//Clean Data 
		url = "/blog-posts";
		post.id= "";
	});

}

function submitPut(){
	$("#submitButtonPut").on("click",function(event){
		event.preventDefault(); 
		// capture all the inputs 
		let title = $("#titlePut").val();
		let content = $("#contentPut").val();
		let author = $("#authorPut").val();
		let publishedDate = $("#publishedDatePut").val();
		// Change url 
		let id = $("#idPut").val();
		url = `/blog-posts/${id}`;

		// store data in post
		post.title = title;
		post.content = content; 
		post.author = author; 
		post.publishedDate = publishedDate;
		post.id = id; 

		// Send Data to API
		 $.ajax({
			url: url,
			method: "PUT",
			data: JSON.stringify(post),
			datatype: "json",
			contentType: "application/json",
			success: function(data){
				//what to do with data
				console.log(data);

			},
			error: function(err) {
		    	console.log('error:' + err)
		  	}
		})

		// Clean Data
		post.title = "";
		post.content = ""; 
		post.author = ""; 
		post.publishedDate = "";
		url = "/blog-posts";
		post.id= "";
	});

}


init();
submitPost();
submitDelete();
submitPut(); 