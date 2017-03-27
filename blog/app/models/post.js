// grab db
var low = require('lowdb');
// instantiate db
var db = low('./db.json');

// default
db.defaults({ posts: [] }).write();

var PostList = {};

/*
	@func getItems
	@desc gets all posts
*/
PostList.getItems = function(){
	return db.get('posts').value();	
}

/*
	@func createItem
	@desc creates a new post
*/

PostList.createItem = function(itemToCreate){
    var id = Date.now();
	db.get('posts').push({
		id: id,
                search_id : 's_' + id,
                post: itemToCreate.post,
                when : itemToCreate.when
	}).write();	
}

/*

*/	
PostList.postUpdate = function(data){
	db.get('posts')
		  .find({search_id : 's_' + data.id})
		  .set('post', data.post)
		  .write()	
}

PostList.getPostData = function(data){
	return db.get('posts')
		  .find({search_id : 's_' + data.id}).value();
}


PostList.deletePost = function(data){
	db.get('posts')
		.remove({search_id : 's_' + data.id})
		.write();	
}

module.exports = PostList;












