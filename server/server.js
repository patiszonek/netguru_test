require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');

var {Movie} = require('./models/movie');
var {Comment} = require('./models/comment');


var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

/**
 * Create new movie
 */
app.post('/movies', async (req, res) => {
    try{
        var movieResponse = {Response: 'False'};//await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${req.body.title}`);
        if(movieResponse.data.Response === 'False'){
            return res.status(404).send(movieResponse.data.Error);
        }else{
            var movie = new Movie(movieResponse.data);

            var document = await movie.save();
            res.send(document);
        }
    }
    catch(e){
        res.status(400).send(e);
    }
});

/**
 * Fetch movies 
 */
app.get('/movies', async (req, res) => {
    try{
        var movies = await Movie.find({})
        if(!movies){
            return res.status(404).send('Not found');
        }else{
            res.send({movies});
        }
    }
    catch(e){
        res.status(400).send(e);
    }
});

/**
 * Create new comment
 */
app.post('/comments', async (req, res) => {
    try{
        var body = _.pick(req.body, ['text', 'author', '_movieId']);
        body.createdAt = new Date().getTime();
        var comment = new Comment(body);

        var document = await comment.save();
        res.send(document);
    }
    catch(e){
        res.status(400).send(e);
    }
});

/**
 * Fetch comments
 */
app.get('/comments', async (req, res) => {
    try{
        var _movieId = req.body._movieId;
        var comments = await Comment.find({_movieId})
        if(comments.length === 0){
            return res.status(404).send('Not found');
        }else{
            res.send({comments});
        }
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log(`Server started up on port ${port}`);
});

module.exports = {
    app
};