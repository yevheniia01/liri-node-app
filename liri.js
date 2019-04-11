
 require("dotenv").config();
 var keys = require("./keys.js");
 var request = require("request");
 var moment = require("moment");
 var fs = require('fs');
 var axios = require("axios");
 
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify({
   id: "c5987c6f148b4651ad0beb36bfb11a6a",
   secret: "2ce328cfaf3445e7b3038c48621667b8"
});
//We can search with two words//
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}
//switch cases
let command = process.argv[2];
let secondCommand = process.argv[3];
switch(command){
    case('spotify-this-song'):
        if(secondCommand){
            spotifythissong(secondCommand)
        }else{
            spotifythissong("the sign")
    }
    break;
    case('concert-this'):
        if(secondCommand){
            bandintown(secondCommand)
        }else{
            bandintown('scorpions')
    }
    break;
    case('movie-this'):
        if(secondCommand){
            omdb(secondCommand)
        }else{
        console.log("-------------If you haven't watched Mr. Nobody then you should----------------------")
        omdb('Mr. Nobody')
    }
    break;
    case('do-what-it-says'):
         doThing();
}
//Spotify function//
function spotifythissong(song){
spotify.search({ type: 'track', query: song}, function(err, data) {
   if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
       var song = data.tracks.items[0];
       for(i=0; i<song.artists.length; i++){
       console.log("----ARTIST: "+song.artists[i].name +" ----");
       console.log("----SONG NAME: "+song.name+" ----");
       console.log("----PREVIEW LINK: "+song.preview_url+" ----");
       console.log("----ALBUM: "+song.album.name+" ----");
       console.log('----------------------------------------------------------------------------------------------------');
       console.log('----------------------------------------------------------------------------------------------------');
    }
  })
}
function bandintown(artist){
   axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
       function(response){
        console.log("------Name of the venue:", response.data[0].venue.name+ "------");
        console.log("------Venue location:", response.data[0].venue.city + "------");
        var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("------Date of the Event:", eventDate + "------");
       }
   )
}
function omdb(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ddb9dae5&tomatoes=true&r=json").then(
        function(response){
            //console.log(response)
            console.log("Movie Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("RottenTomato Rating: " + response.data.tomatoRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )
}
function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
      spotifythissong(txt[1]);
    });
  }
 

 