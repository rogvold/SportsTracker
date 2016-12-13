/**
 * Created by sabir on 16.07.16.
 */

var constants = require('../FluxConstants');

var RealTimeActions = {

    runFakeHeartRate: function(){
        this.dispatch(constants.RUN_FAKE_HEART_RATE);
    }

};

module.exports = RealTimeActions;