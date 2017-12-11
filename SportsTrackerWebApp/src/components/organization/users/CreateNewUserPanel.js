/**
 * Created by sabir on 25.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var CommonHelper = require('../../../helpers/CommonHelper');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var CreateNewUserPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function () {
        return {

            onSubmit: function(data){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            errorMessage: store.errorMessage
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            fontSize: 18,
            width: 350,
            margin: '0 auto',
            position: 'relative'
        },

        input: {
            fontSize: 18
        },

        inputPlaceholder: {
            marginTop: 7
        },

        buttonPlaceholder: {
            marginTop: 20
        }

    },

    getValFromEvt: function(evt){
        if (evt == undefined){
            return undefined;
        }
        var val = evt.target.value;
        if (val == undefined){
            return '';
        }
        return val;
    },

    onEmailChange: function(evt){
        this.setState({
            email: this.getValFromEvt(evt).trim()
        });
    },

    onPasswordChange: function(evt){
        this.setState({
            password: this.getValFromEvt(evt)
        });
    },

    onPasswordConfirmationChange: function(evt){
        this.setState({
            passwordConfirmation: this.getValFromEvt(evt)
        });
    },

    onFirstNameChange: function(evt){
        this.setState({
            firstName: this.getValFromEvt(evt).trim()
        });
    },

    onLastNameChange: function(evt){
        this.setState({
            lastName: this.getValFromEvt(evt).trim()
        });
    },


    getSubmitData: function(){
        return {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
    },

    isEmpty: function(s){
        return (s == undefined || s.trim() == '');
    },

    canSubmit: function(){
        var d = this.getSubmitData();
        if (CommonHelper.validateEmail(d.email) == false){
            return false;
        }
        if (this.isEmpty(d.firstName) || this.isEmpty(d.lastName) ||
            this.isEmpty(d.password)){
            return false;
        }
        if (this.state.password != this.state.passwordConfirmation){
            return false;
        }

        return true;
    },

    onSubmit: function(){
        var data = this.getSubmitData();
        this.props.onSubmit(data);
    },

    render: function () {
        var canSubmit = this.canSubmit();

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui form'} >

                    <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                        <input
                            value={this.state.firstName}
                            onChange={this.onFirstNameChange}
                            autoFocus={true} style={this.componentStyle.input} placeholder={'Имя'} />
                    </div>

                    <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                        <input
                            value={this.state.lastName}
                            onChange={this.onLastNameChange}
                            style={this.componentStyle.input} placeholder={'Фамилия'} />
                    </div>


                    <div style={{height: 1, marginTop: 10, marginBottom: 10, borderTop: '1px solid #eff0f1'}} ></div>

                    <div className={'ui form'} >
                        <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                            <input
                                value={this.state.email}
                                onChange={this.onEmailChange}
                                type={'email'} style={this.componentStyle.input} placeholder={'Email'} />
                        </div>

                        <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                            <input
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                type={'password'} style={this.componentStyle.input} placeholder={'Пароль'} />
                        </div>

                        <div style={this.componentStyle.inputPlaceholder} className={'field'} >
                            <input
                                value={this.state.passwordConfirmation}
                                onChange={this.onPasswordConfirmationChange}
                                type={'password'} style={this.componentStyle.input} placeholder={'Пароль еще раз'} />
                        </div>
                    </div>

                    {this.state.errorMessage == undefined ? null :
                        <div className={'ui negative message'} >
                            <div className={'header'}>
                                {this.state.errorMessage}
                            </div>
                        </div>
                    }

                    <div style={this.componentStyle.buttonPlaceholder}>

                        <button disabled={!canSubmit} className={'ui patientPrimary huge button fluid'} onClick={this.onSubmit} >
                            <i className={'icon checkmark'} ></i> Создать пользователя
                        </button>

                    </div>

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreateNewUserPanel;