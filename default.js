var tweets = JSON.parse(data);
var theTweets = document.getElementById('tweets');
var users = [];
var following =[];
var profileCard = document.getElementById('profile-card')
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



// list everyone that you are following
function listFollower(array) {
	var following = document.createElement('div');
  addText(following, 'Following:');
  addClass(following, 'panel-heading');
  appender(followers, following);

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


function addClass(element, classX, classY, classZ){
    element.classList.add(classX);
  if (typeof(classY) !== 'undefined' ) { element.classList.add(classY); }
  if (typeof(classZ) !== 'undefined') { element.classList.add(classZ); }
  return element; }

function appender(parent, firstChild, secondChild, thirdChild, fourthChild) {
  parent.appendChild(firstChild)
  if (typeof(secondChild) !== 'undefined') {
    parent.appendChild(secondChild);
  }
  if (typeof(thirdChild) !== 'undefined') {
    parent.appendChild(thirdChild);
  }
  if (typeof(fourthChild) !== 'undefined') {
    parent.appendChild(fourthChild);
  }
  return parent;
}

function addText(element, text) {
  element.textContent = text;
  return element
}

function buildTweets(tweet) {
  var theTweet = document.createElement('div');
  addClass(theTweet,'col-md-12','panel', 'panel-default');
  theTweet.id = "tweet-div";
	var thePic = document.createElement('div');
  addClass(thePic, 'col-md-2');
	var picture = document.createElement('img');
	picture.src = tweet.pic;
  addClass(picture, 'wall-pic');
  appender(thePic, picture);
  var tweetHeading = document.createElement('div');
  addClass(tweetHeading, 'col-md-10');
  var name = document.createElement('span');
  addText(name, tweet.name);
  addClass(name, 'span-name', 'tweet-header')
  var userName = document.createElement('span');
  addText(userName, tweet.username);
  addClass(userName, 'span-user-name', 'tweet-header');
  var date = document.createElement('span');
  addText(date, tweet.date);
  addClass(date, 'span-date', 'tweet-header');
  appender(tweetHeading, name, userName, date);
	var theContent = document.createElement('div');
  addClass(theContent, 'content', 'panel-body', 'col-md-10');
  addText(theContent, tweet.content);
	var theButton = document.createElement('button');
  addText(theButton, 'Follow');
  addClass(theButton, 'btn', 'button', 'follow')
	theButton.setAttribute('name', tweet.name);
	theButton.setAttribute('id', tweet.id);
	theButton.setAttribute('content', tweet.content);
  appender(theTweet, thePic, tweetHeading, theContent, theButton);
  return theTweet
}  // END OF BUILD FUNCTION, WHICH BUILDS TWEETS AND APPENDS

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
}   // END SMOOTH SCROLL

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

// CREATE ARRAY OF USERS
for (var i = 0 ; i < tweets.length ; i++) {
	addUser(tweets[i])
}

// CREATE INITIAL TWEET TIMELINE
for (var x = 0 ; x < tweets.length ; x++) {
  theTweets.appendChild(buildTweets(tweets[x]));
}
toggleButton()


// CHECK AN ARRAY TO SEE IF IT CONTAINS CANDIDATE
function check(list, candidate) {
	for (var i = 0; i < list.length ; i++) {
		if (list[i].indexOf(candidate) !== -1) {
      return true;
		}
	}
}

var followers = document.getElementById('followers')
document.body.addEventListener('click', function(event){
  clear(followers);

	if(event.target.className.indexOf('follow') !== -1) {
		var followingCounter = document.getElementById('following-counter');
		var name = event.target.getAttribute('name');
		var id = event.target.getAttribute('id');
		var content = event.target.getAttribute('content');
    event.target.classList.add('now-following')
		event.target.textContent = 'Following!'
		if (check(following, id) !== true){
				followingCount += 1;
				followingCounter.textContent = followingCount;
				following.push([name, id, content])
			} else if (typeof(following[0]) === 'undefined') {
        followingCount += 1;
				followingCounter.textContent = followingCount;
				following.push([name, id, content])
      }
	}
	listFollower(following);
}); // end of event listener

// DISPLAY ONLY YOUR FOLLOWERS' TWEETS
var home = document.getElementById('home');
var followTweets = document.getElementById('follow-tweets')
home.addEventListener('click', function(){
	vidloop.style.display = 'none';
	clear(followTweets);
	showIt(profileCard);
	hideIt(theTweets);
	showIt(followTweets);
	compareTweetsToFollowing(tweets, following);
  toggleButton()
});

var birdIcon = document.getElementById('logo');
birdIcon.addEventListener('click', function(){
	hideIt(profileCard);
  showIt(theTweets)
	hideIt(followTweets)
	toggleButton();
})

var yourTweet = document.getElementById('your-tweet');
yourTweet.addEventListener('click', function(){
	var theTweet = document.getElementById('your-tweet-div');
	var yourPic = document.getElementById('your-tweet-profile-pic');
  addClass(theTweet, 'your-tweet-div-expand');
  addClass(yourPic, 'your-tweet-profile-pic-expand');
  addClass(yourTweet, 'your-tweet-expand')
	showIt(tweetButton);
})

function compareTweetsToFollowing(theCollection, theFollowing) {
	for (var i = 0 ; i < theCollection.length ; i++) {
		for (var y = 0 ; y < theFollowing.length ; y++) {
			if (theCollection[i].id === theFollowing[y][1] && theCollection[i].content === theFollowing[y][2]) {
        followTweets.appendChild(buildTweets(theCollection[i]))
			}
		}
	}
}

tweetButton.addEventListener('click', function() {
	tweetCount += 1;
	var tweetCounter = document.getElementById('tweet-counter');
		tweetCounter.textContent = tweetCount;
	var myTweet = {
		id : users[users.length-1].userId,
		name : users[users.length-1].name,
		username : users[users.length-1].userName,
		date : Date(),
		content : yourTweet.value,
		pic : 'dummy.png'
    }

	tweets.unshift(myTweet);
	following.unshift([myTweet.name, myTweet.id, myTweet.content]);
	clear(theTweets);
	clear(followTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
		buildTweets(tweets[i]);
    appender(theTweets, buildTweets(tweets[i]));
	}

	compareTweetsToFollowing(tweets, following);
}); //end of event listener


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

function customProfile() {
	var theProfileName = document.getElementById('profile-full-name');
	var theProfileUserName = document.getElementById('profile-user-name');
	theProfileName.textContent = users[users.length-1].name;
	theProfileUserName.textContent = users[users.length-1].userName;
}
