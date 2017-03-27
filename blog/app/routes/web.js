var express = require('express');

var router = express.Router();

var PostList = require('../models/post')


// body parser middleware
var parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/posts',function(request, response, next){
	response.header('Content-Type', 'application/json');
	response.send(PostList.getItems());
});


// post posts
router.post('/posts', function(request, response, next){
	var requestBody = request.body;

	// Add a post
	PostList.createItem(requestBody);

	response.header('Content-Type', 'application/json');
	response.send(PostList.getItems());

});


router.get('/postDetails/:id',function(request, response, next){
	response.header('Content-Type', 'application/json');
	response.send(PostList.getPostData(request.params));
});

router.get('/deletePost/:id',function(request, response, next){
	response.header('Content-Type', 'application/json');
	PostList.deletePost(request.params);
        response.send(PostList.getItems());
});

// put post
router.post('/postUpdate', function(request, response, next){
	var requestBody = request.body;

	// Add a post
	PostList.postUpdate(requestBody);

	response.header('Content-Type', 'application/json');
	response.send({});
}); // post

// delete post
router.delete('/post/:id', function(request, response, next){
	var id = request.params.id;

	PostList.deleteItem(id);

	response.header('Content-Type', 'application/json');
	response.send(PostList.getItems());
}); // delete


module.exports = router;





