/**
 * Created by sabir on 16.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrainingsList = require('../list/TrainingsList');

var UserTrainingsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'OrganizationStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        var usersStore = flux.store('UsersStore');
        var loading = store.loading || usersStore.loading;
        return {
            user: usersStore.getCUrrentUser(),
            loading: loading,
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
        var user = this.state.user;
        if (user == undefined){
            return;
        }
        this.getFlux().actions.loadUserTrainings(user.id, function(){
            console.log('trainings loaded');
        })
    },

    componentStyle: {
        placeholder: {

        }
    },

    onTrainingClick: function(tr){
        alert(JSON.stringify(tr));
    },

    render: function(){
        var trainings = this.state.trainings;

        return (
            <div style={this.componentStyle.placeholder} className={'user_trainings_panel'} >

                <TrainingsList trainings={trainings} onTrainingClick={this.onTrainingClick} />

            </div>
        );
    }

});

module.exports = UserTrainingsPanel;