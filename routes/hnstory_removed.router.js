var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var hnstory_removed_controller = require('../controllers/hnstory_removed.controller');



// a simple test url to check that all of our files are communicating correctly.
router.get('/hnstory_removed/test', hnstory_removed_controller.test);
router.get('/hnstory_removed/list', hnstory_removed_controller.findAll);


router.post('/hnstory_removed/create', hnstory_removed_controller.hnstory_removed_create);

router.get('/hnstory_removed/:id', hnstory_removed_controller.hnstory_removed_details);

router.put('/hnstory_removed/:id/update', hnstory_removed_controller.hnstory_removed_update);

router.delete('/hnstory_removed/:id/delete', hnstory_removed_controller.hnstory_removed_delete);


module.exports = router;