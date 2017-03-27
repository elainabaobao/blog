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

	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST
        var url = window.location.href;
        var id = url.split('updatePost/')[1].replace('/','');
	GET('/api/postDetails/' + id)
		.then((data) => {
                    document.getElementById('postContent').value = data.post;
                    document.querySelector('#postId').value = data.id;
		});

	document.querySelector('.updatePost').addEventListener('click', (e) => {
		const input = document.querySelector('#postContent').value.trim();
                const id = document.querySelector('#postId').value;
                if(input != ''){

		POST('/api/postUpdate', {
			post: input,
                        id: id,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			window.location.href = '/';
		});
            }else{
                alert('Please enter content');
            }
	})

})();

