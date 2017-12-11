/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var SportHelper = require('../../../helpers/SportHelper');
var createReactClass = require('create-react-class');
var UserItem= createReactClass({
    getDefaultProps: function () {
        return {

            user: undefined,

            numer: undefined

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
            display: 'inline-block',
            padding: 5,
            border: '1px solid #EFF0F1',
            width: 232,
            borderRadius: 3,
            backgroundColor: 'white',
            cursor: 'pointer'
        },

        avatarPlaceholder: {
            width: 42,
            height: 42,
            borderRadius: 3,
            position: 'relative'
        },

        numberPlaceholder: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 2,
            borderTopRightRadius: 3,
            backgroundColor: 'white',
            fontSize: 8,
            opacity: 0.6,
            height: 14,
            lineHeight: '11px',
            fontWeight: 'bold'
        },

        leftPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 50
        },

        rightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 160
        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 14
        },

        infoPlaceholder: {
            opacity: 0.4,
            marginTop: 5,
            fontSize: 12
        }

    },

    render: function () {
        var u = this.props.user;
        if (u == undefined){
            return null;
        }
        var points = (u.training == undefined) ? [] : u.training.points;
        points = (points == undefined) ? [] : points;

        var dur = SportHelper.getDuration(points);
        var durString = SportHelper.getDurationString(dur);
        var distance = SportHelper.getDistance(points);
        var distString = SportHelper.getDistanceString(distance);

        var number = this.props.number;

        return (
            <div style={this.componentStyle.placeholder} className={'hoverYellowBackground'} >

                <div style={this.componentStyle.leftPlaceholder}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        {number == undefined ? null :
                            <div style={this.componentStyle.numberPlaceholder}>
                                {number}
                            </div>
                        }

                        <BackgroundImageContainer image={u.avatar} style={{borderRadius: 3}} />
                    </div>

                </div>

                <div style={this.componentStyle.rightPlaceholder}>
                    <div style={this.componentStyle.namePlaceholder}>
                        {u.name}
                    </div>

                    <div style={this.componentStyle.infoPlaceholder}>

                        <span style={{marginRight: 10}}>
                            <i className={'icon wait'} style={{marginRight: 2}} ></i> {durString}
                        </span>

                        <span style={{marginRight: 0}}>
                            <i className={'icon location arrow'} style={{marginRight: 2}} ></i> {distString}
                        </span>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = UserItem;