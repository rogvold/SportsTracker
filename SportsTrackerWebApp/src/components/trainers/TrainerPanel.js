/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UpdateTrainerButton = require('./update/UpdateTrainerButton');

var TrainerPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            trainerId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
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

        },

        headerPlaceholder: {
            fontSize: 20,
            lineHeight: '20px',
            fontWeight: 'bold',
            marginBottom: 10
        }

    },

    render: function(){
        var trainer = this.state.trainer;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder}>
                    <span>
                        {trainer.firstName}
                    </span>
                    <span style={{marginLeft: 4}} >
                        {trainer.lastName}
                    </span>

                    <span style={{marginLeft: 4}} >
                        <UpdateTrainerButton trainerId={this.props.trainerId} />
                    </span>

                </div>

            </div>
        );
    }

});

module.exports = TrainerPanel;