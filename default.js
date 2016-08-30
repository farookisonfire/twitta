var tweets = JSON.parse(data);
var theTweets = document.getElementById('tweets');
var following =[]
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
	// var following = [];

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
	button.classList.add('button');
	button.classList.add('follow');
	button.setAttribute('name', tweets[i].name);
	button.setAttribute('id', tweets[i].id);

	tweetDiv.classList.add('panel');
  tweetDiv.classList.add('panel-default');

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

document.body.addEventListener('click', function(event){
	clear(followers);

	if(event.target.className.indexOf('follow') !== -1) {
		var name = event.target.getAttribute('name');
		var id = event.target.getAttribute('id');
		if (typeof following === 'undefined') {
		  // following = [];
			following.push([name, id]);
			console.log(following);
		} // end of if conditional
		else if (check(following, id) === 0){
				following.push([name,id])
				console.log(following);
			} // end of else if conditional
	} // end of first if conditional

	listFollower(following);
}); // end of event listener


// check the "following" array to see if you have already followed the user
function check(array, test) {
	var match = 0
	for (i = 0; i < array.length ; i++) {
		if (array[i].indexOf(test) !== -1) {
			match += 1;
			console.log('the substring ' + test + ' was found ' + match + ' times')
			return match;
		}
	}
	return(match)
}

// list everyone that you are following
function listFollower(array) {
	var followers = document.getElementById('followers')
	// var followingDiv = document.getElementById('following-div')
	var followingDiv = document.createElement('div');
	followingDiv.textContent = 'Following:';
	followingDiv.classList.add('panel-heading');
	followers.appendChild(followingDiv);

	for (var i = 0 ; i < array.length ; i++) {
		var follower = array[i][0];
		var followerP = document.createElement('p');
		followerP.textContent = follower;
		followerP.classList.add('panel-body');
		followers.appendChild(followerP);
	}
}

// clear all child elements
function clear(target){
	while(target.firstChild) {
		target.removeChild(target.firstChild)
	}
}

// DISPLAY ONLY YOUR FOLLOWERS' TWEETS

var home = document.getElementById('home');
var followTweets = document.getElementById('follow-tweets')
home.addEventListener('click', function(){
	clear(followTweets);
	theTweets.classList.remove('live')
	theTweets.classList.add('hide');
	followTweets.classList.remove('hide');
	followTweets.classList.add('live')

	for (var i = 0 ; i < tweets.length ; i++) {
		for (var y = 0 ; y < following.length ; y++) {
			if(tweets[i].id == following[y][1]) {
				var followTweetDiv = document.createElement('div');
				var followPicDiv = document.createElement('div');
				var followSpanDiv = document.createElement('div');
				var followContent = document.createElement('div');

				var followPicture = document.createElement('img');
				var followNameSpan = document.createElement('span');
				var followUserNameSpan = document.createElement('span');
				var followDateSpan = document.createElement('span');

				followPicture.src = tweets[i].pic;
				followPicDiv.appendChild(followPicture);
				followNameSpan.textContent = tweets[i].name;
				followUserNameSpan.textContent = tweets[i].username;
				followDateSpan.textContent = tweets[i].date;
				followSpanDiv.appendChild(followNameSpan);
				followSpanDiv.appendChild(followUserNameSpan);
				followSpanDiv.appendChild(followDateSpan);
				followContent.textContent = tweets[i].content;

				followTweetDiv.appendChild(followPicDiv);
				followTweetDiv.appendChild(followSpanDiv);
				followTweetDiv.appendChild(followContent);

				followTweets.appendChild(followTweetDiv);
			}

		} // end of inner for loop
	} // end of outer for loop

}) // end of event listener

var bird = document.getElementById('logo');
bird.addEventListener('click', function(){
	theTweets.classList.remove('hide')
	theTweets.classList.add('live');
	followTweets.classList.remove('live');
	followTweets.classList.add('hide')
})
