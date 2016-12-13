/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldsItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            fieldId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
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

        namePlaceholder: {
            fontWeight: 'bold'
        },

        infoPlaceholder: {

        }

    },

    render: function(){
        var field = this.state.field;
        if (field == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.namePlaceholder}>
                    {field.name}
                </div>

                <div style={this.componentStyle.infoPlaceholder}>
                    {field.width} / {field.height}
                </div>

            </div>
        );
    }

});

module.exports = FieldsItem;