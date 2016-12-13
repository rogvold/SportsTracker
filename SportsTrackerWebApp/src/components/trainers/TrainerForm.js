/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var CommonHelper = require('../../helpers/CommonHelper');

var TrainerForm = React.createClass({
    getDefaultProps: function () {
        return {

            firstName: '',
            lastName: '',

            avatar: undefined,

            email: '',
            password: '',

            name: '',
            description: '',

            editMode: false,

            buttonName: 'Сохранить',
            buttonIcon: 'icon save',
            buttonClassName: 'ui button patientPrimary fluid',

            extraContent: null,

            onSubmit: function(data){

            }

        }
    },

    getInitialState: function () {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            avatar: this.props.avatar
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            avatar: nextProps.avatar
        });
    },

    componentDidMount: function () {

    },

    onFirstNameChange: function(evt){
        this.setState({
            firstName: evt.target.value
        });
    },

    onLastNameChange: function(evt){
        this.setState({
            lastName: evt.target.value
        });
    },

    onEmailChange: function(evt){
        this.setState({
            email: evt.target.value
        });
    },

    onPasswordChange: function(evt){
        this.setState({
            password: evt.target.value
        });
    },

    onPasswordConfirmationChange: function(evt){
        this.setState({
            passwordConfirmation: evt.target.value
        });
    },

    isEmpty: function(s){
        if (s == undefined || s.trim() == ''){
            return true;
        }
        return false;
    },

    canSubmit: function(){
        var d = this.getData();
        if (this.isEmpty(d.firstName) || this.isEmpty(d.lastName)){
            return false;
        }
        if (this.props.editMode == false){
            if (this.isEmpty(d.password)){
                return false;
            }
            if (this.state.password != this.state.passwordConfirmation){
                return false;
            }
        }
        return true;
    },


    getData: function(){
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatar: this.state.avatar
        };
        if (this.props.editMode == false){
            data.email = this.state.email;
            data.password = this.state.password
        }
        return data;
    },

    onClick: function(){
        var data = this.getData();
        if (this.canSubmit() == false){
            return;
        }
        this.props.onSubmit(data);
    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {

        },

        buttonPlaceholder: {
            marginTop: 15
        }

    },

    render: function () {
        var disabled = !this.canSubmit();
        console.log('rendering TrainerForm: this.state.firstName, this.state.lastName = ', this.state.firstName, this.state.lastName);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder} className={'ui form'} >


                    <div className={'field'} >
                        <label>
                            Имя
                        </label>
                        <input type={'text'} onChange={this.onFirstNameChange} value={this.state.firstName} placeholder={'Имя'} />
                    </div>

                    <div className={'field'} >
                        <label>
                            Фамилия
                        </label>
                        <input type={'text'} onChange={this.onLastNameChange} value={this.state.lastName} placeholder={'Фамилия'} />
                    </div>

                    {this.props.editMode == true? null :
                        <div >
                            <div className={'field'} >
                                <label>
                                    Email
                                </label>
                                <input type={'text'} onChange={this.onEmailChange} value={this.state.email} placeholder={'Email'} />
                            </div>

                            <div className={'field'} >
                                <label>
                                    Пароль
                                </label>
                                <input type={'password'} onChange={this.onPasswordChange} value={this.state.password} placeholder={'Пароль'} />
                            </div>

                            <div className={'field'} >
                                <label>
                                    Повторите пароль
                                </label>
                                <input type={'password'} onChange={this.onPasswordConfirmationChange} value={this.state.passwordConfirmation} placeholder={'Повторите пароль'} />
                            </div>
                        </div>
                    }

                </div>

                {this.props.extraContent == undefined ? null :
                    <div>
                        {this.props.extraContent}
                    </div>
                }

                <div style={this.componentStyle.buttonPlaceholder}>

                    <button className={this.props.buttonClassName} disabled={disabled} onClick={this.onClick} >
                        <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                    </button>

                </div>

            </div>
        );
    }

});

module.exports = TrainerForm;