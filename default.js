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
var currentUserId = '';
var currentUserName = '';
var currentUserUserName = '';
var tweetCounter = document.getElementById('tweet-counter');
var tweetCount = 0;


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
		if (array[i][1] !== currentUserId){
			var follower = array[i][0];
			var followerP = document.createElement('p');
			followerP.textContent = follower;
			followerP.classList.add('panel-body');
			followers.appendChild(followerP);
		}
	}
}


function addClass(element, classX, classY, classZ, classXx, classXy){
    element.classList.add(classX);
  if (typeof(classY) !== 'undefined' ) { element.classList.add(classY); }
  if (typeof(classZ) !== 'undefined') { element.classList.add(classZ); }
  if (typeof(classXx) !== 'undefined') { element.classList.add(classXx); }
  if (typeof(classXy) !== 'undefined') { element.classList.add(classXy); }
  return element; }

function appender(parent, firstChild, secondChild, thirdChild, fourthChild, fifthChild) {
  parent.appendChild(firstChild)
  if (typeof(secondChild) !== 'undefined') { parent.appendChild(secondChild); }
  if (typeof(thirdChild) !== 'undefined') { parent.appendChild(thirdChild); }
  if (typeof(fourthChild) !== 'undefined') { parent.appendChild(fourthChild); }
  if (typeof(fifthChild) !== 'undefined') { parent.appendChild(fifthChild); }
  return parent;
}

function addText(element, text) {
  element.textContent = text;
  return element
}

function setAttributes(element, attributeX, valueX, attributeY, valueY, attributeZ, valueZ, attributeXx, valueXx, attributeXy, valueXy, attributeXz, valueXz, attributeYx, valueYx, attributeYy, valueYy) {
  if (attributeX !== 'undefined') { element.setAttribute(attributeX, valueX); }
  if (attributeY !== 'undefined') { element.setAttribute(attributeY, valueY); }
  if (attributeZ !== 'undefined') { element.setAttribute(attributeZ, valueZ); }
  if (attributeXx !== 'undefined') { element.setAttribute(attributeXx, valueXx); }
  if (attributeXy !== 'undefined') { element.setAttribute(attributeXy, valueXy); }
  if (attributeXz !== 'undefined') { element.setAttribute(attributeXz, valueXz); }
  if (attributeYx !== 'undefined') { element.setAttribute(attributeYx, valueYx); }
  if (attributeYy !== 'undefined') { element.setAttribute(attributeYy, valueYy); }
}

function buildTweets(tweet) {
  var theTweet = document.createElement('div');
  addClass(theTweet,'col-xs-12','panel', 'panel-default', 'tweet-panel');
  theTweet.id = "tweet-div";
  if (tweet.isRetweet) {
    var theRetweet = document.createElement('div');
    addClass(theRetweet, 'the-retweet');
    var theRetweetIcon = document.createElement('i');
    addClass(theRetweetIcon, 'fa', 'fa-retweet', 'retweet-mini')
    var theRetweetTag = document.createElement('span');
    addClass(theRetweetTag, 'retweet-tag');
    addText(theRetweetTag, currentUserName + ' retweeted:');
    appender(theRetweet, theRetweetIcon, theRetweetTag);
    theTweet.appendChild(theRetweet);
  }
	var thePic = document.createElement('div');
  addClass(thePic, 'col-xs-2');
	var picture = document.createElement('img');
	picture.src = tweet.pic;
  addClass(picture, 'wall-pic');
  appender(thePic, picture);
  var tweetHeading = document.createElement('div');
  addClass(tweetHeading, 'col-xs-10');
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
  addClass(theContent, 'content', 'panel-body', 'col-xs-10');
  addText(theContent, tweet.content);
	var theButton = document.createElement('button');
  addText(theButton, 'Follow');
  addClass(theButton, 'btn', 'button', 'follow', tweet.id)
  setAttributes(theButton, 'name', tweet.name, 'id', tweet.id, 'content', tweet.content, 'tweetId', tweet.tweetid);
  var theRetweetButton = document.createElement('i');
  if (tweet.isRetweet) {
    addClass(theRetweetButton, 'fa' ,'fa-retweet', tweet.id, 're-tweeted', 'fa-lg'); } else { addClass(theRetweetButton, 'fa' ,'fa-retweet', tweet.id, 'retweet', 'fa-lg'); }
  // addClass(theRetweetButton, 'fa' ,'fa-retweet', tweet.id, 'retweet', 'fa-lg');
  setAttributes(theRetweetButton, 'userId', tweet.id, 'name', tweet.name, 'userName', tweet.username, 'date', tweet.date, 'content', tweet.content, 'pic', tweet.pic, 'tweetId', tweet.tweetid, 'isRetweet', tweet.isRetweet);

  appender(theTweet, thePic, tweetHeading, theContent, theButton, theRetweetButton);
  return theTweet
}  // END OF BUILD FUNCTION, WHICH BUILDS TWEETS AND APPENDS

// REMOVE FOLLOW OPTION FROM CURRENT USER
function removeFollow(aUserId) {
  for (var i = 0 ; i < tweets.length ; i++) {
    if(tweets[i].id === currentUserId){
      var buttons = document.getElementsByClassName(aUserId);
      for (var j = 0 ; j < buttons.length ; j++){
      buttons[j].classList.add('hide');
    }
}}}

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

