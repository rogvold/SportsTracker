/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');

var UserUpdatePanel = require('./UserUpdatePanel');
var createReactClass = require('create-react-class');
var UserUpdateButton= createReactClass({
    getDefaultProps: function () {
        return {

            userId: undefined,

            buttonName: '',
            buttonClassName: '',
            icon: 'icon pencil',

            style: {
                cursor: 'pointer'
            },

            level: 1010

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
            padding: 10,
            paddingTop: 10,
            width: 520,
            fontWeight: 'normal',
            fontSize: 14
        }

    },

    getContent: function () {
        return (
            <div>

                <div style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}} >
                    Редактирование пользователя
                </div>

                <UserUpdatePanel userId={this.props.userId} onUserUpdated={this.onClose} />

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

module.exports = UserUpdateButton;