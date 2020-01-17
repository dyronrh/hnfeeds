var hnstory = require('../models/hnstory');
const axios = require('axios');
var mongoose = require('mongoose');
var hnstory_removed = require('../models/hnstory_removed');
var async = require("async");
var fetch = require("node-fetch");
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.hnstory_create = (req, res) => {
    // Request validation
    const HNStoryRemoved = mongoose.model('hnstory_removed', hnstory_removed);
    if(!req.body) {
        return res.status(400).send({
            message: "Story content can not be empty"
        });
    }
    if(req.body.story_title == null && req.body.title == null) {
        return res.status(400).send({
            message: "Story story_title or title can not be empty"
        });
    }

    // Create a Story
    if(req.body.story_title === null || !req.body.story_title){
        if(req.body.title.trim() != '' || req.body.title != null){
                var story = new hnstory({
                    objectID: req.body.objectID,
                    title: req.body.title,
                    story_title: req.body.story_title,
                    story_url: req.body.story_url,
                    url: req.body.url,
                    author: req.body.author,
                    created_at: req.body.created_at
                });
          }
        }else{
            var story = new hnstory({
                    objectID: req.body.objectID,
                    title: req.body.title,
                    story_title: req.body.story_title,
                    story_url: req.body.story_url,
                    url: req.body.url,
                    author: req.body.author,
                    created_at: req.body.created_at
                });        
        }

        hnstory_removed.findOne({'objectID':story.objectID}, function (err, result) {
            if (!result) {
              res.sendStatus(404);
              hnstory.findOne({'objectID':story.objectID}, function (err, result) {
                if (!result) {
              story.save()
              .then(data => {
                res.sendStatus(200);
                  res.send(data);
              }).catch(err => {
                  res.status(500).send({
                      message: err.message || "Something wrong while creating the story."
                  });
              });
            }
              });
              
            }

            console.log("Was delete thats item.")
      
      
          });


    // Save Story in the database

};



exports.hnstory_details = function (req, res) {
    hnstory.findById(req.params.id, function (err, hnstory) {
        if (err) return err;
        res.send(hnstory);
    })
};

exports.getmasiveHNStoryes = function(){
    var numPages = 0;
    var numItemNotIncerted = 0;


    axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
  .then(function (response) {
    // console.log(response.data.hits)
    // handle success
    numPages = response.data.nbPages
    for(var  i=0; i < numPages; i++){
        //incerted=getStoryaFromPage(i)
        incerted=getStries(i)
        console.log(i)
        numItemNotIncerted +=incerted
      
    }
   console.log("numItemNotIncerted")
   console.log(numItemNotIncerted)

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log(numItemNotIncerted)
  });

}


exports.hnstory_list = function (req, res) {
    hnstory.findById(req.params.id, function (err, hnstory) {
        if (err) return next(err);
        res.send(hnstory);
    })
};



exports.findAll = (req, res) => {
    hnstory.find().sort({"created_at": -1})
    .then(hnstorys => {
        res.send(hnstorys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving hnstorys."
        });
    });
};

exports.hnstory_update = function (req, res) {
    hnstory.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, hnstory) {
        if (err) return next(err);
        res.send('hnstory udpated.');
    });
};

exports.hnstory_delete = function (req, res) {
    var id = req.params.id
    hnstory.findById(id, function (err, hnstory) {
        if (err) return err;
        const HNStoryRemoved = mongoose.model('hnstory_removed', hnstory_removed);
        var hnstory_removed = new HNStoryRemoved({
            objectID: hnstory.objectID,
            title: hnstory.title,
            story_title: hnstory.story_title,
            story_url: hnstory.story_url,
            url: hnstory.url,
            author:hnstory.author,
            created_at: hnstory.created_at
        });


        hnstory_removed.save()
        .then(data => {
            res.send(data);
           //res.send('Deleted successfully!');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the story."
            });
        });
    
    })
    hnstory.findByIdAndRemove(req.params.id, function (err) {
       
        if (err) return err;
        //res.send('Deleted successfully!');
        
    })


};


exports.deletedStory = function (id)  {
    hnstory_removed.findOne({'objectID':id}, function (err, hnstory_removed) {
        //if (err) return err;
        if(hnstory_removed){
            console.log("test is true " +true)
            return true
        }

        if(!hnstory_removed){
            console.log("test is false " +false)
            return false
        }
    })
};

function getStries(page){
const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs&page="+page;
const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    for(var element in data.hits){
        jsonObject = { 
            "objectID": response.data.hits[element]["objectID"],
            "title": response.data.hits[element]["title"],
            "story_title": response.data.hits[element].story_title,
            "story_url": response.data.hits[element].story_url,
            "url": response.data.hits[element].url,
            "author": response.data.hits[element].author,
            "created_at":  response.data.hits[element].created_at
           } 
            if(jsonObject.story_title == null && jsonObject.title == null) 
            {
                console.log({
                    message: "Story story_title or title can not be empty"
                })
                notInserted+=1
            }
        
            // Create a Story
            if(jsonObject.story_title === null || !jsonObject.story_title){
                if(jsonObject.title != null){
                        var story = new hnstory({
                            objectID: jsonObject.objectID,
                            title: jsonObject.title,
                            story_title: jsonObject.title,
                            story_url: jsonObject.story_url,
                            url: jsonObject.url,
                            author: jsonObject.author,
                            created_at: jsonObject.created_at
                        });
                  }
                }else{
                    var story = new hnstory({
                            objectID: jsonObject.objectID,
                            title: jsonObject.title,
                            story_title: jsonObject.story_title,
                            story_url: jsonObject.story_url,
                            url: jsonObject.url,
                            author: jsonObject.author,
                            created_at:jsonObject.created_at
                        });        
                }
            console.log(jsonObject)

             await hnstory_removed.findOne({'objectID':jsonObject.objectID}, function (err, hnstory_removed) {
               //if (err) return err;
               if(hnstory_removed){
                   console.log("test is true " +true)
                   return true
               }
       
               if(!hnstory_removed){
                     story.save()
                   .then(data => {
                       console.log(data);
                   }).catch(err => {
                       console.log({
                           message: err.message || "Something wrong while creating the story."
                       });
                   }); 
                   console.log("test is false " +false)
                   return false
               }
           })
    }
  } catch (error) {
    console.log(error);
  }
};
getData(url);
}
