(function() { // protect the lemmings

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET
        
        var url = window.location.href;
        var id = url.split('postDetails/')[1].replace('/','');
        
	GET('/api/postDetails/' + id)
		.then((data) => {
                    var date = new Date(data.when);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();
                    
                    var date = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
                    var formattedTime = date + ' ' + hours + ':' + minutes + ':' + seconds;
//                    console.log(data.post, formattedTime);
                        container = document.querySelector('#postData');
                        container.innerHTML = data.post;
                        container = document.querySelector('#dateCreated');
                        container.innerHTML = formattedTime;
                        
		});

})();

