require('dotenv').config();
var fs = require("fs"); //reads and writes files
var liriArgv = process.argv[2];
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys.js");
// console.log(keys.twitter.consumer_key);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


if (liriArgv === `my-tweets`){
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
var movie = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
var mrNobody = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047";

if (liriArgv === "movie-this"){
	if (movie !== undefined){
		
		request(queryUrl, function(error, response, body){
		var jsonData = JSON.parse(body);
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
		console.log(movieResults);
	});
	} else {
		request(mrNobody, function(error, response, body){
			console.log(body);
		});
	}
}
	 
 // ----------------------SPOTIFY-------------------------------------------------------------------------

var songSearch = process.argv[3];
 if (liriArgv === `spotify-this-song`){
 	// var spotifyId = ({
		// id: process.env.SPOTIFY_ID,
		// secret: process.env.SPOTIFY_SECRET
		// })

	spotify.search({ type: 'track', query: songSearch }, function(err, data) {
    if ( !err ) {
       console.log(data.tracks.items);
       var song = JSON.stringify(data.tracks.items);
       fs.writeFile("song.js", song, function (err) {
       		if (err) {
       			console.log(err);
       		}
       });
   	}   
	})
};

// =============================DO WHAT IT SAYS==========================================================
// var logs = process.argv[3];

// if (liriArgv === `do-what-it-says`){

// }
// fs.appendFile(logs, function(err){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Content Added!")
// 	}
// });
