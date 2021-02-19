const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models")


// serializeUser - converts objects to a unique identifier
passport.serializeUser((user, cb) => {
  console.log('----- IN SERIALIZE USER FUNCTION', user, cb)

  cb(null, user.id)
})

// deserializeUser - takes the unique identifier and uses it 
// to find a record in the DB
passport.deserializeUser((id, cb) => {
  console.log('----- IN DESERIALIZE USER FUNCTION', id)
  db.user.findByPk(id).then(user => {
    cb(null, user)
  }).catch(cb)
})

// Define and configure the local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {

  console.log('----- IN STRATEGY CB USER FUNCTION', email, password)

  // see if the user exists
  db.user.findOne({
    where: { email: email }
  }).then( user => {
    // if there's a found user and that user's password 
    // matches the hashed password stored in the DB
    if (!user || !user.validPassword(password)) {
      cb(null, false)
    } else {
      cb(null, user)
    }
  }).catch(cb)

}))

module.exports = passport;