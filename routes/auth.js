const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig')
const db = require("../models")

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  // find or create the user
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      // success
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and user logged in!'
      })(req, res)
    } else {
      // user already exists, so we redirect
      req.flash('error', 'Email already exists')
      res.redirect('/auth/signup')
    }
  }).catch(error => {
    // if an error occurs, console log the error message
    req.flash('error', error.message)
    res.redirect('/auth/signup')
  })
})

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in!',
  failureFlash: 'Invalid username and/or password.'
}))

router.get('/logout', (req, res) => {
  // .logout() is added to the req object by passport
  req.logout()
  req.flash('success', 'You have logged out!')
  res.redirect('/')
})

module.exports = router;
