const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  createdAt:      { type: Date },
  updatedAt:      { type: Date },

  title:          { type: String, required: true },
  location:       { type: String, required: true },
  // longitude: { type: DataTypes.FLOAT },
  // latitude: { type: DataTypes.FLOAT },
  // comments:       [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author :        { type: Schema.Types.ObjectId, ref: 'User', required: true }
})


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
