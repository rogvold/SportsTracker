/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactHeatmap = require('react-heatmap');
var createReactClass = require('create-react-class');
var HeatMap= createReactClass({
    getDefaultProps: function () {
        return {
            width: 720,
            height: 460,
            image: 'http://www.englishpatient.ru/img/football_pitch.png',
            max: 1,

            points: []

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
            width: 720,
            height: 460,

            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url("http://www.englishpatient.ru/img/football_pitch.png")'
        }
    },

    render: function () {

        var st = assign({}, this.componentStyle.placeholder,
            {   backgroundImage: 'url("' + this.props.image + '")',
                width: this.props.width,
                height: this.props.height
            });

        var points = this.props.points;
        var data = points.map(function(p){
            return {
                x: p.x,
                y: p.y,
                value: 10
            }
        });

        return (
            <div style={st}>

                <ReactHeatmap max={this.props.max} data={data} />

            </div>
        );
    }

});

module.exports = HeatMap;