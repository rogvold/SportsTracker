/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AnimatedHeart = require('../../components/heart/AnimatedHeart');
var HeartPanel = require('../../components/heart/HeartPanel');




var RealTimeApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }

    },


    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <HeartPanel />

            </div>
        );
    }

});

module.exports = RealTimeApp;