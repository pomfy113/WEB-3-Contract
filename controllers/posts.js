const Post = require('../models/post')
const User = require('../models/user')
const Answer = require('../models/answer')
const utils = require('./utils')

module.exports = (app) => {
    app.get('/', (req, res) => {
        let bodytype = utils.checklog("view-all", req.user)
        Post.find().then((post) => {
            res.render('home', {post, bodytype, user: req.user})
          }).catch((err) => {
            console.log(err.message)
          })

    })
// Take this out when you're set; debugging
    app.get('/location', (req, res) => {
        let bodytype = utils.checklog("loc", req.user)
        Post.find({'location': req.query.q}).populate('author').then((post) => {
            res.render('home', {post, bodytype, user: req.user})
          }).catch((err) => {
            console.log(err.message)
          })
    })
  // CREATE

  app.post('/posts', function (req, res) {
      if (req.user) {
          // INSTANTIATE INSTANCE OF POST MODEL
          var post = new Post(req.body);
          post.author = req.user._id

          // SAVE INSTANCE OF POST MODEL TO DB
          post.save().then((post) => {
              return User.findById(req.user._id)
          }).then((user) => {
              user.posts.unshift(post);
              user.save();
              // REDIRECT TO THE NEW POST
              res.redirect('/posts/'+ post._id)
          }).catch((err) => {
              console.log(err.message);
          })
      } else {
          return res.status(401); //UNAUTHORIZED
      }
  });

  app.get('/posts/new', function (req, res) {
      var currentUser = req.user
      res.render('post-new', {currentUser: currentUser});
   })

   // Show game details
  app.get('/posts/:id', function (req, res) {
      let bodytype = utils.checklog("post", req.user)

      var currentUser = req.user;
      var currentAuthor = Post.author;

     // LOOK UP THE POST
     Post.findById(req.params.id).populate('author').then((post) => {
         res.render('post-show', { bodytype, post, user: req.user, currentUser })
       }).catch((err) => {
         console.log(err.message)
       })
   })

};
