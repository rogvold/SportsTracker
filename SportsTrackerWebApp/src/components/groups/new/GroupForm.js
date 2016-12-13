/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var GroupForm = React.createClass({
    getDefaultProps: function () {
        return {
            name: '',
            description: '',

            buttonName: 'Сохранить',
            buttonIcon: 'icon save',
            buttonClassName: 'ui button patientPrimary fluid',

            onSubmit: function(data){

            }

        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            description: this.props.description
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.name,
            description: nextProps.description
        });
    },

    componentDidMount: function () {

    },

    onNameChange: function(evt){
        this.setState({
            name: evt.target.value
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: evt.target.value
        });
    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {

        },

        buttonPlaceholder: {
            marginTop: 10
        }
    },

    getData: function(){
        var data = {
            name: this.state.name,
            description: this.state.description
        };
        return data;
    },

    onClick: function(){
        var data = this.getData();
        this.props.onSubmit(data);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder} className={'ui form'} >


                    <div className={'field'} >
                        <label>
                            Название команды
                        </label>
                        <input type={'text'} onChange={this.onNameChange} value={this.state.name} placeholder={'Название команды'} />
                    </div>

                    <div className={'field'} >
                        <label>
                            Описание команды
                        </label>
                        <textarea type={'text'} onChange={this.onDescriptionChange} value={this.state.description} placeholder={'Описание команды'} ></textarea>
                    </div>

                </div>

                <div style={this.componentStyle.buttonPlaceholder}>

                    <button className={this.props.buttonClassName} onClick={this.onClick} >
                        <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                    </button>

                </div>

            </div>
        );
    }

});

module.exports = GroupForm;