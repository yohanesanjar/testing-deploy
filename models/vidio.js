const mongoose = require('mongoose');

const vidioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },   
    pic: {
        type: String,
        required: true

    }
});

const vidio = mongoose.model('vidio', vidioSchema);

module.exports = vidio;
