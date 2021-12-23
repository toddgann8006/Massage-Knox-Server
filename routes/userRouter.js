const express = require('express');
const userRouter = express.Router();

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the users to you');
    })
    .post((req, res) => {
        res.end(`Will add the user: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /users');
    })
    .delete((req, res) => {
        res.end('Deleting all users');
    });

module.exports = userRouter;