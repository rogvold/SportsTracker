/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrainerForm = require('../../../trainers/TrainerForm');

var CoolPreloader = require('../../../preloader/CoolPreloader');

var UserGroupsPanel = require('../group/UserGroupsPanel');
var createReactClass = require('create-react-class');
var UserUpdatePanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            onUserUpdated: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        var uStore = flux.store('UsersStore');
        var loading = (store.loading || uStore.loading);
        return {
            loading: loading,
            user: store.getUser(this.props.userId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    onSubmit: function(data){
        data.userId = this.props.userId;
        this.getFlux().actions.updateUser(data, function(){
            this.props.onUserUpdated();
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {

        },

        groupsPlaceholder: {
            marginTop: 10,
            fontSize: 14
        }

    },

    getUserGroupsComponent: function(){
        return (
            <div style={this.componentStyle.groupsPlaceholder} className={'field'} >
                <b>
                    Команды
                </b>
                <UserGroupsPanel userId={this.props.userId} />
            </div>
        );
    },

    render: function(){
        var user = this.state.user;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <TrainerForm firstName={user.firstName}
                                 lastName={user.lastName}
                                 onSubmit={this.onSubmit}
                                 editMode={true}
                                 extraContent={this.getUserGroupsComponent()}
                        />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserUpdatePanel;