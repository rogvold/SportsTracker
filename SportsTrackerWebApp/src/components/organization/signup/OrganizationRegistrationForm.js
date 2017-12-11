/**
 * Created by sabir on 21.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommonHelper = require('../../../helpers/CommonHelper');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UserAPI = require('../../../api/UserAPI');

var ClubRegistrationForm= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],

    getDefaultProps: function () {
        return {

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
        return {
            step: 0,
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            phone: '',
            clubName: '',
            clubAddress: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '80%',
            margin: '0 auto'
        },

        bottomButtonsPlaceholder: {
            marginTop: 10,
            position: 'relative'
        },

        nextButtonPlaceholder: {
            position: 'absolute',
            right: 0
        },

        prevButtonPlaceholder: {
            position: 'absolute',
            left: 0
        },


        formPlaceholder: {

        },

        itemInput: {
            marginTop: 10
        },

        input: {
            fontSize: 20
        },

        step1Placeholder: {

        },

        step2Placeholder: {

        },

        headerPlaceholder: {
            fontSize: 24,
            marginBottom: 30
        }

    },

    onNext: function(){
        this.setState({
            step: this.state.step + 1
        });
    },

    onPrev: function(){
        this.setState({
            step: this.state.step - 1
        });
    },

    getParamsMap: function(){
        return {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            clubName: this.state.clubName,
            clubAddress: this.state.clubAddress
        }
    },

    canSubmit: function(){
        var map = this.getParamsMap();
        var f = true;
        for (var key in map){
            var v = map[key];
            if (v == undefined || v.trim() == ''){
                f = false;
            }
        }
        if (this.state.password != this.state.passwordConfirmation){
            f = false;
        }
        if (CommonHelper.validateEmail(this.state.email) == false){
            f = false;
        }
        return f;
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

    onClubNameChange: function(evt){
        this.setState({
            clubName: this.getValFromEvt(evt)
        });
    },

    onClubAddressChange: function(evt){
        this.setState({
            clubAddress: this.getValFromEvt(evt)
        });
    },

    onPhoneChange: function(evt){
        this.setState({
            phone: this.getValFromEvt(evt).trim()
        });
    },

    canDoNext: function(){
        var f = true;
        var step = this.state.step;
        var map = this.getParamsMap();
        if (step == 0){
            if (map['clubName'] == '' || map['clubAddress'] == ''){
                f = false;
            }
        }
        if (step == 1){
            if (map['firstName'] == '' || map['lastName'] == '' || map['phone'] == ''){
                f = false;
            }
        }
        return f;
    },

    onSubmit: function(){
        var paramsMap = this.getParamsMap();
        var data = {
            organization: {
                name: paramsMap.clubName,
                address: paramsMap.clubAddress
            },
            user: {
                firstName: paramsMap.firstName,
                lastName: paramsMap.lastName,
                email: paramsMap.email,
                password: paramsMap.password,
                phone: paramsMap.phone
            }
        };
        this.getFlux().actions.registerAdminAndOrganization(data.user, data.organization, function(){
            UserAPI.logIn(data.user.email, data.user.password, function(){
                //window.location.reload();
                CommonHelper.forceTransitionTo('/#/');
            }, function(err){
                console.log(err);
            })
        });
    },

    render: function () {
        var step = this.state.step;
        var canSubmit = this.canSubmit();
        var canDoNext = this.canDoNext();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder} >

                    {step == 0 ?
                        <div style={this.componentStyle.step2Placeholder}>

                            <div style={this.componentStyle.headerPlaceholder}>
                                Шаг 1 <span style={{opacity: 0.2}}>/3</span>. Информация о школе.
                            </div>

                            <div className={'ui form'} >
                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input  value={this.state.clubName}
                                            onChange={this.onClubNameChange}
                                            autoFocus={true}
                                            style={this.componentStyle.input}
                                            type={'text'}
                                            placeholder={'Название школы'} />
                                </div>

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                            value={this.state.clubAddress}
                                            onChange={this.onClubAddressChange}
                                            style={this.componentStyle.input}
                                            type={'text'}
                                            placeholder={'Адрес школы'} />
                                </div>

                            </div>

                        </div> : null
                    }

                    {step == 1 ?
                        <div style={this.componentStyle.step1Placeholder}>

                            <div style={this.componentStyle.headerPlaceholder}>
                                Шаг 2 <span style={{opacity: 0.2}}>/3</span>. Контактная информация.
                            </div>

                            <div className={'ui form'} >

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                            value={this.state.firstName}
                                            onChange={this.onFirstNameChange}
                                            autoFocus={true} style={this.componentStyle.input} placeholder={'Имя'} />
                                </div>

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                            value={this.state.lastName}
                                            onChange={this.onLastNameChange}
                                            style={this.componentStyle.input} placeholder={'Фамилия'} />
                                </div>

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                            value={this.state.phone}
                                            onChange={this.onPhoneChange}
                                            style={this.componentStyle.input} placeholder={'Телефон'} />
                                </div>

                            </div>

                        </div> : null
                    }

                    {step == 2 ?
                        <div style={this.componentStyle.step1Placeholder}>

                            <div style={this.componentStyle.headerPlaceholder}>
                                Шаг 3 <span style={{opacity: 0.2}}>/3</span>. Учетная информация.
                            </div>

                            <div className={'ui form'} >
                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                        value={this.state.email}
                                        onChange={this.onEmailChange}
                                        type={'email'} autoFocus={true} style={this.componentStyle.input} placeholder={'Email'} />
                                </div>

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                        type={'password'} style={this.componentStyle.input} placeholder={'Пароль'} />
                                </div>

                                <div style={this.componentStyle.itemInput} className={'field'} >
                                    <input
                                        value={this.state.passwordConfirmation}
                                        onChange={this.onPasswordConfirmationChange}
                                        type={'password'} style={this.componentStyle.input} placeholder={'Пароль еще раз'} />
                                </div>
                            </div>

                        </div> : null
                    }

                </div>

                {this.state.errorMessage == undefined ? null :
                    <div className={'ui negative message'} >
                        <div className={'header'}>
                            {this.state.errorMessage}
                        </div>
                    </div>
                }

                <div style={this.componentStyle.bottomButtonsPlaceholder}>

                    <div style={this.componentStyle.prevButtonPlaceholder}>
                        {step == 0 ? null :
                            <button className={'ui button'} onClick={this.onPrev} >
                                <i className={'icon arrow left'} ></i> Назад
                            </button>
                        }

                    </div>

                    <div style={this.componentStyle.nextButtonPlaceholder}>

                        {step == 2 ?
                            <button disabled={!canSubmit} className={'ui button green'} onClick={this.onSubmit} style={{marginRight: 0}} >
                                <i className={'icon checkmark'} ></i> Зарегистрироваться
                            </button>
                            :
                            <button disabled={!canDoNext} className={'ui button patientPrimary'} onClick={this.onNext} style={{marginRight: 0}} >
                                Далее <i className={'icon arrow right'} ></i>
                            </button>
                        }

                    </div>

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = ClubRegistrationForm;