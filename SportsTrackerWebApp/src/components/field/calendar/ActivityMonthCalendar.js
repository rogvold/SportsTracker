/**
 * Created by sabir on 17.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var CalendarDayPanel = require('./CalendarDayPanel');
var CalendarWeekRow = require('./CalendarWeekRow');
var CalendarHeaderRow = require('./CalendarHeaderRow');

var MonthSwitcherPanel = require('./MonthSwitcherPanel');

var SportHelper = require('../../../helpers/SportHelper');
var CalendarHelper = require('../../../helpers/CalendarHelper');

var ActivityMonthCalendar = React.createClass({
    getDefaultProps: function () {
        return {
            sessions: [],
            onDayClick: function(day){

            }
        }
    },

    getInitialState: function () {
        return {
            monthTimestamp: new Date()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onMonthChange: function(timestamp){
        console.log('onMonthChange occured: timestamp, date = ', timestamp, new Date(timestamp));
        this.setState({
            monthTimestamp: timestamp
        });
    },

    componentStyle: {
        placeholder: {
            margin: '0 auto',
            //width: 962,
            width: 492,
            border: '1px solid #EFF0F1',
            marginTop: 10,
            //marginBottom: 20,
            backgroundColor: 'white',
            minHeight: 70,
            borderBottom: 'none'
            //borderRight: 'none'
        }
    },

    onDayClick: function(day){
        console.log('onDayClick: day = ', day);
        this.props.onDayClick(day);
    },

    render: function () {
        var weeks = CalendarHelper.getWeeksForCalendarFromSessions(this.state.monthTimestamp, this.props.sessions);

        console.log('rendering ActivityMonthCalendar: weeks = ', weeks);

        return (
            <div style={this.componentStyle.placeholder}>

                    <MonthSwitcherPanel timestamp={this.state.monthTimestamp} onChange={this.onMonthChange} />



                    <CalendarHeaderRow />


                    {weeks.map(function(w, i){
                        var key = 'week_' + i + '_' + this.state.monthTimestamp;
                        var dur = 0;
                        for (var i in w.days){
                            var dDur = (w.days[i].duration == undefined) ? 0 : w.days[i].duration;
                            dur = dur + dDur;
                        }
                        var sDur = CalendarHelper.getDurationString(dur);
                        return (
                            <div key={key}>
                                <div style={{display: 'inline-block', verticalAlign: 'top'}} >
                                    <CalendarWeekRow onDayClick={this.onDayClick}
                                        monthTimestamp={this.state.monthTimestamp}
                                                     weekNumber={i} days={w.days} />
                                </div>
                            </div>
                        );
                    }, this)}


            </div>
        );
    }

});

module.exports = ActivityMonthCalendar;