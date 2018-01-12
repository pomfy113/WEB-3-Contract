const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    createdAt        : { type: Date }
  , updatedAt        : { type: Date }
  , content          : { type: String, required: true }
  , comments         : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
  , author           : { type: Schema.Types.ObjectId, ref: 'User', required: true }
  , upVotes          : []
  , downVotes        : []
  , voteScore        : { type: Number, default: 0 }
});

// Autopopulation
const autoPopulateAnswers = function(next) {
  this.populate('comments').populate('author');
  next();
};

AnswerSchema.
  pre('find', autoPopulateAnswers).
  pre('findOne', autoPopulateAnswers);

  AnswerSchema.pre('save', function(next){
    // SET createdAt AND updatedAt
    var now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    }

    next();
  });

module.exports = mongoose.model('Answer', AnswerSchema);
