/**
 * Created by sabir on 05.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BallPreloader = require('../../preloader/BallPreloader');

var CalendarPanel = require('../../field/calendar/CalendarPanel');

var TrainingsCalendar = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            trainings: store.trainings
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        //setTimeout(function(){
        //    this.getFlux().actions.loadOrganizationTrainings();
        //}.bind(this), 100);

    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        }
    },

    render: function(){
        console.log('TrainingsCalendar: render: trainings = ', this.state.trainings);
        var oldT = (new Date().getTime()) - 86400000 * 1000;
        var calSessions = this.state.trainings.map(function(tr){
            var t = tr.startTimestamp;
            if (t < oldT){
                t = t * 1000;
            }
            var a = assign({}, tr, {start: t});
            return a;
        });


        return (
            <div style={this.componentStyle.placeholder} >

                <CalendarPanel sessions={calSessions} />

                {this.state.loading == false ? null :
                    <BallPreloader  />
                }

            </div>
        );
    }

});

module.exports = TrainingsCalendar;