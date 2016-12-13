/**
 * Created by sabir on 17.07.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var Pusher = require('pusher-js');
//var Pusher = require('pusher');

var ParseAPI = require('../../api/ParseAPI');

var Parse = require('parse').Parse;

var PuserStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.initPusher();

        this.messages = [];

        this.bindActions(
            constants.SEND_PUSHER_MESSAGE, this.sendPusherMessage
        );
    },

    initPusher: function(){
        console.log('initPusher: Pusher = ', Pusher);

        if (this.pusher != undefined){
            return;
        }
        //this.pusherServer = new PusherServer({
        //    appId: '161086',
        //    key: '3eed46933cb0fc3713a7',
        //    secret: 'bd4302b0235cbb6c1692'
        //});

        var channelName = '';

        var sessionToken = ParseAPI.getSessionToken();

        console.log('Session Token = ' + sessionToken);

        this.pusher = new Pusher('3eed46933cb0fc3713a7', {
            //authEndpoint: 'https://api.parse.com/1/functions/authorizePusherChannel',
            authEndpoint: 'http://sportstracker.parseapp.com/pusherAuth',
            auth: {
                headers: {
                    'X-Parse-Session-Token': sessionToken,
                    'X-Parse-Application-Id': "DY9RPeNTtxZoi4rkuHU5VQpx6iZiqVj0EPdTPUDE",
                    'X-Parse-REST-API-Key': "nXBiK8HpMx3I0cheUm41WMEKKWUpoKV0QOhqy7VN"
                }
            }
        });


        this.channel = this.pusher.subscribe('private-sabir');

        this.channel.bind('pusher:subscription_succeeded', function() {
            //alert('pusher:subscription_succeeded success callback ');
            //var triggered = channel.trigger('client-someeventname', { your: data });
        });

        this.channel.bind('client-sabir', function(data) {
            this.consumeMessage(data.message);
            this.emit('change');
        }.bind(this));

    },

    consumeMessage: function(message){
        console.log('consume message: message = ', message);
        if (message == undefined){
            return;
        }
        this.messages.push(message);
    },

    getLastMessage: function(){
        var messages = this.messages;
        if (messages == undefined || messages.length == 0){
            return undefined;
        }
        return messages[messages.length - 1];
    },

    sendPusherMessage: function(payload){
        //if (this.pusher == undefined){
        //    return;
        //}
        //var channel = this.pusher.subscribe(payload.channel);

        //this.pusherServer.trigger(payload.channel, payload.event, { message: payload.message });
        var eventName = 'client-' + payload.event;

        this.consumeMessage(payload.message);

        this.channel.trigger('client-sabir', { message: payload.message });

        this.emit('change');

    }

});

module.exports = PuserStore;