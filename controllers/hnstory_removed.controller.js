var hnstory_removed = require('../models/hnstory_removed');
var mongoose = require('mongoose');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.hnstory_removed_create = (req, res) => {
    // Request validation
    const HNStoryRemoved = mongoose.model('hnstory_removed', hnstory_removed);
    if(!req.body) {
        return res.status(400).send({
            message: "Story content can not be empty"
        });
    }else{     var hnstory_removed = new HNStoryRemoved({
                    objectID: req.body.objectID,
                    title: req.body.title,
                    story_title: req.body.title,
                    story_url: req.body.story_url,
                    url: req.body.url,
                    author: req.body.author,
                    created_at: req.body.created_at
                });}

    // Create a Story
 


    // Save Story in the database
    hnstory_removed.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the story."
        });
    });
};



exports.hnstory_removed_details = function (req, res) {
    hnstory_removed.findOne(req.params.objectID, function (err, hnstory_removed) {
        if (err) return next(err);
        res.send(hnstory_removed);
    })
};



exports.hnstory_removed_list = function (req, res) {
    hnstory_removed.findById(req.params.id, function (err, hnstory_removed) {
        if (err) return next(err);
        res.send(hnstory_removed);
    })
};



exports.findAll = (req, res) => {
    hnstory_removed.find()
    .then(hnstorys => {
        res.send(hnstorys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving hnstorys."
        });
    });
};

exports.hnstory_removed_update = function (req, res) {
    hnstory_removed.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, hnstory_removed) {
        if (err) return next(err);
        res.send('hnstory udpated.');
    });
};

exports.hnstory_removed_delete = function (req, res) {
    hnstory_removed.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

