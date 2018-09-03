const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  date: String,
  title: String,
  text: String,
  comments: Object
});

module.exports = mongoose.model('Article', articleSchema);
