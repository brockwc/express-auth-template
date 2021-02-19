module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'You must be logged in to visit this page.')
    res.redirect('/auth/login')
  } else {
    next()
  }
}