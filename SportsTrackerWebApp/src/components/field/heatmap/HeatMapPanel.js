/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var HeatMap = require('./HeatMap');

var HeatMapRangeSlider = require('../slider/HeatMapRangeSlider');

var SportHelper = require('../../../helpers/SportHelper');

var HeatMapPanel = React.createClass({
    getDefaultProps: function () {
        return {

            field: undefined,

            points: SportHelper.generateRandomPointsForOnePlayer(),

            width: 720,
            height: 460,

            maxX: 720,
            maxY: 460

        }
    },

    getInitialState: function () {
        var self = this;
        return {
            from: 0,
            to: self.getMaxT()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 720,
            margin: '0 auto'
        },

        mapPlaceholder: {

        },

        controlsPlaceholder: {
            marginTop: 5
        },

        sliderPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 570,
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

    getPoints: function(){
        var arr = [];
        var points = this.props.points;

        //points = SportHelper.getScaledPoints(points, this.props.field, 720);

        var field = this.props.field;

        var from = this.state.from;
        var to = this.state.to;
        for (var i in points){
            var p = points[i];
            //var point = {
            //    x: 100.0 * p.x / this.props.maxX,
            //    y: 100.0 * p.y / this.props.maxY
            //};
            var point = {
                x: 100.0 * p.x / field.height,
                y: 100.0 * p.y / field.width
            };

            if (p.t >= from && p.t < to){
                arr.push(point);
            }
        }
        return arr;
    },

    getMaxT: function(){
        var points = this.props.points;
        if (points == undefined || points.length == 0){
            return 0;
        }
        return (points[points.length - 1].t);
    },

    onTimeChange: function(from, to){
        //console.log('onTimeChange occured: from, to = ', from, to);
        this.setState({
            from: from,
            to: to
        });
    },

    render: function () {
        var points = this.getPoints();
        var maxT = this.getMaxT();
        console.log('rendering HeatMapPanel: points = ', points);
        var field = this.props.field;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.mapPlaceholder}>
                    <HeatMap points={points} max={30} width={720} height={720.0 * field.width / field.height} />
                </div>

                <div style={this.componentStyle.controlsPlaceholder}>

                    <div style={this.componentStyle.timerPlaceholder}>
                        {SportHelper.getTimeString(this.state.from)}
                    </div>

                    <div style={this.componentStyle.sliderPlaceholder}>
                        <HeatMapRangeSlider maxT={maxT} onChange={this.onTimeChange} />
                    </div>

                    <div style={this.componentStyle.timerPlaceholder}>
                        {SportHelper.getTimeString(this.state.to)}
                    </div>


                </div>

            </div>
        );
    }

});

module.exports = HeatMapPanel;