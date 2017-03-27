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

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
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

	function render(postItems) {
		const container = document.querySelector('.js-postlist');
		container.innerHTML = '';
                
                Object.keys(postItems).reverse().forEach(function(i){
                    const li = document.createElement('li');
                    li.innerHTML = `
${'<a href="/postDetails/' + postItems[i].id + '"><div class="col-md-10">' + postItems[i].post + '</div></a><div class="col-md-2"><a href="/updatePost/' + postItems[i].id + '">Edit</a> | <a href="javascript:void(0)" id="' + postItems[i].id + '" class="deletePost">Delete</a><div>'}
                    `;

                    li.classList.add('list-group-item', 'postlist-item');

                    container.appendChild(li);
                    
                })

		if (postItems.length === 0) {
			container.innerHTML = `
<li class="list-group-item">
No postitems!
</li>
			`;
		}
                
                var classname = document.getElementsByClassName("deletePost");

                        var myFunction = function() {
                            var id = this.getAttribute("id");
                            GET('/api/deletePost/' + id)
                                .then((postItems) => {
                                        render(postItems);
                                });
                        };
                        
                        console.log(classname);
                        for (var i = 0; i < classname.length; i++) {
                            classname[i].addEventListener('click', myFunction, false);
                        }   
	} // render

        
	GET('/api/posts')
		.then((postItems) => {
			render(postItems);
                        
                        

		});

	document.querySelector('.js-add-post').addEventListener('click', (e) => {
		const input = document.querySelector('.js-post-text');
		input.setAttribute('disabled', 'disabled');

		POST('/api/posts', {
			post: input.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			render(data);
		});
	})
        
        

})();

