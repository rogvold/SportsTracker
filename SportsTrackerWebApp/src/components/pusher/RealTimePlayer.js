/**
 * Created by sabir on 20.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactPlayer = require('react-player');

var ReactSlider = require('react-slider');

var CoolPreloader = require('../preloader/CoolPreloader');

var SportHelper = require('../../helpers/SportHelper');

var RealTimePlayer = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('PusherStore')],
    getDefaultProps: function(){
        return {

            //youtubeId: undefined,

            youtubeId: '7jMlFXouPk8',
            vimeoId: undefined

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
            duration: undefined,
            t: 0,
            seeked: false
        }
    },

    componentStyle: {
        placeholder: {
            width: 622,
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3
        },

        playerPlaceholder: {
            width: 600,
            height: 400,
            position: 'relative'
        },

        player: {
            width: '100%',
            height: '100%'
        },

        playerOverlay: {
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer'
        },

        controlsPlaceholder: {
            paddingTop: 5
        },

        buttonsPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            width: 30,
            fontSize: 20,
            lineHeight: '20px'
        },

        sliderPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            width: 470,
            paddingTop: 7
        },

        timerPlaceholder: {
            width: 50,
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            fontSize: 14,
            opacity: 0.8
        }

    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    getPlaying: function(){
        var lastMessage = this.state.lastMessage;
        var playing = (lastMessage == undefined) ? false : lastMessage.playing;
        return playing;
    },

    togglePlaying: function(){
        var playing = !this.getPlaying();
        this.getFlux().actions.sendPusherMessage('sabir', 'sabir', {playing: playing, t: this.state.t, command: 'playing'});
    },

    playerSeekTo: function(sec){
        console.log('playerSeekTo: sec = ', sec);
        var ref = this.getRef();
        var player = this.refs[ref];
        var frac = 1.0 * sec / this.state.duration;
        player.seekTo(frac);
        this.setState({
            t: sec,
            seeked: true
        });
    },

    onAfterChange: function(t){
        this.seekTo(t);
    },

    seekTo: function(sec){
        this.getFlux().actions.sendPusherMessage('sabir', 'sabir', {playing: true, t: sec, command: 'seek'});
    },

    getRef: function(){
        var v = (this.props.youtubeId == undefined) ? this.props.vimeoId : this.props.youtubeId;
        return ('player_') + v;
    },




    getPlayerUrl: function(){
        var vimeoId = this.props.vimeoId;
        var youtubeId = this.props.youtubeId;
        if (youtubeId != undefined){
            return ('https://www.youtube.com/watch?v=' + youtubeId);
        }
        if (vimeoId != undefined){
            return ('https://vimeo.com/' + vimeoId);
        }
        return undefined;
    },



    onDuration: function(sec){
        this.setState({
            duration: sec
        });
    },

    onProgress: function(data){
        var played = data.played;
        if (played == undefined){
            return;
        }
        var duration = this.state.duration;
        var t = duration * played;
        this.setState({
            t: t,
            seeked: false
        });
    },

    getT: function(){
        //var lastMessage = this.state.lastMessage;
        //var t = (lastMessage == undefined) ? 0 : lastMessage.t;
        //return t;
        return this.state.t;
    },

    componentWillUpdate: function(nextProps, nextState){
        var newMessages = nextState.messages;
        if (newMessages.length == this.state.messages){
            return false;
        }
        return true;
    },

    componentDidUpdate: function(prevProps, prevState){ //this shit is for seek
        var newMessages = this.state.messages;
        var oldMessages = prevState.messages;

        if (newMessages == undefined || newMessages.length == 0){
            return;
        }

        var l1 = (newMessages == undefined) ? 0 : newMessages.length;
        var l2 = (oldMessages == undefined) ? 0 : oldMessages.length;

        if (l1 != l2){
            console.log('---->>>>    L1 != L2!!!');
        }

        if (l1 == l2){
            return;
        }

        var message = newMessages[newMessages.length - 1];
        //var prevMessage = (oldMessages == undefined || oldMessages.length == 0) ? undefined : oldMessages[oldMessages.length - 1];
        var prevMessage = (newMessages == undefined || newMessages.length < 2) ? undefined : newMessages[newMessages.length - 2];


        console.log('componentDidUpdate: oldMessages, newMessages = ', oldMessages, newMessages);




        var t0 = (prevMessage == undefined) ? undefined : prevMessage.t;
        var t1 = prevState.t;
        var t2 = message.t;

        //if (l1 == l2){
        //    return;
        //}

        //if (message.command == 'seek' && (prevMessage == undefined || prevMessage.command != 'seek')){

        console.log('componentDidUpdate: t0, t1, t2 = ', t0, t1, t2);

        if (message.command == 'seek' && (prevMessage == undefined || prevMessage.command != 'seek')){

            //if (t1 == t2 || t0 == t2){
            //    return;
            //}

            //if (t1 == t2){
            //    return;
            //}

            if (t0 != t2){
                console.log('SEEKING TO ' + t2 + ' BECAUSE t0 != t2', t0, t2);
                this.playerSeekTo(t2);
            }

        }
    },

    render: function(){
        var url = this.getPlayerUrl();
        var playing = this.getPlaying();
        var t = this.getT();

        var currentTimeString = SportHelper.getTimeString(t * 1000);
        var totalTimeString = (this.state.duration == undefined) ? '' : SportHelper.getTimeString(this.state.duration * 1000);
        var ref = this.getRef();

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.playerPlaceholder}>

                    <div style={this.componentStyle.player}>
                        <ReactPlayer
                            ref={ref}
                            onDuration={this.onDuration}
                            width={'100%'}
                            height={'100%'}
                            url={url}
                            playing={playing} onProgress={this.onProgress}  />
                    </div>

                    <div style={this.componentStyle.playerOverlay} onClick={this.togglePlaying}></div>

                    {this.state.duration != undefined ? null :
                        <CoolPreloader />
                    }

                </div>

                <div style={this.componentStyle.controlsPlaceholder}>

                    <div style={this.componentStyle.buttonsPlaceholder}>

                        <span onClick={this.togglePlaying} style={{cursor: 'pointer'}} >
                            {playing == true ?
                                <span>
                                    <i className={'icon pause'} style={{marginRight: 0}} ></i>
                                </span>
                                :
                                <span>
                                    <i className={'icon play'} style={{marginRight: 0}} ></i>
                                </span>
                            }
                        </span>

                    </div>

                    <div style={this.componentStyle.timerPlaceholder}>
                        {currentTimeString}
                    </div>

                    <div style={this.componentStyle.sliderPlaceholder}>

                        <ReactSlider
                            value={t}
                            onChange={this.onAfterChange} max={this.state.duration}
                            min={0}
                            className={'my-slider'} >
                            <div className="my-handle"></div>
                        </ReactSlider>

                    </div>

                    <div style={this.componentStyle.timerPlaceholder}>
                        {totalTimeString}
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = RealTimePlayer;