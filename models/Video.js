const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
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

const Video = mongoose.model('video', videoSchema);

module.exports = Video;
