/**
 * Created by sabir on 05.10.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BallPreloader = require('../preloader/BallPreloader');

var FieldTeamPanel = require('./FieldTeamPanel');

var SportHelper = require('../../helpers/SportHelper');
var createReactClass = require('create-react-class');
var TrainingTeamFieldPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            trainingId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            sessions: store.getSessions(),
            training: store.getTraining(this.props.trainingId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        setTimeout(function(){
            this.getFlux().actions.loadTrainingSessions(this.props.trainingId);
        }.bind(this), 100);
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        }
    },

    getPlayers: function(){
        var sessions = this.state.sessions;
        var arr = SportHelper.generateUsersBySessions(sessions);
        return arr;
    },

    getField: function(){
        var training = this.state.training;
        if (training == undefined){
            return undefined;
        }
        var store = this.getFlux().store('OrganizationStore');
        //return training.field;
        return store.fieldsMap[training.fieldId];
    },

    render: function(){
        var sessions = this.state.sessions;
        var players = this.getPlayers();

        console.log('TrainingTeamFieldPanel: players = ', players);
        console.log('TrainingTeamFieldPanel: sessions = ', this.state.sessions);
        console.log('TrainingTeamFieldPanel: field = ', this.getField());


        return (
            <div style={this.componentStyle.placeholder} >

                <FieldTeamPanel players={players}
                                field={this.getField()} />

                {this.state.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        );
    }

});

module.exports = TrainingTeamFieldPanel;