function toggle(aClassName){
	var toToggle = document.getElementsByClassName(aClassName);
	for (var i = 0 ; i < toToggle.length ; i++) {
		if(toToggle[i].classList.contains('hide')){
			showIt(toToggle[i])
		} else {
      hideIt(toToggle[i])
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
toggle('follow');
toggle('retweet');


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
  toggle('follow')
});

var birdIcon = document.getElementById('logo');
birdIcon.addEventListener('click', function(){
  showIt(theTweets);
	hideIt(followTweets);
	toggle('follow');
  clear(theTweets);
  for (var i = 0 ; i < tweets.length ; i++){
  appender(theTweets, buildTweets(tweets[i]));
  }
  removeFollow(currentUserId);
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
	tweetCounter.textContent = tweetCount;
	var myTweet = {
		id : currentUserId,
		name : currentUserName,
		username : currentUserUserName,
		date : Date(),
		content : yourTweet.value,
		pic : 'dummy.png',
    tweetid: Math.random() * 998877889988776633
    }
  yourTweet.value = '';
	tweets.unshift(myTweet);
	following.unshift([myTweet.name, myTweet.id, myTweet.content]);
	clear(theTweets);
	clear(followTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
    appender(theTweets, buildTweets(tweets[i]));
	}

	compareTweetsToFollowing(tweets, following);
  removeFollow(currentUserId);
}); //end of event listener


var seeMyTweets = document.getElementById('tweet-count-link');
seeMyTweets.addEventListener('click', function(){
clear(followTweets);
clear(theTweets);
	for (var i = 0 ; i < tweets.length ; i++) {
		if (tweets[i].id === currentUserId || tweets[i].isRetweet) {
			appender(followTweets, buildTweets(tweets[i]));
      appender(theTweets, buildTweets(tweets[i]));
		}
	}
  toggle('follow');
  toggle('re-tweeted');
})

signIn.addEventListener('click', function(){
	vidloop.style.display = 'none';
	myModal.style.display = 'block';
})

window.addEventListener('click', function(event) {
		if (event.target == myModal) {
				myModal.style.display = "none";
    }
});

logIn.addEventListener('click', function(){
	if (userInput.value === 'username' && userPass.value === 'password') {
		dashLeft.style.visibility = 'visible';
		myModal.style.display="none";
		var yourTweetDiv = document.getElementById('your-tweet-div');
		yourTweetDiv.style.visibility = 'visible'
		toggle('follow');
	}
})

regButton.addEventListener('click', function(){
	myModal.style.display = 'none';
	regModal.style.display = 'block';
});

// window.addEventListener('click', function(event) {
// 	if (event.target == regModal) {
// 		regModal.style.display = 'none';
// 	}
// });

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
  currentUserId = user.userId;
  currentUserName = user.name;
  currentUserUserName = user.userName;
	users.push(user);
	toggle('follow');
  toggle('retweet');
	customProfile();
});

function customProfile() {
	var theProfileName = document.getElementById('profile-full-name');
	var theProfileUserName = document.getElementById('profile-user-name');
	theProfileName.textContent = users[users.length-1].name;
	theProfileUserName.textContent = users[users.length-1].userName;
}

// RETWEETING

function getTweet(target) {
  var newTweet = {
    id : target.getAttribute('userId'),
    name : target.getAttribute('name'),
    username : target.getAttribute('userName'),
    date : target.getAttribute('date'),
    content: target.getAttribute('content'),
    pic: target.getAttribute('pic'),
    tweetid: (Math.random() * 23887788998812312).toString(),
    retweetTag: target.getAttribute('tweetid'),
    isRetweet: true
  }
  return newTweet;
}


function getIndex(tag, theId) {
  function checkTweets(tweet) {
    return tweet[tag] === theId;
  }
  return tweets.findIndex(checkTweets)
}

document.body.addEventListener('click', function(event) {
  if (event.target.className.indexOf('retweet') !== -1 && event.target.className.indexOf('re-tweeted') === -1) {
    var targetTweetId = event.target.getAttribute('tweetid');
    tweetCount += 1;
    addText(tweetCounter, tweetCount);
    var originalTweet = event.target;
    tweets.unshift(getTweet(originalTweet));
    clear(theTweets);
    for (var i = 0 ; i < tweets.length ; i++){
      appender(theTweets, buildTweets(tweets[i]));
    }
    var targetTweet = document.querySelectorAll('[tweetid = "' + targetTweetId +'"]')[1];
    targetTweet.classList.remove('retweet');
    targetTweet.classList.add('re-tweeted');
  }
  else if(event.target.className.indexOf('re-tweeted') !== -1) {
    tweetCount -= 1;
    addText(tweetCounter, tweetCount);
    var tweetId = event.target.getAttribute('tweetid');

    if (event.target.getAttribute('isretweet') === 'undefined'){
      tweets.splice(getIndex('retweetTag', tweetId), 1);
    }
    else if (event.target.getAttribute('isretweet')==='true'){
      tweets.splice(getIndex('tweetid', tweetId), 1);
    }
    clear(theTweets);
    for (var j = 0 ; j < tweets.length ; j++){
      appender(theTweets, buildTweets(tweets[j]));
  }
  }
}); //end of event listener
