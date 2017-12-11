/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Field = require('./Field');

var FieldSlider = require('./slider/FieldSlider');
var createReactClass = require('create-react-class');
var TestField= createReactClass({
    getDefaultProps: function () {
        return {
            dt: 500,
            pointsNumber: 22,
            maxX: 720,
            maxY: 460
        }
    },

    getInitialState: function () {
        return {
            points: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initTimer();
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    componentStyle: {
        placeholder: {

        }
    },


    onTick: function(){
        this.setState({
            points: this.generatePoints()
        });
    },

    initTimer: function(){
        if (this.intervalId == undefined){
            this.intervalId = setInterval(this.onTick.bind(this), this.props.dt);
        }
    },

    destroyTimer: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    generatePoints: function(){
        var arr = [];
        var n = this.props.pointsNumber;
        for (var i = 0; i < n; i++){
            var p = {
                x: Math.floor(Math.random() * this.props.maxX),
                y: Math.floor(Math.random() * this.props.maxY)
            };
            arr.push(p);
        }
        return arr;
    },

    render: function () {
        var points = this.state.points;
        var st = assign({}, this.componentStyle.placeholder);
        st = assign({}, st, {width: 720});

        return (
            <div style={st}>

                <Field points={points} />

                <FieldSlider />

            </div>
        );
    }

});

module.exports = TestField;