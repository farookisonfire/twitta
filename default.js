var tweets = JSON.parse(data);
var theTweets = document.getElementById('tweets');

for ( var i = 0 ; i < tweets.length ; i++) {

	var tweetDiv = document.createElement('div');
  var picDiv = document.createElement('div');
  var picture = document.createElement('img');
  var spanDiv = document.createElement('div');
  var nameSpan = document.createElement('span');
  var usernameSpan = document.createElement('span');
  var dateSpan = document.createElement('span');
  var contentDiv = document.createElement('div');
	var button = document.createElement('button');
	var following = [];

  tweetDiv.id = 'tweet-div';
  picDiv.id = 'pic-div';
  picture.id = 'picture';
  spanDiv.id = 'span-div';
  nameSpan.id = 'name';
  usernameSpan.id = 'username';
  dateSpan.id = 'date';
  contentDiv.id = 'content';

  picture.src= tweets[i].pic;
  nameSpan.textContent = tweets[i].name;
	usernameSpan.textContent = tweets[i].username;
	dateSpan.textContent = tweets[i].date;
	contentDiv.textContent = tweets[i].content;
	button.textContent = 'Follow ' + tweets[i].name;

  contentDiv.classList.add('content');
  // nameSpan.classList.add('panel-heading');
  // usernameSpan.classList.add('panel-heading');
  // dateSpan.classList.add('panel-heading');
  contentDiv.classList.add('panel-body');
  picDiv.classList.add('col-md-2');
  spanDiv.classList.add('col-md-10');
  contentDiv.classList.add('col-md-10');
  tweetDiv.classList.add('col-md-12');
	button.classList.add('btn');
	button.classList.add('follow');
	button.setAttribute('name', tweets[i].name);
	button.setAttribute('id', tweets[i].id);

	tweetDiv.classList.add('panel');
  // tweetDiv.classList.add('panel-default');

  picDiv.appendChild(picture);
  spanDiv.appendChild(nameSpan);
  spanDiv.appendChild(usernameSpan);
  spanDiv.appendChild(dateSpan);

  tweetDiv.appendChild(picDiv);
  tweetDiv.appendChild(spanDiv);
	tweetDiv.appendChild(contentDiv);
	tweetDiv.appendChild(button);

  theTweets.appendChild(tweetDiv);
}

// document.body.addEventListener('click', function(event){
// 	if(event.target.className.indexOf('follow') !== -1) {
// 		var name = event.target.getAttribute('name');
// 		var id = event.target.getAttribute('id');
// 		for (i = 0 ; i < following.length ; i++) {
// 			if (following[i].indexOf(id) === -1){
// 				following.push([name,id])
// 				console.log('following');
// 	}}}
//
// });
