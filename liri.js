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


if (liriArgv === `my-tweets`){
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
		// console.log(response[0].text);
	for (var i = 0; i < response.length; i++){
			console.log(response[i].text);
		}
	})
};

// ----------------OMDB------------------------------------------------------------------------------
// run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047";
var mrNobody = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047";
var movie = process.argv[3];

request(queryUrl, function(error, response, body){
	var jsonData = JSON.parse(body);
		// console.log(jsonData);

	if (liriArgv === 'movie-this'){
		var movieResults = (
			"Title: " + jsonData.Title+"\r\n"+
			"Year: " + jsonData.Year+"\r\n"+
			"Imdb Rating: " + jsonData.imdbRating+"\r\n"+
			"Country: " + jsonData.Country+"\r\n"+
			"Language: " + jsonData.Language+"\r\n"+
			"Plot: " + jsonData.Plot+"\r\n"+
			"Actors: " + jsonData.Actors+"\r\n"+
			"Rotten Tomatoes Rating: " + jsonData.tomatoRating+"\r\n"
		)
		console.log(queryUrl);
	} else {
		request(mrNobody, function(error, response, body){
			console.log(body);
		})
	}
});
	 
 // ----------------------SPOTIFY-------------------------------------------------------------------------

var songSearch = process.argv[3];
 if (liriArgv === `spotify-this-song`){
	// var spotifyId = ({
	// 	SPOTIFY_ID: process.env.SPOTIFY_ID,
	// 	SPOTIFY_SECRET: process.env.SPOTIFY_SECRET
	// 	})

	spotify.search({ type: 'track', query: songSearch }, function(err, data) {
    if ( !err ) {
       console.log(data);
   	}   
	})
};

// =============================DO WHAT IT SAYS==========================================================
var logs = process.argv[3];

if (liriArgv === `do-what-it-says`){

}
fs.appendFile(logs, function(err){
	if (err) {
		console.log(err);
	} else {
		console.log("Content Added!")
	}
});
