/**
 * Created by sabir on 16.07.16.
 */

var rd3 = require('react-d3');

var AreaChart = rd3.AreaChart;
var LineChart = rd3.LineChart;

var React = require('react');
var assign = require('object-assign');
var createReactClass = require('create-react-class');
var SuperLineChart= createReactClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        var lineData = [
            {
                name: "series1",
                values: [ { x: 0, y: 20 }, { x: 24, y: 10 }, {x: 40, y: 6}, {x: 50, y: 13}, {x: 75, y: 11} ]
            }
        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <AreaChart
                    legend={false}
                    data={lineData}
                    width={500}
                    height={300}
                    interpolate={true}
                    stroke={'green'}
                    strokeWidth={2}
                    />
            </div>
        );
    }

});

module.exports = SuperLineChart;
