/**
 * Created by sabir on 13.07.16.
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

var CalendarPanel = require('../../components/field/calendar/CalendarPanel');
var TrainingsCalendar = require('../../components/trainings/calendar/TrainingsCalendar');

var OrganizationBootstrap = require('../../components/organization/OrganizationBootstrap');

var AdminIndexApp = React.createClass({
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
                setTimeout(function(){
                    this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
                }.bind(this), 500);
            }
        }
    },

    componentStyle: {
        placeholder: {

        }
    },

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;

        var user = this.state.user;


        var adminId = (user == undefined) ? undefined : user.id;

        return (
            <div style={this.componentStyle.placeholder} >

                <div>

                    {true == true ? null :
                        <CalendarPanel  />
                    }


                    <TrainingsCalendar />

                </div>

                {adminId == undefined ? null :
                    <OrganizationBootstrap adminId={adminId} />
                }



            </div>
        );
    },

    getCenterLinksContent: function(){
        var user = this.state.user;
        //if (user == undefined){
        //    return null;
        //}

        return (
            <div>
                <ClubAdminHeaderLinks active={'calendar'} />
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

module.exports = AdminIndexApp;