/**
 * Created by sabir on 18.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');

var UpdateFieldPanel = require('./UpdateFieldPanel');

var UpdateFieldButton = React.createClass({
    getDefaultProps: function () {
        return {

            fieldId: undefined,

            onFieldDeleted: function(){

            },

            buttonName: '',
            buttonClassName: '',
            icon: 'icon pencil',

            style: {
                marginRight: 0,
                cursor: 'pointer',
                display: 'inline-block'
            },

            level: 10000

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 520,
            padding: 10,
            fontWeight: 'normal',
            fontSize: 14
        }

    },

    onFieldUpdated: function(){
        this.onClose();
    },

    onFieldDeleted: function(){
        setTimeout(function(){
            this.props.onFieldDeleted();
        }.bind(this), 30);
        this.onClose();
    },

    getContent: function () {
        return (
            <div>

                <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 15}} >
                    Редактирование поля
                </div>

                <UpdateFieldPanel fieldId={this.props.fieldId}
                                  onFieldDeleted={this.onFieldDeleted}
                                  onFieldUpdated={this.onFieldUpdated} />

            </div>
        );
    },

    onClose: function () {
        this.setState({
            dialogVisible: false
        });
    },

    show: function () {
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} onClick={this.show} className={this.props.buttonClassName}>
                    {(this.props.icon == undefined || this.props.icon == '') ? null :
                        <i className={this.props.icon}></i>
                    }

                    {this.props.buttonName}

                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={content} level={this.props.level} onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = UpdateFieldButton;