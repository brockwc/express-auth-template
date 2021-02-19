const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models")


// serializeUser - converts objects to a unique identifier


// deserializeUser - takes the unique identifier and uses it 
// to find a record in the DB


// Define and configure the local strategy


module.exports = passport;