const express = require('express');
const router = express.Router();
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
    
    // At this point in the request, is the user's password hashed?
    console.log('----------------')
    console.log(user)
    console.log('----------------')

    if (created) {
      // success
      console.log(`${user.name} was created!`)
      res.redirect('/')
    } else {
      // user already exists, so we redirect
      console.log('Email already exists')
      res.redirect('/auth/signup')
    }
  }).catch(error => {
    // if an error occurs, console log the error message
    console.log(`An error occurred: ${ error.message }`)
    res.redirect('/auth/signup')
  })
})

router.get('/login', (req, res) => {
  res.render('auth/login');
});

module.exports = router;
