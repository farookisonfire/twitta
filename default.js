var tweets = JSON.parse(data);
var theTweets = document.getElementById('tweets');
var users = [];
var following =[];
var profileCard = document.getElementById('profile-card')
var yourTweet = document.getElementById('your-tweet');
var tweetButton = document.getElementById('tweet-button');
var tweetCount = 0;
var followingCount = 0;
var userId = '695412312234234213412312545623';
var topbar = document.getElementById('topbar');
var mainContain = document.getElementById('main-contain');
var signIn = document.getElementById('signin');
var vidloop = document.getElementById('vidloop');
var myModal = document.getElementById('my-modal');
var logIn = document.getElementById('log-in');
var userInput = document.getElementById('username-input');
var userPass = document.getElementById('password-input');
var dashLeft = document.getElementById('dashboard-left');
var regButton = document.getElementById('register');
var signUp = document.getElementById('reg-signup');
var regModal = document.getElementById('reg-modal');
var backMyModal = document.getElementById('back-mymodal');


// clear all child elements
function clear(target){
	while(target.firstChild) {
		target.removeChild(target.firstChild)
	}
}

// TOGGLE HIDE

function hideIt(element) {
	element.classList.add('hide');
}

function showIt(element) {
	element.classList.remove('hide');
}

// GET USERS FROM ORIGINAL DATA ARRAY

function addUser(entry){
	var user = {
	userId: entry.id,
	userName: entry.username,
	name: entry.name,
	password: entry.id + 'pass'
	}
	users.push(user);
}

for (var i = 0 ; i < tweets.length ; i++) {
	addUser(tweets[i])
}


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
	nameSpan.classList.add('tweet-header');
	usernameSpan.classList.add('tweet-header');
	dateSpan.classList.add('tweet-header');



	contentDiv.textContent = tweets[i].content;
	button.textContent = 'Follow ' + tweets[i].name;
	button.classList.add('hide');
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
	button.setAttribute('content', tweets[i].content);
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
		var followingCounter = document.getElementById('following-counter');
		var name = event.target.getAttribute('name');
		var id = event.target.getAttribute('id');
		var content = event.target.getAttribute('content');
		event.target.classList.add('now-following')
		event.target.textContent = 'Following!'
		if (typeof following === 'undefined') {
		  // following = [];
			following.push([name, id, content]);
			followingCount += 1;
			followingCounter.textContent = followingCount;
			console.log(following);
		} // end of if conditional
		else if (check(following, id) === 0){
				followingCount += 1;
				followingCounter.textContent = followingCount;
				following.push([name, id, content])
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
		if (array[i][1] !== '695412312234234213412312545623'){
			var follower = array[i][0];
			var followerP = document.createElement('p');
			followerP.textContent = follower;
			followerP.classList.add('panel-body');
			followers.appendChild(followerP);
		}
	}
}



// DISPLAY ONLY YOUR FOLLOWERS' TWEETS

