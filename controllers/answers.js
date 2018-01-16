const Post = require('../models/post')
const Answer = require('../models/answer')

module.exports = (app) => {
    app.post('/posts/:postId/comments', function (req, res) {
        // If not logged in, do this
        if (req.user == null) {
            res.redirect('/login');
            return
        }
        // New comment for answer
        let answer = new Answer(req.body);
        answer.author = req.user
        // Find the original answer to put new comment on
        Post.findById(req.params.postId)
        .then((post) => {
            post.answers.unshift(answer)
            return post.save()
        }).then((post) => {
            return answer.save()
        }).then(() => {
            res.redirect('/posts/' + req.params.postId)
        }).catch((err) => {
            console.log(err.message, "Could not save comment!")
            res.send(err.message)
        })
    })

    // New comments
    app.get('/comments/:commentid/new', (req, res) => {
        // Get the original comment for viewing as well
        Comment.findById(req.params.commentid)
        .then((comment) => {
            res.render('comment-new', {comment});
        })
    })

    // Voting up; uses AJAX/jquery to get here
    app.put('/comments/:answerId/vote-up', (req, res) => {
        // Find answer
        Answer.findById(req.params.answerId)
        .then((answer) => {
            // Must be logged in to alter
            if(req.user === null){
                res.status(401).send("Must be logged in!");
            }
            // If user is inside list of people who already voted, deny
            else if(answer.upVotes.includes(req.user._id)){
                res.status(401).send("Already voted up");
            }
            // Otherwise, change score
            else{
                // If you already downvoted, neutralize it
                if (answer.downVotes.includes(req.user._id)){
                    answer.downVotes.pull(req.user._id)
                }
                // Else, add to upvotes
                else{
                    answer.upVotes.push(req.user._id)
                }
                answer.voteScore = answer.voteScore + 1
                answer.save();

                let response = {
                    "success" : "Updated Successfully",
                    "status" : 200,
                    "id": req.params.answerId,
                    "score": answer.voteScore
                }

                res.end(JSON.stringify(response));
            }
        })
    })

    // Voting up; uses AJAX/jquery to get here
    app.put('/comments/:answerId/vote-down', (req, res) => {
        // find answer
        Answer.findById(req.params.answerId)
        .then((answer) => {
            // Must be logged in to alter
            if(req.user === null){
                res.status(401).send("Must be logged in!");
            }
            // If user is inside list of people who already voted, deny
            else if(answer.downVotes.includes(req.user._id)){
                res.status(401).send("Already voted down");
            }
            // Otherwise, change score
            else{
                // If already upvoted, neutralize
                if (answer.upVotes.includes(req.user._id)){
                    answer.upVotes.pull(req.user._id)
                }
                // Else, usual
                else{
                    answer.downVotes.push(req.user._id)
                }

                answer.voteScore = answer.voteScore - 1
                answer.save();
                let response = {
                    "success" : "Updated Successfully",
                    "status" : 200,
                    "id": req.params.answerId,
                    "score": answer.voteScore
                }

                res.end(JSON.stringify(response));
            }
        })
    })
};
