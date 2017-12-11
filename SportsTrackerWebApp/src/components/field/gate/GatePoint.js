/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');
var createReactClass = require('create-react-class');
var GatePoint= createReactClass({
    getDefaultProps: function () {
        return {
            shotsNumber: 0,
            name: ''
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
            width: '100%',
            height: '100%',
            border: '1px solid rgb(239, 240, 241)',
            padding: 5,
            textAlign: 'center',
            position: 'relative'
        },

        namePlaceholder: {
            position: 'absolute',
            backgroundColor: '#FFFDE7',
            top: 0,
            right: 0,
            padding: 3,
            fontSize: 10,
            lineHeight: '10px',
            border: '1px solid rgb(239, 240, 241)',
            borderRight: 'none',
            borderTop: 'none',
            borderBottomLeftRadius: 3,
            opacity: 0.6
        },

        numberPlaceholder: {
            textAlign: 'center',
            fontSize: 30,
            lineHeight: '28px',
            paddingTop: 5,
            opacity: 0.8
        }

    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>

                <div style={this.componentStyle.numberPlaceholder}>
                    {this.props.shotsNumber}
                </div>


            </div>
        );
    }

});

module.exports = GatePoint;