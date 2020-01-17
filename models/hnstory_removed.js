var mongoose = require('mongoose');

var HnnewsRemovedSchema = new mongoose.Schema({
        objectID: { type: Number, index: { unique: true  }},
        title: String,
        story_title: String,
        story_url: String,
        url: String,
        author: String,
        created_at:  { type: String, required: true } 
    }
);


function HnnewsRemovedSchema(objectID, title, story_title,story_url,url,author,created_at) {
    this.objectID =objectID
    this.title =title
    this.story_title=story_title
    this.story_url =story_url
    this.url=url
    this.author=author
    this.created_at=created_at
}
// Export the model
module.exports =  mongoose.model('hnstory_removed',   HnnewsRemovedSchema);

