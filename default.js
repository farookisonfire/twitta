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
  var contentDiv = document.createElement('div')

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
  contentDiv.classList.add('content');
  // nameSpan.classList.add('panel-heading');
  // usernameSpan.classList.add('panel-heading');
  // dateSpan.classList.add('panel-heading');
  contentDiv.classList.add('panel-body');
  picDiv.classList.add('col-md-2');
  spanDiv.classList.add('col-md-10');
  contentDiv.classList.add('col-md-10');
  tweetDiv.classList.add('col-md-12')

  tweetDiv.classList.add('panel');
  // tweetDiv.classList.add('panel-default');

  picDiv.appendChild(picture);
  spanDiv.appendChild(nameSpan);
  spanDiv.appendChild(usernameSpan);
  spanDiv.appendChild(dateSpan);

  tweetDiv.appendChild(picDiv);
  tweetDiv.appendChild(spanDiv);
	tweetDiv.appendChild(contentDiv);

  theTweets.appendChild(tweetDiv);

}
