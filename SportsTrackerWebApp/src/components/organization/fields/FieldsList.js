/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldsItem = require('./FieldsItem');

var Dialog = require('../../dialog/Dialog');

var UpdateFieldButton = require('./update/UpdateFieldButton');
var createReactClass = require('create-react-class');
var FieldsList= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            fields: store.getAllFields()
        }
    },

    getInitialState: function(){
        return {
            selectedField: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        item: {
            display: 'inline-block',
            margin: 4,
            verticalAlign: 'top',
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3,
            cursor: 'pointer',
            padding: 4,
            width: 250
        },

        dialogPanelStyle: {
            width: 600,
            padding: 15,
            paddingTop: 10
        },

        selectedContentPlaceholder: {

        }

    },

    onFieldClick: function(field){
        this.setState({
            selectedField: field
        });
    },

    getContent: function(){
        var field = this.state.selectedField;
        field = this.getFlux().store('OrganizationStore').getField(field.id);

        return (
            <div>
                <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}} >
                    {field.name} <UpdateFieldButton fieldId={field.id} onFieldDeleted={this.setState.bind(this, {selectedField: undefined})} />
                </div>


                {(field.description == undefined || field.description.trim() == '') ? null :
                    <div style={{marginTop: 15, opacity: 0.8, textAlign: 'center'}} >
                        {field.description}
                    </div>
                }

                <div style={this.componentStyle.selectedContentPlaceholder}>

                    <div style={{fontWeight: 'bold'}} >
                        Размеры
                    </div>

                    <div>
                        Длина: {field.height}
                    </div>
                    <div>
                        Ширина: {field.width}
                    </div>

                </div>

            </div>
        );
    },

    render: function(){
        var list = this.state.fields;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(field, k){
                        var key = 'field_' + k;
                        var onClick = this.onFieldClick.bind(this, field);

                        return (
                            <div style={this.componentStyle.item} className={'hoverYellowBackground'}
                                    key={key} onClick={onClick} >
                                <FieldsItem fieldId={field.id} />
                            </div>
                        );
                    }, this)}

                </div>

                {this.state.selectedField == undefined ? null :
                    <Dialog
                        content={this.getContent()}
                        level={110} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.setState.bind(this, {selectedField: undefined})} />
                }

            </div>
        );
    }

});

module.exports = FieldsList;