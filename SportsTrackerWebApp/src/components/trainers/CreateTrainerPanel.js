/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../preloader/CoolPreloader');

var TrainerForm = require('./TrainerForm');

var CreateTrainerPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

            onTrainerCreated: function(){

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading
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

    onSubmit: function(data){
        this.getFlux().actions.createTrainer(data, function(){
            this.props.onTrainerCreated();
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        formPlaceholder: {

        }

    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <TrainerForm editMode={false} onSubmit={this.onSubmit} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreateTrainerPanel;