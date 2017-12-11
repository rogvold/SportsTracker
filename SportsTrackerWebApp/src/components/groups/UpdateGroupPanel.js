/**
 * Created by sabir on 13.07.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GroupForm = require('./new/GroupForm');

var DeleteButton = require('../button/DeleteButton');

var CoolPreloader = require('../preloader/CoolPreloader');

var UpdateGroupPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

            groupId: undefined,

            onDelete: function(){

            },

            onUpdate: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            group: store.getGroup(this.props.groupId)
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
        if (data == undefined){
            return;
        }
        data.id = this.props.groupId;
        this.getFlux().actions.updateGroup(data, function(){
            this.props.onUpdate();
        }.bind(this));
    },

    onDelete: function(){
        this.getFlux().actions.deleteGroup(this.props.groupId, function(){
            this.props.onDelete();
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            fontWeight: 'normal',
            position: 'relative'
        },

        formPlaceholder: {

        },

        deleteButtonPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        },

        headerPlaceholder: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 20
        }

    },

    render: function(){
        var group = this.state.group;
        if (group == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder}>
                    Редактирование команды
                </div>

                <div style={this.componentStyle.formPlaceholder}>
                    <GroupForm
                        name={group.name} description={group.description}
                        onSubmit={this.onSubmit} />
                </div>

                <div style={this.componentStyle.deleteButtonPlaceholder}>
                    <DeleteButton onDelete={this.onDelete} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdateGroupPanel;