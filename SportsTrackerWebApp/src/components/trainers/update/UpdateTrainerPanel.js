/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrainerForm = require('../TrainerForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var TrainerGroupsPanel = require('../group/TrainerGroupsPanel');

var UpdateTrainerPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            trainerId: undefined,

            onUpdated: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        var usersStore = flux.store('UsersStore');
        var loading = (store.loading || usersStore.loading);

        return {
            loading: loading,
            trainer: store.getTrainer(this.props.trainerId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            fontSize: 14
        },

        formPlaceholder: {

        },

        groupsPlaceholder: {
            marginTop: 10,
            fontSize: 14
        }

    },

    onSubmit: function(data){
        data.userId = this.props.trainerId;
        this.getFlux().actions.updateUser(data);
    },

    getTrainerGroupsComponent: function(){
        return (
            <div style={this.componentStyle.groupsPlaceholder} className={'field'} >
                <b>
                    Команды
                </b>
                <TrainerGroupsPanel trainerId={this.props.trainerId} />
            </div>
        );
    },

    render: function(){
        var trainer = this.state.trainer;
        if (trainer == undefined){
            return;
        }
        console.log('UpdateTrainerPanel: render: trainer = ', trainer);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <TrainerForm editMode={true}
                                 firstName={trainer.firstName} lastName={trainer.lastName}
                                 onSubmit={this.onSubmit} avatar={trainer.avatar}
                                 extraContent={this.getTrainerGroupsComponent()}
                    />
                </div>


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdateTrainerPanel;