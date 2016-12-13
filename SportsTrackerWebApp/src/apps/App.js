/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');

//router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var createHashHistory = require('history').createHashHistory;


//apps
var LoginApp = require('./guest/LoginApp');
var APIPlaygroundApp = require('./guest/APIPlaygroundApp');
var NewOrganizationApp = require('./guest/NewOrganizationApp');

var UserIndexApp = require('./user/UserIndexApp');
var UserDocsApp = require('./user/UserDocsApp');

//admin
var AdminIndexApp = require('./admin/AdminIndexApp');
var AdminGroupsApp = require('./admin/AdminGroupsApp');
var AdminTrainersApp = require('./admin/AdminTrainersApp');
var AdminSettingsApp = require('./admin/AdminSettingsApp');
var AdminUsersApp = require('./admin/AdminUsersApp');
var AdminHelpApp = require('./admin/AdminHelpApp');

var DevApp = require('./DevApp');
var RealTimeApp = require('./guest/RealTimeApp');
var EnglishApp = require('./guest/EnglishApp');

/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
var RealTimeStore = require('../flux/stores/RealTimeStore');
var OrganizationStore = require('../flux/stores/OrganizationStore');
var PusherStore = require('../flux/stores/PusherStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');
var OrganizationActions = require('../flux/actions/OrganizationActions');
var GroupsActions = require('../flux/actions/GroupsActions');
var TrainersActions = require('../flux/actions/TrainersActions');
var FieldsActions = require('../flux/actions/FieldsActions');
var OrganizationUsersActions = require('../flux/actions/OrganizationUsersActions');
var RealTimeActions = require('../flux/actions/RealTimeActions');
var PusherActions = require('../flux/actions/PusherActions');

var stores = {UsersStore: new UsersStore(), OrganizationStore: new OrganizationStore(), RealTimeStore: new RealTimeStore(), PusherStore: new PusherStore()};
var actions = assign({}, UsersActions, OrganizationActions, GroupsActions, TrainersActions, OrganizationUsersActions, FieldsActions, RealTimeActions, PusherActions);
var flux = new Fluxxor.Flux(stores, actions);


//api
var UserAPI = require('../api/UserAPI');

//components
//var AlertsComponent = require('../components/alert/AlertsComponent');

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});


var App = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function(){
        document.title = 'SportsTracker';
    },

    componentStyle: {
        placeholder: {}
    },

    createFluxComponent: function(Component, props){
        return (
            <Component {...props} flux={flux} />
    );
    },


    getLoginContent: function(){
        return (
            <LoginApp />
        );
    },

    getGuestRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={LoginApp} >
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/login" component={LoginApp}>
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/api" component={APIPlaygroundApp}>
                    <IndexRoute component={APIPlaygroundApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/new" component={NewOrganizationApp}>
                    <IndexRoute component={NewOrganizationApp} />
                </Route>

                <Route path="/realtime" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/hrm" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/english" component={EnglishApp}>
                    <IndexRoute component={EnglishApp} />
                </Route>

            </Router>
        );
    },

    getUserRoute: function(){

        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/docs" component={UserDocsApp}>
                    <IndexRoute component={UserDocsApp} />
                </Route>

                <Route path="/api" component={APIPlaygroundApp}>
                    <IndexRoute component={APIPlaygroundApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/realtime" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/hrm" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/english" component={EnglishApp}>
                    <IndexRoute component={EnglishApp} />
                </Route>

            </Router>
        );
    },


    getAdminRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>

                <Route useAutoKeys={false} path="/" component={AdminIndexApp} >
                    <IndexRoute component={AdminIndexApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/teams" component={AdminGroupsApp}>
                    <IndexRoute component={AdminGroupsApp} />
                </Route>

                <Route path="/users" component={AdminUsersApp}>
                    <IndexRoute component={AdminUsersApp} />
                </Route>

                <Route path="/settings" component={AdminSettingsApp}>
                    <IndexRoute component={AdminSettingsApp} />
                </Route>

                <Route path="/help" component={AdminHelpApp}>
                    <IndexRoute component={AdminHelpApp} />
                </Route>

                <Route path="/trainers" component={AdminTrainersApp}>
                    <IndexRoute component={AdminTrainersApp} />
                </Route>

                <Route path="/realtime" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/hrm" component={RealTimeApp}>
                    <IndexRoute component={RealTimeApp} />
                </Route>

                <Route path="/english" component={EnglishApp}>
                    <IndexRoute component={EnglishApp} />
                </Route>

            </Router>
        );
    },

    render: function(){
        var currentUser = UserAPI.getCurrentUser();
        var role = (currentUser == undefined) ? undefined : currentUser.userRole;
        var isLoggedIn = UserAPI.isLoggedIn();
        console.log('App: render: isLoggedIn = ', isLoggedIn);
        console.log('role = ', role);
        var content = null;

        if (isLoggedIn == true){
            //if (role == 'airfieldAdmin'){
            if (role == 'admin'){
            //if (role == 'trainer'){
                content = this.getAdminRoute();
            }
            if (role == 'user'){
                content = this.getUserRoute();
            }
        }else {
            //content = this.getLoginContent();
            content = this.getGuestRoute();
        }

        return (
            <div>
                {content}
            </div>
        );
    }

});

ReactDOM.render(
    (<App flux={flux} />),
    document.getElementById('main')
);