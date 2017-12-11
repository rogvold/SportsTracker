/**
 * Created by sabir on 17.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactPlayer = require('react-player');

var PusherPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('PusherStore')],
    getDefaultProps: function(){
        return {
            url: 'https://www.youtube.com/watch?v=7jMlFXouPk8'
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('PusherStore');
        return {
            messages: store.messages,
            lastMessage: store.getLastMessage()
        }
    },

    getInitialState: function(){
        return {
            playing: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    getPlaying: function(){
        var lastMessage = this.state.lastMessage;
        var playing = (lastMessage == undefined) ? false : lastMessage.playing;
        return playing;
    },

    togglePlaying: function(){
        console.log('togglePlaying');

        var playing = !this.getPlaying();

        this.getFlux().actions.sendPusherMessage('sabir', 'sabir', {playing: playing});
    },

    send: function(){
        var playing = this.state.playing;
        this.getFlux().actions.sendPusherMessage('sabir', 'sabir', {playing: playing});
        //setTimeout(function(){
        //    this.setState({
        //        text: ''
        //    });
        //}.bind(this), 30);
    },

    componentWillUpdate: function(nextProps, nextState){
        var newMesages = nextState.messages;
        if (newMesages.length != this.state.messages){
            return true;
        }
    },

    render: function(){
        var messages = this.state.messages;
        var playing = this.getPlaying();

        return (
            <div style={this.componentStyle.placeholder} >

                <ReactPlayer url={this.props.url} playing={playing} />

                <button className={'ui button'} onClick={this.togglePlaying} >
                    toggle playing
                </button>

            </div>
        );
    }

});

module.exports = PusherPanel;