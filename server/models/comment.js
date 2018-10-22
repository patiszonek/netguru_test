var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    _movieId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    Comment
};