/**
 * Created by sabir on 17.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var moment = require('moment');

var CalendarDayPanel = React.createClass({
    getDefaultProps: function () {
        return {
            isVoid: false,
            isMissed: false,
            isThisMonth: true,

            timestamp: undefined,
            duration: undefined,

            sessions: []

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
            position: 'relative',
            paddingTop: 14,
            minHeight: 65
            //backgroundColor: 'white'
        },

        panel: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
            //background: 'rgba(255, 255, 255, 0.70)'
            //background: 'rgba(255, 255, 255, 0.88)'
        },


        dayPlaceholder: {
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 3,
            opacity: 0.8,
            fontSize: 10,
            lineHeight: '16px',
            borderBottomRightRadius: 3
        },

        activityPlaceholder: {
            textAlign: 'center',
            padding: 5
        },

        activityBackgroundPlaceholder: {
            textAlign: 'center',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            left: 20,
            right: 20,
            top: 10,
            bottom: 25,
            zIndex: 0
        },

        topPlaceholder: {
            height: 60,
            //paddingTop: 24
            paddingTop: 18,
            textAlign: 'center',
            fontSize: 30
        },

        ballPlaceholder: {
            width: 26,
            height: 26,
            lineHeight: '26px',
            color: 'white',
            //fontWeight: 'bold',
            display: 'inline-block',
            borderRadius: 100,
            //backgroundColor: '#2e3c54',
            backgroundColor: '#FC636B',
            fontSize: 18
        },

        leftTop: {
            display: 'inline-block',
            width: '50%',
            verticalAlign: 'top',
            textAlign: 'center'
        },

        rightTop: {
            display: 'inline-block',
            width: '50%',
            verticalAlign: 'top',
            textAlign: 'center'
        },

        icon: {
            marginRight: 0
        }

    },

    getTimePartString: function(x){
        if (x < 10){
            return ('0' + x);
        }
        return x;
    },

    getDurationString: function(){
        var dur = this.props.duration;
        if (dur == undefined){
            return 0;
        }
        dur = Math.floor(dur / 60000.0);
        var minutes = dur % 60;
        var hours = Math.floor(dur / 60.0);
        var dur = this.getTimePartString(hours) + ':' + this.getTimePartString(minutes);
        return dur;
    },


    render: function () {

        var isThisMonth = this.props.isThisMonth;

        var durS = this.getDurationString();
        var plStyle = this.componentStyle.placeholder;
        if (isThisMonth == false){
            plStyle = assign({}, plStyle, {backgroundColor: 'rgb(248, 248, 248)'});
        }


        var dayStyle = assign({}, this.componentStyle.dayPlaceholder);
        if (+moment().startOf('day') == +moment(this.props.timestamp).startOf('day')){
            dayStyle = assign({}, dayStyle, {backgroundColor: '#FEFEE6', fontWeight: 'bold', borderBottom: '1px solid #EFF0F1', borderRight: '1px solid #EFF0F1'});
        }

        var isVoid = (this.props.sessions.length == 0);

        return (
            <div style={plStyle}>

                <div style={dayStyle}>
                    {moment(this.props.timestamp).format('D')}
                </div>


                <div style={this.componentStyle.panel}>

                    {isVoid == true ? null :
                        <div style={this.componentStyle.topPlaceholder}>
                            <div style={this.componentStyle.ballPlaceholder}>
                                {this.props.sessions.length}
                            </div>
                        </div>
                    }

                </div>



            </div>
        );
    }

});

module.exports = CalendarDayPanel;