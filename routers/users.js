const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const users = require('../controllers/users');


router.route('/register')
    .get(users.register)
    .post(catchAsync(users.registerPost));

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginPost);

router.get('/logout', users.logout);


module.exports = router;