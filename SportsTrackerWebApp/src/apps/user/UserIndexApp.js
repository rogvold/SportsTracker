/**
 * Created by sabir on 20.06.16.
 */


var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');
var TrainerHeaderLinks = require('../../components/templates/header/TrainerHeaderLinks');

var OrganizationBootstrap = require('../../components/organization/OrganizationBootstrap');

var UserPagePanel = require('../../components/profile_page/UserPagePanel');

var UserIndexApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'OrganizationStore')],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var orgStore = flux.store('OrganizationStore');
        var loading = (store.loading || orgStore.loading);
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        return {
            loading: loading,
            user: user,
            organization: orgStore.organization
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

                <UserPagePanel user={this.state.user} organization={this.state.organization} />

            </div>
        );
    },

    getCenterLinksContent: function(){
        var user = this.state.user;

        return (
            <div>
                <UserHeaderLinks active={'calendar'} />
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

module.exports = UserIndexApp;