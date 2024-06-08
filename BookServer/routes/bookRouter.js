var express = require('express');
var Books = require('../models/books');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var cors = require('./cors');
const { verify } = require('jsonwebtoken');

var BooksRouter = express.Router();
BooksRouter.use(bodyParser.json());

BooksRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Books.find({})
            .populate('Comments.Author')
            .then((books) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ books });
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Books.create(req.body)
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ status: "True", book });
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("You cannnot update on /books");
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Books.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });


BooksRouter.route('/:book_id')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

    .get(cors.cors, (req, res, next) => {
        Books.findById(req.params.book_id)
            .populate('Comments.Author')
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('You cannot POST on /books/' + req.params.book_id);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Books.findByIdAndUpdate(req.params.book_id, { $set: req.body }, { new: true })
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Books.findByIdAndRemove(req.params.book_id)
            .then((del) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(del);
            }, (err) => next(err))
            .catch((err => next(err)))
    });

BooksRouter.route('/:book_id/comment')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, err) => {
        Books.findById(req.params.book_id)
            .populate('Comments.Author')
            .then((book) => {
                if (book != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(book.Comments);
                }
                else {
                    var Err = new Error("Book with id : " + req.params.book_id + " not found.");
                    Err.status = 404;
                    return next(Err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Books.findById(req.params.book_id)
            .populate('Comments.Author')
            .then((book) => {
                if (book != null) {
                    req.body.Author = req.user._id;
                    book.Comments.push(req.body);
                    book.save()
                        .then((book) => {
                            Books.findById(book._id)
                                .populate('Comments.Author')
                                .then((book) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(book)
                                })
                        }, (err) => next(err))
                        .catch((err) => next(err))
                }
                else {
                    var Err = new Error("Book with id : " + req.params.book_id + " not found.");
                    Err.status = 404;
                    return next(Err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('You cannot update on /books/' + req.params.book_id + '/comment.');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Books.findById(req.params.book_id)
            .then((book) => {
                if (book != null) {
                    for (var i = book.Comments.length - 1; i >= 0; i--) {
                        book.Comments.id(book.Comments[i]._id).remove();
                    }
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err))
                        .catch((err) => next(err))
                }
                else {
                    err = new Error('Mobile ' + req.params.mobile_id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            })
    });

BooksRouter.route('/:book_id/comment/:commentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Books.findById(req.params.book_id)
            .then((book) => {
                if (book != null && book.Comments.id(req.params.commentId) != null) {
                    book.Comments.id(req.params.commentId).remove();
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json')
                            res.json(book)
                        }, (err) => next(err))
                }
            })
    })



module.exports = BooksRouter;