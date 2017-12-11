/**
 * Created by sabir on 15.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BallPreloader = require('../../components/preloader/BallPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');
var ClubAdminHeaderLinks = require('../../components/templates/header/ClubAdminHeaderLinks');
var TrainerHeaderLinks = require('../../components/templates/header/TrainerHeaderLinks');

var OrganizationBootstrap = require('../../components/organization/OrganizationBootstrap');

var OrganizationUsersPanel = require('../../components/organization/users/OrganizationUsersPanel');

var TrainerUsersApp= createReactClass({
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
            user: user
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
            //backgroundColor: 'white',
            //padding: 10,
            width: 960,
            margin: '0 auto',
            //marginTop: 10,
            //border: '1px solid rgb(239, 240, 241)',
            //borderRadius: 3
        }

    },

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;

        var user = this.state.user;

        var adminId = (user == undefined) ? undefined : user.id;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.content}>
                    <div style={{marginBottom: 10, marginTop: 10}}>

                        <OrganizationUsersPanel />

                    </div>

                </div>


                {this.state.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        );
    },

    getCenterLinksContent: function(){
        var user = this.state.user;

        return (
            <div>
                <TrainerHeaderLinks active={'users'} />
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

module.exports = TrainerUsersApp;