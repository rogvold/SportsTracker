/**
 * Created by sabir on 13.07.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');

var OrganizationSignUpPanel = require('../../components/organization/signup/OrganizationSignUpPanel');

var NewOrganizationApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },


    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <OrganizationSignUpPanel />

            </div>
        );
    }

});

module.exports = NewOrganizationApp;