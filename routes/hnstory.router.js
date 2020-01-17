var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var hnstory_controller = require('../controllers/hnstory.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', hnstory_controller.test);
router.get('/list', hnstory_controller.findAll);
router.get('/refresh', hnstory_controller.getmasiveHNStoryes);


router.post('/create', hnstory_controller.hnstory_create);

router.get('/:id', hnstory_controller.hnstory_details);

router.put('/:id/update', hnstory_controller.hnstory_update);

router.delete('/:id/delete', hnstory_controller.hnstory_delete);


module.exports = router;