var home = document.getElementById('home');
var followTweets = document.getElementById('follow-tweets')
home.addEventListener('click', function(){
	vidloop.style.display = 'none';
	clear(followTweets);
	showIt(profileCard);
	// theTweets.classList.remove('live')
	hideIt(theTweets);
	showIt(followTweets);
	compareTweetsToFollowing(tweets, following);

	var followButton = document.getElementsByClassName('follow');
	for (i = 0 ; i < followButton.length ; i++) {
		hideIt(followButton[i]);
	}

	// for (var i = 0 ; i < tweets.length ; i++) {
	// 	for (var y = 0 ; y < following.length ; y++) {
	// 		if(tweets[i].id === following[y][1] && tweets) {
	// 			var followTweetDiv = document.createElement('div');
	// 			var followPicDiv = document.createElement('div');
	// 			var followSpanDiv = document.createElement('div');
	// 			var followContent = document.createElement('div');
	//
	// 			var followPicture = document.createElement('img');
	// 			var followNameSpan = document.createElement('span');
	// 			var followUserNameSpan = document.createElement('span');
	// 			var followDateSpan = document.createElement('span');
	//
	// 			followPicture.src = tweets[i].pic;
	// 			followPicture.classList.add('wall-pic')
	// 			followPicDiv.appendChild(followPicture);
	// 			followNameSpan.textContent = tweets[i].name;
	// 			followUserNameSpan.textContent = tweets[i].username;
	// 			followDateSpan.textContent = tweets[i].date;
	//
	// 			followNameSpan.classList.add('span-name');
	// 			followUserNameSpan.classList.add('span-user-name');
	// 			followDateSpan.classList.add('span-date');
	//
	// 			followSpanDiv.appendChild(followNameSpan);
	// 			followSpanDiv.appendChild(followUserNameSpan);
	// 			followSpanDiv.appendChild(followDateSpan);
	// 			followContent.textContent = tweets[i].content;
	//
	// 			followTweetDiv.classList.add('col-md-12');
	// 			followPicDiv.classList.add('col-md-2');
	// 			followSpanDiv.classList.add('col-md-10');
	// 			followContent.classList.add('col-md-10');
	// 			followTweetDiv.classList.add('panel');
	// 			followTweetDiv.classList.add('panel-default');
	// 			followContent.classList.add('panel-body')
	// 			followTweetDiv.classList.add('follow-tweet-div');
	// 			followTweetDiv.appendChild(followPicDiv);
	// 			followTweetDiv.appendChild(followSpanDiv);
	// 			followTweetDiv.appendChild(followContent);
	//
	// 			followTweets.appendChild(followTweetDiv);
	// 		}
	//
	// 	} // end of inner for loop
	// } // end of outer for loop

}) // end of event listener

var bird = document.getElementById('logo');

bird.addEventListener('click', function(){
	hideIt(profileCard);
	var followButton = document.getElementsByClassName('follow');
	for (i = 0 ; i < followButton.length ; i++) {
		showIt(followButton[i]);
	}
	theTweets.classList.remove('hide')
	theTweets.classList.add('live');
	followTweets.classList.remove('live');
	followTweets.classList.add('hide')
})



yourTweet.addEventListener('click', function(){
	var yourTweetDiv = document.getElementById('your-tweet-div');
	var yourTweetProfilePic = document.getElementById('your-tweet-profile-pic');

	yourTweetDiv.classList.add('your-tweet-div-expand');
	yourTweetProfilePic.classList.add('your-tweet-profile-pic-expand');
	yourTweet.classList.add('your-tweet-expand');
	showIt(tweetButton);
})

tweetButton.addEventListener('click', function() {
	tweetCount += 1;
	var tweetCounter = document.getElementById('tweet-counter');
		tweetCounter.textContent = tweetCount;
	var myTweet = {}
		myTweet.id = users[users.length-1].id;
		myTweet.name = users[users.length-1].name;
		myTweet.username = users[users.length-1].userName;
		myTweet.date = Date();
		myTweet.content = yourTweet.value;
		myTweet.pic = 'dummy.png';

	tweets.unshift(myTweet);
	following.unshift([myTweet.name, myTweet.id, myTweet.content]);
	clear(theTweets);
	clear(followTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
		buildTweets(tweets[i]);
	}

	compareTweetsToFollowing(tweets, following);
}); //end of event listener



function buildTweets(tweet) {
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
	buildSpanName.classList.add('tweet-header');
	buildSpanDate.classList.add('tweet-header');
	buildSpanUserName.classList.add('tweet-header');


	buildSpanDiv.appendChild(buildSpanName);
	buildSpanDiv.appendChild(buildSpanUserName);
	buildSpanDiv.appendChild(buildSpanDate);

	var buildContent = document.createElement('div');
	buildContent.classList.add('content');
	buildContent.classList.add('panel-body');
	buildContent.classList.add('col-md-10');
	buildContent.textContent = tweet.content;


	var buildButton = document.createElement('button');
	buildButton.textContent = 'Follow';
	buildButton.classList.add('btn');
	buildButton.classList.add('button');
	buildButton.classList.add('follow');
	buildButton.setAttribute('name', tweet.name);
	buildButton.setAttribute('id', tweet.id);
	buildButton.setAttribute('content', tweet.content);

	buildTweetDiv.appendChild(buildPicDiv);
	buildTweetDiv.appendChild(buildSpanDiv);
	buildTweetDiv.appendChild(buildContent);
	buildTweetDiv.appendChild(buildButton);
	buildTweetDiv.id = "tweet-div";

	theTweets.appendChild(buildTweetDiv);
}  // END OF BUILD FUNCTION, WHICH BUILDS TWEETS AND APPENDS

