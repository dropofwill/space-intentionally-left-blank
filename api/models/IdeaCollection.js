/**
* IdeaCollection - Container for ideas
* @file
*/
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // Which board the collection belongs to
  boardId: {
    type: String,
    required: true,
  },

  ideas: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Idea',
    },
  ],

  // whether the idea collection is draggable
  draggable: {
    type: Boolean,
    default: true,
  },

  // Last user to have modified the collection
  lastUpdated: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// statics
schema.statics.findByIndex = function(boardId, index) {
  return this.find({boardId: boardId})
  .select('-_id -__v')
  .populate('ideas', 'content -_id -__v -boardId')
  .then((collections) => collections[index]);
};

const model = mongoose.model('IdeaCollection', schema);


module.exports.schema = schema;
module.exports.model = model;
