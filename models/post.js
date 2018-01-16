const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  createdAt:      { type: Date },
  updatedAt:      { type: Date },

  title:          { type: String, required: true },
  location:       { type: String, required: true },
  // longitude: { type: DataTypes.FLOAT },
  // latitude: { type: DataTypes.FLOAT },
  answers:        [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  author :        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  detail :        { type: String, required: false }
})

// Autopopulation
const autoPopulatePosts = function(next) {
  this.populate('answers').populate('author');
  next();
};

PostSchema.
  pre('find', autoPopulatePosts).
  pre('findOne', autoPopulatePosts);

PostSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('Post', PostSchema)
