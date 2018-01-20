require('dotenv').config();
var fs = require("fs"); //reads and writes files
var liriArgv = process.argv[2];
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var keys = require("./keys.js");
// console.log(keys.twitter.consumer_key);
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


if (liriArgv ===  `my-tweets`){
	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
		var params = {
		    screen_name: 'dewinurdin5',
		    count: 20
		}

		client.get("statuses/user_timeline", params, function(error, response){
			if (error){
				console.log(error);
			} 
			console.log(response[0].text);
		});
	
		
}

// ----------------OMDB------------------------------------------------------------------------------
// run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047";

var movie = process.argv[3];

// request(queryUrl, function(err, response, body){
// 	if (movie === true){
		
		
// 		console.log(
// 			 	"Title: " + jsonData.Title+"\r\n"+
// 				"Year: " + jsonData.Year+"\r\n"+
// 				"Imdb Rating: " + jsonData.imdbRating+"\r\n"+
// 				"Country: " + jsonData.Country+"\r\n"+
// 				"Language: " + jsonData.Language+"\r\n"+
// 				"Plot: " + jsonData.Plot+"\r\n"+
// 				"Actors: " + jsonData.Actors+"\r\n"+
// 				"Rotten Tomatoes Rating: " + jsonData.tomatoRating+"\r\n"+
// 				"Rotten Tomatoes URL: " + jsonData.tomatoURL + "\r\n" 
// 			 )	
		
// 	} else {
// 		request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047",function(error, response,body){
//                 console.log(body);
	
// })


// 	console.log(movieResults);
 // -----------------TWITTER-------------------------------------------------------------------------
 // Inside liri.js, enter your Twitter username in the params object to retrieve your last 20 tweets
 




// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

//npm install dotenv --save
// require('dotenv').config()


//Create a .env file in the root directory of your project. Add environment-specific 
//variables on new lines in the form of NAME=VALUE. For example:
// DB_HOST=localhost
// DB_USER=root
// DB_PASS=s1mpl3


//process.env now has the keys and values you defined in your .env file.
// var db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })