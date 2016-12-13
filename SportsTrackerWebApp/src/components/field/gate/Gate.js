/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var SportHelper = require('../../../helpers/SportHelper');

var GateCorner = require('./GateCorner');

var Gate = React.createClass({
    getDefaultProps: function () {
        return {
            shots: SportHelper.generateRandomShots()
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 698,
            border: '2px solid rgb(239, 240, 241)',
            borderRight: 'none',
            margin: '0 auto'
        },

        area: {
            display: 'inline-block',
            width: 232,
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '2px solid rgb(239, 240, 241)'
        }

    },

    getShots: function(direction){
        var arr = [];
        var shots = this.props.shots;
        for (var i in shots){
            var shot = shots[i];
            if (shot.direction == direction){
                arr.push(shot);
            }
        }
        return arr;
    },

    render: function () {
        var leftShots = this.getShots('left');
        var rightShots = this.getShots('right');

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.area}>
                    <GateCorner direction={'left'} shots={leftShots} />
                </div>

                <div style={this.componentStyle.area}>


                </div>

                <div style={this.componentStyle.area}>
                    <GateCorner direction={'right'} shots={rightShots} />
                </div>

            </div>
        );
    }

});

module.exports = Gate;