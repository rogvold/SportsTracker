/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactSlider = require('react-slider');

var FieldSlider = React.createClass({
    getDefaultProps: function () {
        return {
            maxT: 100,
            t: 0,

            onChange: function(p){
                console.log(p);
            },

            onBeforeChange: function(){

            }

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

        return (
            <div style={this.componentStyle.placeholder} >

                <ReactSlider withBars={true} onBeforeChange={this.props.onBeforeChange}
                             value={this.props.t}
                             min={0} max={this.props.maxT} className={'my-slider'} onChange={this.props.onChange} >
                    <div className="my-handle"></div>
                </ReactSlider>

            </div>
        );
    }

});

module.exports = FieldSlider;