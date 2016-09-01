var tweets = JSON.parse(data);
var theTweets = document.getElementById('tweets');
var following =[]
var profileCard = document.getElementById('profile-card')
var yourTweet = document.getElementById('your-tweet');
var tweetButton = document.getElementById('tweet-button');

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

	nameSpan.classList.add('span-name');
	usernameSpan.classList.add('span-user-name');
	dateSpan.classList.add('span-date');


	contentDiv.textContent = tweets[i].content;
	button.textContent = 'Follow ' + tweets[i].name;

  contentDiv.classList.add('content');
  // nameSpan.classList.add('panel-heading');
  // usernameSpan.classList.add('panel-heading');
  // dateSpan.classList.add('panel-heading');
	picture.classList.add('wall-pic')
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
	showIt(profileCard);
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
				followPicture.classList.add('wall-pic')
				followPicDiv.appendChild(followPicture);
				followNameSpan.textContent = tweets[i].name;
				followUserNameSpan.textContent = tweets[i].username;
				followDateSpan.textContent = tweets[i].date;

				followNameSpan.classList.add('span-name');
				followUserNameSpan.classList.add('span-user-name');
				followDateSpan.classList.add('span-date');

				followSpanDiv.appendChild(followNameSpan);
				followSpanDiv.appendChild(followUserNameSpan);
				followSpanDiv.appendChild(followDateSpan);
				followContent.textContent = tweets[i].content;

				followTweetDiv.classList.add('col-md-12');
				followPicDiv.classList.add('col-md-2');
				followSpanDiv.classList.add('col-md-10');
				followContent.classList.add('col-md-10');
				followTweetDiv.classList.add('panel');
				followTweetDiv.classList.add('panel-default');
				followContent.classList.add('panel-body')
				followTweetDiv.classList.add('follow-tweet-div');
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
	hideIt(profileCard);
	theTweets.classList.remove('hide')
	theTweets.classList.add('live');
	followTweets.classList.remove('live');
	followTweets.classList.add('hide')
})

function hideIt(element) {
	element.classList.add('hide');
}

function showIt(element) {
	element.classList.remove('hide');
}

yourTweet.addEventListener('click', function(){
	var yourTweetDiv = document.getElementById('your-tweet-div');
	var yourTweetProfilePic = document.getElementById('your-tweet-profile-pic');

	yourTweetDiv.classList.add('your-tweet-div-expand');
	yourTweetProfilePic.classList.add('your-tweet-profile-pic-expand');
	yourTweet.classList.add('your-tweet-expand');
	showIt(tweetButton);
})

tweetButton.addEventListener('click', function() {
	var myTweet = {}
		myTweet.id = '6954';
		myTweet.name = 'name';
		myTweet.username = 'username';
		myTweet.date = Date();
		myTweet.content = yourTweet.value;
		myTweet.pic = 'dummy.png'

	tweets.unshift(myTweet);
	clear(theTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
	build(tweets[i]);
	}

}); //end of event listener



function build(tweet) {
	var buildTweetDiv = document.createElement('div');
	buildTweetDiv.classList.add('col-md-12');
	buildTweetDiv.classList.add('panel');
	buildTweetDiv.classList.add('panel-default');

	var buildPicDiv = document.createElement('div');
	buildPicDiv.classList.add('col-md-2');
	var buildPicture = document.createElement('img');
	buildPicture.src = tweet.pic;
	buildPicture.classList = 'wall-pic';
	buildPicDiv.appendChild(buildPicture);

	var buildSpanDiv = document.createElement('div');
	buildSpanDiv.classList.add('col-md-10');
	var buildSpanName = document.createElement('span');
	buildSpanName.textContent = tweet.name;
	buildSpanName.classList.add('span-name');
	var buildSpanUserName = document.createElement('span');
	buildSpanUserName.textContent = tweet.username
	buildSpanName.classList.add('span-user-name');
	var buildSpanDate = document.createElement('span');
	buildSpanDate.textContent = tweet.date;
	buildSpanName.classList.add('span-date');
	buildSpanDiv.appendChild(buildSpanName);
	buildSpanDiv.appendChild(buildSpanUserName);
	buildSpanDiv.appendChild(buildSpanDate);

	var buildContent = document.createElement('div');
	buildContent.classList.add('content');
	buildContent.classList.add('panel-body');
	buildContent.classList.add('col-md-10');
	buildContent.textContent = tweet.content;

	buildTweetDiv.appendChild(buildPicDiv);
	buildTweetDiv.appendChild(buildSpanDiv);
	buildTweetDiv.appendChild(buildContent);
	buildTweetDiv.id = "tweet-div";

	theTweets.appendChild(buildTweetDiv);
}
