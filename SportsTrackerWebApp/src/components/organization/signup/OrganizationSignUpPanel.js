/**
 * Created by sabir on 21.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var OrganizationCoolSlider = require('./OrganizationCoolSlider');
var OrganizationRegistrationForm = require('./OrganizationRegistrationForm');

var ClubSignUpPanel= createReactClass({
    getDefaultProps: function () {
        return {

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
            width: '100vw',
            height: '100vh'
        },

        sliderPlaceholder: {
            width: '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            height: '100%'
        },

        formPlaceholder: {
            width: '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            height: '100%',
            padding: 10,
            textAlign: 'center',
            paddingTop: 50,
            backgroundColor: 'white'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.sliderPlaceholder}>
                    <OrganizationCoolSlider />
                </div>

                <div style={this.componentStyle.formPlaceholder}>

                    <div style={{fontSize: 30, textAlign: 'center'}} >
                        Регистрация школы
                    </div>

                    <div style={{marginTop: 70}}>
                        <OrganizationRegistrationForm />
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = ClubSignUpPanel;