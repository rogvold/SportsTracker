/**
 * Created by sabir on 17.07.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PusherPanel = require('../../components/pusher/PusherPanel');
var RealTimePlayer = require('../../components/pusher/RealTimePlayer');
var createReactClass = require('create-react-class');
var EnglishApp= createReactClass({
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

                <RealTimePlayer />

            </div>
        );
    }

});

module.exports = EnglishApp;