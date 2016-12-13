/**
 * Created by sabir on 17.07.16.
 */

var contants = require('../FluxConstants');

var PusherActions = {

    sendPusherMessage: function(channelName, eventName, message){
        console.log('sendPusherMessage: message = ', message);
        this.dispatch(contants.SEND_PUSHER_MESSAGE, {message: message, channel: channelName, event: eventName});
    }

};

module.exports = PusherActions;