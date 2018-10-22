const {Movie} = require('./../models/movie');
const {Comment} = require('./../models/comment');

const movies = [
    {
        Title: 'Movie I',
        imdbID: 'qwe123'
    },
    {
        Title: 'Movie II',
        imdbID: 'asd456'
    }
];

const comments = [
    {
        text: 'Comment I',
        author: 'Author One',
        _movieId: 'qwe123',
        createdAt: 555
    },
    {
        text: 'Comment I@',
        author: 'Author Two',
        _movieId: 'asd456',
        createdAt: 444
    }
];

const populateMovies = async () => {
    try{
        await Movie.remove({})
        var movieOne = await new Movie(movies[0]).save();
        var movieTwo = await new Movie(movies[1]).save();
    
        return Promise.all([movieOne, movieTwo]);
    }
    catch(e){
        throw new Exception(e);
    }
};

const populateComments = async () => {
    try{
        await Comment.remove({})
        var commentOne = await new Comment(comments[0]).save();
        var commentTwo = await new Comment(comments[1]).save();
    
        return Promise.all([commentOne, commentTwo]);
    }
    catch(e){
        throw new Exception(e);
    }
};

module.exports = {
    movies, 
    comments,
    populateMovies,
    populateComments
};