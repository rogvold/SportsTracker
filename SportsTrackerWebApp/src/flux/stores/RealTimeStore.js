/**
 * Created by sabir on 15.07.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');


var RealTimeStore = Fluxxor.createStore({
    self: this,

    CHANNEL_NAME: 'sabir',

    initialize: function(){
        this.initPubNub();

        this.fakeMode = false;

        this.messages = [];

        this.initRandomTimer();

        this.bindActions(
            constants.RUN_FAKE_HEART_RATE, this.runFake
        );
    },

    runFake: function(){
        this.fakeMode = true;
        this.emit('change');
    },

    initPubNub: function(){
        if (this.pubnub != undefined){
            return;
        }
        this.pubnub = PUBNUB({
            publish_key : 'pub-c-57854c72-cdf1-486a-a139-f5dcbdf761e4',
            subscribe_key : 'sub-c-4b42af24-4a7b-11e6-8b3b-02ee2ddab7fe'
        });
        var self = this;
        this.pubnub.subscribe({
            channel : self.CHANNEL_NAME,
            message : function (message, envelope, channelOrGroup, time, channel) {
                self.onMessage(message);
            }
        })
    },

    onMessage: function(message){
        console.log('onMessage: message = ', message);
        this.messages.push(message);
        this.emit('change');
    },

    getLastMessage: function(){
        var messages = this.messages;
        if (messages == undefined || messages.length == 0){
            return undefined;
        }
        return messages[messages.length - 1];
    },

    makeRandom: function(){
        var hr = Math.floor(Math.random() * 50) + 40;
        var point = {
            t: new Date().getTime(),
            hr: hr
        }
        this.onMessage(point);
    },

    initRandomTimer: function(){
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                if (this.fakeMode == false){
                    return;
                }
                this.makeRandom();
            }.bind(this), 1000);
        }
    }


});

module.exports = RealTimeStore;