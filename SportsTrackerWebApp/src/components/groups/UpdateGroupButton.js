/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var UpdateGroupPanel = require('./UpdateGroupPanel');

var UpdateGroupButton = React.createClass({
    getDefaultProps: function () {
        return {

            groupId: undefined,

            inDelete: function(){

            },

            onUpdate: function(){

            },


            buttonName: '',
            buttonClassName: 'ui mini basic button',
            icon: 'icon pencil',

            style: {
                marginRight: 15
            },

            level: 1000

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
            padding: 10
        }

    },

    onDelete: function(){
        setTimeout(function(){
            this.onClose();
        }.bind(this), 30);
        this.props.onDelete();
    },

    onUpdate: function(){
        setTimeout(function(){
            this.onClose();
        }.bind(this), 30);
        this.props.onUpdate();
    },

    getContent: function () {
        return (
            <div>
                <UpdateGroupPanel
                    groupId={this.props.groupId}
                    onDelete={this.onDelete} onUpdate={this.onUpdate} />
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
                        <i style={{marginRight: 0}} className={this.props.icon}></i>
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

module.exports = UpdateGroupButton;