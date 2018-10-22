const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Movie} = require('./../models/movie');
const {Comment} = require('./../models/comment');
const {populateMovies, populateComments} = require('./seed');

beforeEach(populateMovies);
beforeEach(populateComments);

describe('POST /movies', () => {
    var title = 'Inception';
    it('should create a new movie', (done) => {
        request(app)
        .post('/movies')
        .send({title})
        .expect(200)
        .expect((res) => {
            expect(res.body.Title).toBe(title);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Movie.find({Title: title}).then((movies) => {
                expect(movies.length).toBe(1);
                expect(movies[0].Title).toBe(title);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create movie if invalid parameter', (done) => {
        var title = 'Incepti';
        request(app)
        .post('/movies')
        .send({title})
        .expect(404)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Movie.find().then((movies) => {
                expect(movies.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create movie if no parameter', (done) => {
        var title = '';
        request(app)
        .post('/movies')
        .send({title})
        .expect(404)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Movie.find().then((movies) => {
                expect(movies.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /movies', () => {
    it('should get all movies', (done) => {
        request(app)
        .get('/movies')
        .expect(200)
        .expect((res) => {
            expect(res.body.movies.length).toBe(2);
        })
        .end(done);
    });
});

describe('POST /comments', () => {
    it('should create a new comment', (done) => {
        var comment = {
            text: 'New comment',
            author: 'Author Third',
            _movieId: 'qwe123',
            createdAt: new Date().getTime()
        };
        request(app)
        .post('/comments')
        .send(comment)
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(comment.text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Comment.find({_movieId: comment._movieId}).then((comments) => {
                expect(comments.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create a new comment if no data', (done) => {
        request(app)
        .post('/comments')
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Comment.find().then((comments) => {
                expect(comments.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create a new comment if invalid data', (done) => {
        request(app)
        .post('/comments')
        .send({
            text: 'ABC',
            author: 'author'
        })
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Comment.find().then((comments) => {
                expect(comments.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /comments', () => {
    it('should get all comments relevant to movie', (done) => {
        var _movieId = 'qwe123';
        request(app)
        .get('/comments')
        .send({_movieId})
        .expect(200)
        .expect((res) => {
            expect(res.body.comments.length).toBe(1);
        })
        .end(done);
    });

    it('should not get comments if none movie id', (done) => {
        request(app)
        .get('/comments')
        .expect(404)
        .end(done);
    });

    it('should not get comments if invalid movie id', (done) => {
        var _movieId = 'uio789';
        request(app)
        .get('/comments')
        .send({_movieId})
        .expect(404)
        .end(done);
    });
});