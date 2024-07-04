const express= require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const author = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(author.registeruser)
    .post(catchAsync(author.registersuccess))

router.route('/login')
    .get(author.loginyo)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), author.loginsucess)

router.get('/logout', author.logoutyo); 

module.exports = router;        