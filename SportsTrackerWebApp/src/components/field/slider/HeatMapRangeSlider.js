/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactSlider = require('react-slider');

var createReactClass = require('create-react-class');

var HeatMapRangeSlider= createReactClass({
    getDefaultProps: function () {
        return {

            onChange: function(from, to){

            },

            maxT: 100


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

    onChange: function(a){
        this.props.onChange(a[0], a[1]);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <ReactSlider withBars={true}
                             value={this.props.t}
                             min={0} max={this.props.maxT} className={'my-slider'} onChange={this.onChange} >

                    <div className="my-handle"></div>
                    <div className="my-handle"></div>

                </ReactSlider>

            </div>
        );
    }

});

module.exports = HeatMapRangeSlider;