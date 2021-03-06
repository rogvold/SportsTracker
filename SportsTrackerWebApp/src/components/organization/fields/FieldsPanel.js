/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldsList = require('./FieldsList');
var CreateFieldPanel = require('./update/CreateFieldPanel');

var Dialog = require('../../dialog/Dialog');

var createReactClass = require('create-react-class');

var FieldsPanel = createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            fields: store.getAllFields()
        }
    },

    getInitialState: function(){
        return {
            createDialogVisible: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 830,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3,
            marginTop: 10
        },

        listPlaceholder: {

        },

        topPlaceholder: {
            padding: 4,
            backgroundColor: 'white',
            borderBottom: '1px solid rgb(239, 240, 241)',
            //borderRadius: 3,
            //width: 820,
            margin: '0 auto',
            marginBottom: 5
        },

        topLeftPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '70%',
            lineHeight: '25px'
        },

        topRightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '30%',
            textAlign: 'right'
        },

        dialogPanelStyle: {
            width: 500,
            padding: 15,
            paddingTop: 10
        }

    },

    getDialogContent: function(){
        return (
            <div>
                <CreateFieldPanel onFieldCreated={this.setState.bind(this, {createDialogVisible: false})} />
            </div>
        );
    },

    render: function(){
        var fields = this.state.fields;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.topPlaceholder}>
                    {fields.length == 0 ?
                        <div>
                            <div style={{textAlign: 'center', marginBottom: 10}} >
                                <img src={'assets/images/no_groups.jpg'} style={{width: 400, display: 'inline-block'}} />
                            </div>
                            <div style={{textAlign: 'center', opacity: 0.6, fontSize: 20, marginBottom: 20}} >
                                У вас еще нет ни одного поля.
                            </div>

                            <div style={{textAlign: 'center', marginBottom: 20}} >
                                <button style={{marginRight: 0}} className={'ui basic green button'} onClick={this.setState.bind(this, {createDialogVisible: true})} >
                                    <i className={'icon plus'} ></i> Добавить поле
                                </button>
                            </div>

                        </div> :

                        <div>

                            <div style={this.componentStyle.topPlaceholder}>


                                <div style={this.componentStyle.topLeftPlaceholder}>
                                    Количество полей:
                                    <span style={{marginLeft: 7, fontWeight: 'bold'}} >
                                        {fields.length}
                                    </span>
                                </div>

                                <div style={this.componentStyle.topRightPlaceholder}>
                                    <button style={{marginRight: 0}} className={'ui button basic mini'} onClick={this.setState.bind(this, {createDialogVisible: true})} >
                                        <i className={'icon plus'} ></i> Добавить поле
                                    </button>
                                </div>

                            </div>

                            <div style={this.componentStyle.listPlaceholder}>
                                <FieldsList />
                            </div>

                        </div>

                    }
                </div>


                {this.state.createDialogVisible == false ? null :
                    <Dialog level={1000} content={this.getDialogContent()} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.setState.bind(this, {createDialogVisible: false})}
                        />
                }

            </div>
        );
    }

});

module.exports = FieldsPanel;