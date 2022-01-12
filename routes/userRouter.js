const express = require('express');
const User = require('../models/user')

const userRouter = express.Router();

userRouter.route('/')
    .get((req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /users');
    })
    .post((req, res, next) => {
        User.create(req.body)
            .then(user => {
                console.log('User Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /users');
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /users');
    });

userRouter.route('/:email')
    .get((req, res, next) => {
        User.findOne({ email: req.params.email })
            .then(user => {
                if (user) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                } else {
                    err = new Error(`User ${req.params.email} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /users/${req.params.email}`);
    })
    .put((req, res, next) => {
        User.findOne({ email: req.params.email })
            .then(user => {
                if (user) {
                    if (user.newuser.length < 1) {
                        user.newuser.push("heart");
                        user.save()
                            .then(user => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(user);
                            })
                            .catch(err => next(err));
                    }
                    else if (user.rewards.length < 6) {
                        user.rewards.push("heart");
                        user.save()
                            .then(user => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(user);
                            })
                            .catch(err => next(err));
                    } else {
                        res.statusCode = 403;
                        res.end('No more rewards available right now.');
                    }
                } else {
                    err = new Error(`User ${req.params.email} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));

    })
    .delete((req, res) => {
        User.findOneAndUpdate({ email: req.params.email }, {
            $pull: { rewards: "heart" }
        })
            .then(user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(err => next(err));
    });

module.exports = userRouter;
