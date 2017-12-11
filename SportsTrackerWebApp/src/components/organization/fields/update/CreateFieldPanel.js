/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldForm = require('./FieldForm');

var CoolPreloader = require('../../../preloader/CoolPreloader');

var CreateFieldPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

            onFieldCreated: function(){

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

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        formPlaceholder: {

        }

    },

    onSubmit: function(data){
        this.getFlux().actions.createField(data, function(){
            this.props.onFieldCreated();
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>

                    <FieldForm onSubmit={this.onSubmit}  />

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreateFieldPanel;