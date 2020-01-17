var mongoose = require('mongoose');

var HnnewsSchema = new mongoose.Schema({
    objectID: { type: Number, unique : true, required : true, dropDups: true },
    title: String,
    story_title: String,
    story_url: String,
    url: String,
    author: String,
    created_at:  { type: String, required: true } 
});


// Export the model
module.exports = mongoose.model('hnstory', HnnewsSchema);

