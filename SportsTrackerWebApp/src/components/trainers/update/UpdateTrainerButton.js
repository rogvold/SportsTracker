/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var UpdateTrainerPanel = require('./UpdateTrainerPanel');

var UpdateTrainerButton = React.createClass({
    getDefaultProps: function () {
        return {


            trainerId: undefined,

            buttonName: '',
            buttonClassName: '',
            icon: 'icon pencil',

            style: {
                marginRight: 0,
                cursor: 'pointer',
                display: 'inline-block'
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
            padding: 20,
            paddingTop: 10,
            width: 600,
            fontWeight: 'normal'
        }

    },

    getContent: function () {
        return (
            <div>

                <div style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 15}} >
                    Редактирование профиля тренера
                </div>

                <UpdateTrainerPanel trainerId={this.props.trainerId} editMode={true} />

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
                    <Dialog content={content} level={this.props.level}
                            onUpdated={this.onClose}
                            onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = UpdateTrainerButton;