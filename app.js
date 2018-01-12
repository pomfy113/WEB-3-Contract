const express = require('express')
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
// Used for authentication
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
// It's express
const app = express()

const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));


// Public folder
app.use(express.static('public'))
// Cookie Parser
app.use(cookieParser());


// View Engine - Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Database - Mongoose
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/WEB-3-Project', {useMongoClient: true});

// // Authorization
let checkAuth = (req, res, next) => {
  // If there's a cookie, they should be logged in
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    // Success! Decode the token, then put that payload into req.user
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next()
}

// Run checkAuth
app.use(checkAuth)
const utils = require('./controllers/utils.js')

require('./controllers/auth.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/answers.js')(app);



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