function buildFollowTweets(tweet) {
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


	var buildButton = document.createElement('button');
	buildButton.textContent = 'Follow';
	buildButton.classList.add('btn');
	buildButton.classList.add('button');
	buildButton.classList.add('follow');
	buildButton.setAttribute('name', tweet.name);
	buildButton.setAttribute('id', tweet.id);

	buildTweetDiv.appendChild(buildPicDiv);
	buildTweetDiv.appendChild(buildSpanDiv);
	buildTweetDiv.appendChild(buildContent);
	buildTweetDiv.appendChild(buildButton);
	buildTweetDiv.id = "tweet-div";

	followTweets.appendChild(buildTweetDiv);
}  // END OF BUILD FUNCTION, WHICH BUILDS TWEETS AND APPENDS

function compareTweetsToFollowing(theCollection, theFollowing) {
	for (var i = 0 ; i < theCollection.length ; i++) {
		for (var y = 0 ; y < theFollowing.length ; y++) {
			if (theCollection[i].id === theFollowing[y][1] && theCollection[i].content === theFollowing[y][2]) {
				buildFollowTweets(theCollection[i]);
			}
		}
	}
}

var seeMyTweets = document.getElementById('tweet-count-link');
seeMyTweets.addEventListener('click', function(){
clear(followTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
		if (tweets[i].id === userId) {
			buildFollowTweets(tweets[i]);
		}
	}

	var followButton = document.getElementsByClassName('follow');
	for (i = 0 ; i < followButton.length ; i++) {
		hideIt(followButton[i]);
	}
})


// SM0OTH SCROLL

var marginY = 0;
var destination = 0;
var speed = 10;
var scroller = null;

function initScroll(el) {
	destination = document.getElementById(el).offsetTop;
	scroller = setTimeout(function() {
		initScroll(el)
	}, 1);
	marginY = marginY + speed;
	if(marginY >= destination) {
		clearTimeout(scroller);
	}
	window.scroll(0, marginY);
	topbar.style.display = "block";
	mainContain.style.visibility = 'visible';
}

// END SMOOTH SCROLL

signIn.addEventListener('click', function(){
	vidloop.style.display = 'none';
	myModal.style.display = 'block';
})

window.onclick = function(event) {
		if (event.target == myModal) {
				myModal.style.display = "none";
    }
}

logIn.addEventListener('click', function(){
	if (userInput.value === 'username' && userPass.value === 'password') {
		dashLeft.style.visibility = 'visible';
		myModal.style.display="none";
		var yourTweetDiv = document.getElementById('your-tweet-div');
		yourTweetDiv.style.visibility = 'visible'
		toggleButton()
	}
})

// TOGGLE BUTTON VISIBILITY

function toggleButton(){
	var buttons = document.getElementsByClassName('follow');
	for (var i = 0 ; i < buttons.length ; i++) {
		if(buttons[i].classList.contains('hide')){
			buttons[i].classList.remove('hide');
		} else {
			buttons[i].classList.add('hide');
		}
	}
}


regButton.addEventListener('click', function(){
	myModal.style.display = 'none';
	regModal.style.display = 'block';
});

window.onclick = function(event) {
	if (event.target == regModal) {
		regModal.style.display = 'none';
	}
}

backMyModal.addEventListener('click', function(){
	myModal.style.display = 'block';
	regModal.style.display = 'none';
})

signUp.addEventListener('click', function(){
	regModal.style.display = 'none';
	dashLeft.style.visibility = 'visible';
	var yourTweetDiv = document.getElementById('your-tweet-div');
	yourTweetDiv.style.visibility = 'visible'
	var user = {
	userId: Math.random() * 1312412341235425423452345,
	userName: '@' + document.getElementById('reg-username').value,
	name: document.getElementById('reg-name').value,
	password: document.getElementById('reg-pass').value
}
	users.push(user);
	toggleButton();
	customProfile();
});

function customProfile(){
	var theProfileName = document.getElementById('profile-full-name');
	var theProfileUserName = document.getElementById('profile-user-name');
	theProfileName.textContent = users[users.length-1].name;
	theProfileUserName.textContent = users[users.length-1].userName;
}
