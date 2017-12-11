/**
 * Created by sabir on 18.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldForm = require('./FieldForm');

var DeleteButton = require('../../../button/DeleteButton');

var createReactClass = require('create-react-class');

var UpdateFieldPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            fieldId: undefined,

            onFieldUpdated: function(){

            },

            onFieldDeleted: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            field: store.getField(this.props.fieldId)
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

        formPlaceholder: {

        },

        deleteButtonPlaceholder: {
            marginTop: 10,
            textAlign: 'left'
        }

    },

    onSubmit: function(data){
        if (data == undefined){
            return;
        }
        data.id = this.props.fieldId;
        this.getFlux().actions.updateField(data, function(){
            this.props.onFieldUpdated();
        }.bind(this));
    },

    onDelete: function(){
        this.getFlux().actions.deleteField(this.props.fieldId, function(){
            this.props.onFieldDeleted();
        }.bind(this));
    },

    render: function(){
        var field = this.state.field;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>

                    <FieldForm name={field.name}
                               width={field.width}
                               height={field.height}
                               description={field.description}
                               onSubmit={this.onSubmit}
                        />

                </div>

                <div style={this.componentStyle.deleteButtonPlaceholder}>
                    <DeleteButton onDelete={this.onDelete} />
                </div>

            </div>
        );
    }

});

module.exports = UpdateFieldPanel;