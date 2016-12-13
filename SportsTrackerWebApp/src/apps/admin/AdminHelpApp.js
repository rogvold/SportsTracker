/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');
var ClubAdminHeaderLinks = require('../../components/templates/header/ClubAdminHeaderLinks');

var OrganizationBootstrap = require('../../components/organization/OrganizationBootstrap');

var AdminHelpApp = React.createClass({

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        console.log('UserIndexApp: componentDidMount occured');
        if (user == undefined){
            try{
                this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
            }catch(ee){
                //setTimeout(function(){
                //    this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
                //}.bind(this), 500);
            }
        }
    },

    componentStyle: {
        placeholder: {

        },

        content: {
            backgroundColor: 'white',
            padding: 10,
            width: 850,
            margin: '0 auto',
            marginTop: 10,
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3
        }

    },

    getContent: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.content}>
                    <div style={{marginBottom: 10}}>
                        <div style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}} >
                            Помощь
                        </div>

                        <div>
                            <p>
                                Will be available soon
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        );
    },

    getCenterLinksContent: function(){
        var user = this.state.user;

        return (
            <div>
                <ClubAdminHeaderLinks active={'help'} />
            </div>
        );
    },

    render: function(){
        var centerLinksContent = this.getCenterLinksContent();

        return (
            <div style={this.componentStyle.placeholder} >

                <UserPageTemplate
                    centerLinksContent={centerLinksContent}
                    contentStyle={{width: '100%'}}
                    content={this.getContent()}
                    />

            </div>
        );
    }

});

module.exports = AdminHelpApp;