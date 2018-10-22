var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    Year: {
        type: String
    },
    Rated: {
        type: String
    },
    Released: {
        type: String
    },
    Runtime: {
        type: String
    },
    Genre: {
        type: String
    },
    Director: {
        type: String
    },
    Writer: {
        type: String
    },
    Actors: {
        type: String
    },
    Plot: {
        type: String
    },
    Language: {
        type: String
    },
    Country: {
        type: String
    },
    Awards: {
        type: String
    },
    Poster: {
        type: String
    },
    Metascore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    imdbVotes: {
        type: String
    },
    Type: {
        type: String
    },
    DVD: {
        type: String
    },
    BoxOffice: {
        type: String
    },
    Production: {
        type: String
    },
    Website: {
        type: String
    },
    Ratings: [{
        Source: {
            type: String,
        },
        Value: {
            type: String
        }
    }]

});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
    Movie
}