const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for article
const ArticleSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The article title text field is required']
  }
})

//create model for todo
const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;