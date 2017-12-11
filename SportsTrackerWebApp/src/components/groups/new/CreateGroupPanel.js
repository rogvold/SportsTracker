/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GroupForm = require('./GroupForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var CreateGroupPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            onGroupCreated: function(){

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
        console.log('creating group: data = ', data);
        this.getFlux().actions.createGroup(data, function(){
            this.props.onGroupCreated();
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        headerPlaceholder: {
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18
        }

    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder}>
                    Создание команды
                </div>

                <GroupForm onSubmit={this.onSubmit} />

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreateGroupPanel;