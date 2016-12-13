/**
 * Created by sabir on 17.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var CalendarHelper = require('../../../helpers/CalendarHelper');

var MonthSwitcherPanel = React.createClass({
    getDefaultProps: function () {
        return {
            timestamp: new Date(),

            onChange: function(timestamp){
                alert(timestamp);
            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            textAlign: 'center',
            padding: 5,
            fontSize: 18,
            //backgroundColor: '#FAFAFA',
            paddingBottom: 0
            //borderBottom: '1px solid #EFF0F1'
        },

        monthPanel: {
            //width: 200,
            width: 125,
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'center',
            userSelect: 'none'
        },

        leftPlaceholder: {
            width: 60,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        rightPlaceholder: {
            width: 60,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        icon: {
            marginRight: 0,
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    },

    onNext: function(){
        if (this.canDoNext() == false){
            return;
        }
        var t = this.props.timestamp;
        t = +moment(t).endOf('month').format('x') + 60 * 1000;
        setTimeout(function(){
            this.props.onChange(t);
        }.bind(this), 30);
    },

    onPrev: function(){
        var t = this.props.timestamp;
        t = +moment(t).startOf('month').format('x') - 60 * 1000;
        console.log('onPrev: t, date = ', t, new Date(t));
        setTimeout(function(){
            this.props.onChange(t);
        }.bind(this), 30);
    },

    canDoNext: function(){
        var maxMonthStartTimestamp = +moment().startOf('month').format('x');
        var currentMonthStartTimestamp = +moment(this.props.timestamp).startOf('month').format('x');
        var f = (currentMonthStartTimestamp < maxMonthStartTimestamp);
        console.log('canDoNext occured: result = ', f);
        return f;
    },

    isPrevYear: function(){
        var startOfYearNow = +moment().startOf('year').format('x');
        var startOfYear = +moment(this.props.timestamp).startOf('year').format('x');
        return (startOfYearNow != startOfYear);
    },

    render: function () {
        var nextStyle = this.componentStyle.icon;
        if (this.canDoNext() == false){
            nextStyle = assign({}, nextStyle, {cursor: 'default', opacity: 0.3, fontWeight: 'normal'});
        }
        moment.locale('ru');
        //var monthString = moment(this.props.timestamp).format('MMMM');
        var monthString = CalendarHelper.getMonthRuName(this.props.timestamp);
        var isPrevYear = this.isPrevYear();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.leftPlaceholder}>
                    <i className={'icon angle left'} onClick={this.onPrev}
                       style={this.componentStyle.icon}></i>
                </div>

                <div style={this.componentStyle.monthPanel}>
                    {monthString}
                    <span>
                        {isPrevYear == false ? null :
                            <span style={{marginLeft: 5, opacity: 0.4}} >{moment(this.props.timestamp).format('YYYY')}</span>
                        }
                    </span>
                </div>

                <div style={this.componentStyle.rightPlaceholder}>
                    <i className={'icon angle right'} onClick={this.onNext}
                       style={nextStyle}></i>
                </div>

            </div>
        );
    }

});

module.exports = MonthSwitcherPanel;