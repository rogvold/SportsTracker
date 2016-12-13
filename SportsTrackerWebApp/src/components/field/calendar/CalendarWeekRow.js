/**
 * Created by sabir on 17.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var CalendarDayPanel = require('./CalendarDayPanel');

var moment = require('moment');

var CalendarWeekRow = React.createClass({
    getDefaultProps: function () {
        return {
            days: [],
            weekNumber: 0,
            monthTimestamp: undefined,

            onDayClick: function(day){

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

        },

        item: {
            width: 70,
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            background: 'white'
        }
    },


    onDayClick: function(day){
        if (day == undefined || day.isVoid == true){
            return;
        }
        this.props.onDayClick(day);
    },


    render: function () {
        var list = this.props.days;
        //console.log('rendering CalendarWeekRow: days = ', list);

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(day, k){
                    var key = 'week_' + this.props.weekNumber + '_session_' + k + '_' + this.props.monthTimestamp;
                    var isThisMonth = +moment(this.props.monthTimestamp).startOf('month') == +moment(day.start).startOf('month');
                    var onDClick = this.onDayClick.bind(this, day);
                    var st = assign({}, this.componentStyle.item);
                    var className = '';
                    if (day.isVoid == false){
                        className= 'hoverYellowBackground';
                        st = assign({}, st, {cursor: 'pointer'});
                    }

                    if (k == 6){
                        st = assign({}, st, {borderRight: 'none'});
                    }

                    return (
                        <div key={key} style={st} onClick={onDClick} className={className} >
                            <CalendarDayPanel
                                isThisMonth={isThisMonth}
                                timestamp={day.start}
                                sessions={day.sessions}
                                duration={day.duration}

                                />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = CalendarWeekRow;