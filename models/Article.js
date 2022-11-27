const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true

    }    

});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
