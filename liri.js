require('dotenv').config();
var fs = require("fs"); //reads and writes files
var liriArgv = process.argv[2];
var query = process.argv[3];
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

// logText();

// ----------------OMDB------------------------------------------------------------------------------
// run a request to the OMDB API with the movie specified
// var movie = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece";
var mrNobody = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=9dc2047";

if (liriArgv === "movie-this"){
	if (query !== undefined){
		
		request(queryUrl, function(error, response, body){
		var jsonData = JSON.parse(body);
		var movieResults = (
			"Title: " + jsonData.Title + "\r\n"+
			"Year: " + jsonData.Year + "\r\n"+
			"Imdb Rating: " + jsonData.imdbRating + "\r\n"+
			"Country: " + jsonData.Country + "\r\n"+
			"Language: " + jsonData.Language + "\r\n"+
			"Plot: " + jsonData.Plot + "\r\n"+
			"Actors: " + jsonData.Actors + "\r\n"+
			"Rotten Tomatoes Rating: " + jsonData.tomatoRating +"\r\n"
		)
		console.log(movieResults);
	})
		} else {
		request(mrNobody, function(error, response, body){
			console.log(body);
		});
	}
}


// logText();
	 
 // ----------------------SPOTIFY-------------------------------------------------------------------------

// var songSearch = process.argv[3];
 if (liriArgv === `spotify-this-song`){
 	
	spotify.search({ type: 'track', query: query, limit: 1})
 	 .then(function(data) {
       var song = data.tracks.items[0];
       
       var songResults = (
			"Title: " + song.name + "\r\n" +
			"Artist: " + song.artists[0].name + "\r\n" +
			"Album: " + song.album.name + "\r\n" +
			"Link: " + song.preview_url +"\r\n"
       )
       console.log(songResults)
   })
 	 
	  .catch(function(err) {
	    console.log(err);
	  });
};

// logText();

// =============================DO WHAT IT SAYS==========================================================
// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and 
//then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.

if (liriArgv === `do-what-it-says`){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
}
// In addition to logging the data to your terminal/bash window, 
//output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file. 
// Do not overwrite your file each time you run a command.

function logText(){
    fs.appendFile("log.txt", "LIRI: " + liriArgv + "\nQuery: " + query + "\n"); 
};
