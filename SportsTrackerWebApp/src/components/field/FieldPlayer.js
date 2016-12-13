/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Field = require('./Field');
var TestField = require('./TestField');

var FieldSlider = require('./slider/FieldSlider');

var SportHelper = require('../../helpers/SportHelper');

var moment = require('moment');

var FieldPlayer = React.createClass({
    getDefaultProps: function () {
        return {

            field: undefined,

            players: SportHelper.generateFakeFootballUsers(22),

            dt: 0.2 * 1000,

            showTrace: false,

            traceDuration: 30 * 1000,

            shouldNumerate: true,

            onPointClick: function(userId){

            }

        }
    },

    getInitialState: function () {
        return {
            t: 0,
            status: 'playing',
            speed: 5,
            statusBeforeSeeking: 'playing'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initTimer();
    },

    componentWillUnmount: function(){
        this.destroyInterval();
    },

    componentStyle: {
        placeholder: {
            width: 720,
            margin: '0 auto'
        },

        topPlaceholder: {
            backgroundColor: '#fffcf0'
        },

        fieldPlaceholder: {
            width: 720
            //margin: '0 auto'
        },

        controlsPlaceholder: {
            marginTop: 5,
            //borderTop: '1px solid #f9cdad',
            paddingTop: 5,
            width: 720
        },

        buttonsPlaceholder: {
            width: 40,
            display: 'inline-block',
            verticalAlign: 'top',
            //textAlign: 'center',
            fontSize: 30,
            cursor: 'pointer',
            opacity: 0.8
        },

        sliderPlaceholder: {
            width: 530,
            display: 'inline-block',
            verticalAlign: 'top',
            paddingTop: 7
        },

        timerPlaceholder: {
            width: 75,
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            fontSize: 16,
            opacity: 0.8
        }

    },

    onTimeChange: function(t){
        var statusBeforeSeeking = this.state.statusBeforeSeeking;
        this.setState({
            t: t,
            status: statusBeforeSeeking
        });
    },

    pause: function(){
        this.setState({
            status: 'paused'
        });
    },

    play: function(){
        this.setState({
            status: 'playing'
        });
    },

    onTick: function(){
        var status = this.state.status;
        if (status == 'paused'){
            return;
        }
        var dt = this.props.dt;
        var t = this.state.t + this.state.speed * dt;
        var maxT = this.getMaxT();
        if (t >= maxT){
            this.setState({
                t: maxT,
                status: 'paused'
            });
        }else {
            this.setState({
                t: t
            });
        }
    },

    initTimer: function(){
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                this.onTick();
            }.bind(this), this.props.dt);
        }
    },

    destroyInterval: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    onBeforeTimeChange: function(){
        var status = this.state.status;
        this.setState({
            status: 'paused',
            statusBeforeSeeking: status
        });
    },

    getMaxT: function(){
        //console.log('getMaxT occured');
        var users = this.props.players;
        var max = 0;
        for (var i in users){
            var points = (users[i].training == undefined) ? [] : users[i].training.points;
            if (points.length == 0){
                continue;
            }
            var t = points[points.length - 1].t;
            if (t > max){
                max = t;
            }
        }
        //console.log('returning ', max);
        return max;
    },


    getPlayPauseButton: function(){
        if (this.state.status == 'playing'){
            return (
                <i className={'icon pause circle'} style={{marginRight: 0, cursor: 'pointer'}}
                   onClick={this.setState.bind(this, {status: 'paused'})} ></i>
            );
        }
        if (this.state.status == 'paused'){
            return (
                <i className={'icon play'} style={{marginRight: 0, cursor: 'pointer'}}
                   onClick={this.setState.bind(this, {status: 'playing'})} ></i>
            );
        }
    },

    getTracePoints: function(){
        if (this.props.showTrace != true){
            return [];
        }
        var points = SportHelper.getTracePointsOfPlayers(this.props.players, this.state.t, this.props.traceDuration);
        return points;
    },

    onPointClick: function(userId){
        this.props.onPointClick(userId);
    },

    getFieldStyle: function(){
        var field = this.props.field;
        if (field == undefined){
            return {
                width: 720,
                height: 460
            }
        }
        var w = field.width;
        return {
            width: 720,
            //height: 720.0 * field.height / field.width
            height: 720.0 * field.width / field.height
        }
    },

    render: function () {
        console.log('FieldPlayer = ', this.props.field);

        var players = this.props.players;
        var t = this.state.t;
        var currentPoints = SportHelper.getCurrentPointsOfFootballUsers(players, t);
        var maxT = this.getMaxT();
        var currentTimeString = SportHelper.getTimeString(this.state.t);
        var totalTimeString = SportHelper.getTimeString(maxT);

        var fieldStyle = this.getFieldStyle();

        console.log('FieldPlayer: render: fieldStyle = ', fieldStyle);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>
                    <div style={this.componentStyle.fieldPlaceholder}>
                        <Field points={currentPoints} traceDuration={this.props.traceDuration}
                               tracePoints={this.getTracePoints()}
                               onPointClick={this.onPointClick}
                               style={this.getFieldStyle()}
                               field={this.props.field}
                               shouldNumerate={this.props.shouldNumerate}
                               showTrace={this.props.showTrace}  />
                    </div>
                </div>

                <div style={this.componentStyle.controlsPlaceholder}>

                    <div style={this.componentStyle.buttonsPlaceholder}>
                        {this.getPlayPauseButton()}
                    </div>

                    <div style={assign({}, this.componentStyle.timerPlaceholder, {})}>
                        {currentTimeString}
                    </div>

                    <div style={this.componentStyle.sliderPlaceholder}>
                        <FieldSlider onChange={this.onTimeChange}
                                     t={t}
                                     onBeforeChange={this.onBeforeTimeChange}
                                     maxT={maxT} />
                    </div>

                    <div style={assign({}, this.componentStyle.timerPlaceholder, {})}>
                        {totalTimeString}
                    </div>

                </div>


            </div>
        );
    }

});

module.exports = FieldPlayer;