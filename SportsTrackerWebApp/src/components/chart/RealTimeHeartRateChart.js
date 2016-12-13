/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var rd3 = require('react-d3');

var AreaChart = rd3.AreaChart;
var LineChart = rd3.LineChart;

var RealTimeHeartRateChart = React.createClass({
    getDefaultProps: function () {
        return {
            points: [],
            width: 500,
            height: 300,
            maxPointsNumber: 70
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
        placeholder: {}
    },

    render: function () {
        var values = this.props.points.map(function(p){
            return {
                x: p.t,
                y: p.hr
            }
        });
        values = values.slice( -this.props.maxPointsNumber );

        var lineData = [
            {
                name: "heart_rate",
                //values: [ { x: 0, y: 20 }, { x: 24, y: 10 }, {x: 40, y: 6}, {x: 50, y: 13}, {x: 75, y: 11} ]
                values: values,
                colors: {
                    heart_rate: 'red'
                },
                color: function(){
                    return 'red';
                }
            }
        ];

        return (
            <div style={this.componentStyle.placeholder} className={'RealTimeHeartRateChart'} >
                <AreaChart
                    legend={false}
                    data={lineData}
                    width={this.props.width}
                    height={this.props.height}
                    interpolate={true}
                    margins={{top: 0, right: 0, bottom: 0, left: 0}}
                    />
            </div>
        );
    }

});

module.exports = RealTimeHeartRateChart;