/**
 * Created by sabir on 18.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var CalendarHelper = require('../../../helpers/CalendarHelper');
var SportHelper = require('../../../helpers/SportHelper');
var ActivityMonthCalendar = require('./ActivityMonthCalendar');

var Dialog = require('../../dialog/Dialog');

var moment = require('moment');

var DaySessionsList = require('../session/DaySessionsList');

var CalendarPanel = React.createClass({
    getDefaultProps: function () {
        return {
            sessions: SportHelper.generateRandomSessions(new Date().getTime() - 200 * 24 * 3600 * 1000, 300),
            onDayClick: function(day){

            }
        }
    },

    getInitialState: function () {
        return {
            selectedDay: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            width: 520,
            padding: 10
        }
    },

    onDayClick: function(day){
        this.props.onDayClick(day);
        this.setState({
            selectedDay: day
        });
    },

    getSelectedDayContent: function(){
        var day = this.state.selectedDay;

        return (
            <div>
                <DaySessionsList day={day}  />
            </div>
        );

    },

    render: function () {
        var sessions = this.props.sessions;
        console.log('CalendarPanel: rendering: sessions = ', sessions);

        return (
            <div style={this.componentStyle.placeholder}>

                <ActivityMonthCalendar sessions={sessions}
                                        onDayClick={this.onDayClick} />

                {this.state.selectedDay == undefined ? null :
                    <Dialog content={this.getSelectedDayContent()} level={5}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.setState.bind(this, {selectedDay: undefined})}
                        />
                }

            </div>
        );
    }

});

module.exports = CalendarPanel;