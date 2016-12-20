/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Field, reduxForm } from 'redux-form';

import validator from 'validator';

let UserForm = (props) => {
    const {handleSubmit, valid} = props;

    return (
        <div className={'user_form ui form'} onSubmit={handleSubmit} >
            <div className={'field'} >
                <label htmlFor="firstName">Имя</label>
                <Field name="firstName"
                       placeholder={'Имя'}
                       component="input" type="text"/>
            </div>

            <div className={'field'} >
                <label htmlFor="lastName">Фамилия</label>
                <Field name="lastName"
                       placeholder={'Фамилия'}
                       component="input" type="text"/>

            </div>

            <div className={'field'} >
                <label htmlFor="email">Email</label>
                <Field
                    placeholder={'Email'}
                    name="email" component="input" type="email"/>

            </div>

            <div className={'field'} >
                <label htmlFor="password">Пароль</label>
                <Field
                    placeholder={'Пароль'}
                    name="password" component="input" type="password"/>

            </div>

            <div className={'field'} >
                <label htmlFor="passwordConfirmation">Повторите пароль</label>
                <Field name="passwordConfirmation"
                       placeholder={'Повторите пароль'}
                       component="input" type="password"/>

            </div>

            <button  type="submit" disabled={!valid} className={'ui button'} onClick={handleSubmit} >
                <i className={'icon save'} ></i> Сохранить
            </button>

        </div>
    )

}


const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = 'Обязательное поле'
    }
    if (!values.lastName) {
        errors.lastName = 'Обязательное поле'
    }
    if (!values.email) {
        errors.email = 'Обязательное поле'
    }
    if (values.email == undefined || validator.isEmail(values.email) == false){
        errors.email = 'Неправильно введен Email'
    }
    if (!values.password) {
        errors.password = 'Обязательное поле'
    }
    if (values.password != values.passwordConfirmation){
        errors.passwordConfirmation = 'Пароль и подтверждение пароля не совпадают'
    }
    return errors
}


UserForm = reduxForm({
    form: 'create_user_form',
    validate: validate
})(UserForm);

export default UserForm