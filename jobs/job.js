var cron = require('node-cron');
var hnstory_controller = require('../controllers/hnstory.controller'); 


  exports.get_hnews = function () {
    cron.schedule('* * 1 * *', () => {
        console.log('running a task every minute');
        //hnstory_controller.deletedStory(21624007)

        hnstory_controller.getmasiveHNStoryes()
      });
};
