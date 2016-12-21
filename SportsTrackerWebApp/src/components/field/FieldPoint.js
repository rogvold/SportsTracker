/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var FieldPoint = React.createClass({
    getDefaultProps: function () {
        return {
            radius: 12,
            x: 0,
            y: 0,
            name: undefined,

            onClick: function(userId){

            },

            isTrace: false,
            style: {

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
        placeholder: {
            position: 'absolute',
            borderRadius: 1000,
            border: '2px solid rgba(222, 88, 66, 1)',
            backgroundColor: 'rgba(222, 88, 66, 0.7)',
            fontSize: 6,
            lineHeight: '8px',
            color: 'white',
            textAlign: 'center'
        }
    },

    onClick: function(){
        this.props.onClick();
    },

    render: function () {
        var name = this.props.name;
        var centerX = this.props.x - (this.props.radius / 2.0);
        var centerY = this.props.y - (this.props.radius / 2.0);

        var st = Object.assign({}, this.componentStyle.placeholder,
                        {left: centerX, top: centerY, width: this.props.radius, height: this.props.radius},
                        this.props.style);

        if (this.props.isTrace == false){
            st = Object.assign({}, st, {cursor: 'pointer'});
        }

        var className = (this.props.isTrace == true) ? 'transition01s' : 'transition01s hoverYellowBackground ';

        return (
            <div style={st} className={className} onClick={this.onClick} >
                {name == undefined ? null :
                    <span>{name}</span>
                }
            </div>
        );
    }

});

module.exports = FieldPoint;