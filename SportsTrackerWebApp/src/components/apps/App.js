/**
 * Created by sabir on 18.12.16.
 */


import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Router, Route, browserHistory, useRouterHistory, hashHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

//apps
import UserIndexApp from './user/UserIndexApp.js';
import LoginApp from './LoginApp.js';
import DevApp from './DevApp.js';

//admin
import AdminIndexApp from './admin/AdminIndexApp.js';
import AdminHelpApp from './admin/AdminHelpApp.js';
import AdminSettingsApp from './admin/AdminSettingsApp.js';
import AdminUsersApp from './admin/AdminUsersApp.js';
import AdminTrainersApp from './admin/AdminTrainersApp.js';
import AdminTeamsApp from './admin/AdminTeamsApp.js';

//trainer
import TrainerIndexApp from './trainer/TrainerIndexApp.js';
import TrainerHelpApp from './trainer/TrainerHelpApp.js';
import TrainerTeamsApp from './trainer/TrainerTeamsApp.js';
import TrainerUsersApp from './trainer/TrainerUsersApp.js';

class App extends React.Component {

    static defaultProps = {}

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getUserRoute() {

        console.log('getUserRoute occured');

        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route useAutoKeys={false} path="/dev" component={DevApp} >
                    <IndexRoute component={DevApp} />
                </Route>

            </Router>
        );
    }

    getAdminRoute() {
        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={AdminIndexApp} >
                    <IndexRoute component={AdminIndexApp} />
                </Route>

                <Route useAutoKeys={false} path="/help" component={AdminHelpApp} >
                    <IndexRoute component={AdminHelpApp} />
                </Route>

                <Route useAutoKeys={false} path="/settings" component={AdminSettingsApp} >
                    <IndexRoute component={AdminSettingsApp} />
                </Route>

                <Route useAutoKeys={false} path="/users" component={AdminUsersApp} >
                    <IndexRoute component={AdminUsersApp} />
                </Route>

                <Route useAutoKeys={false} path="/trainers" component={AdminTrainersApp} >
                    <IndexRoute component={AdminTrainersApp} />
                </Route>

                <Route useAutoKeys={false} path="/teams" component={AdminTeamsApp} >
                    <IndexRoute component={AdminTeamsApp} />
                </Route>

                <Route useAutoKeys={false} path="/dev" component={DevApp} >
                    <IndexRoute component={DevApp} />
                </Route>

            </Router>
        );
    }

    getTrainerRoute() {
        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={TrainerIndexApp} >
                    <IndexRoute component={TrainerIndexApp} />
                </Route>

                <Route useAutoKeys={false} path="/help" component={TrainerHelpApp} >
                    <IndexRoute component={TrainerHelpApp} />
                </Route>

                <Route useAutoKeys={false} path="/users" component={TrainerUsersApp} >
                    <IndexRoute component={TrainerUsersApp} />
                </Route>

                <Route useAutoKeys={false} path="/teams" component={TrainerTeamsApp} >
                    <IndexRoute component={TrainerTeamsApp} />
                </Route>

                <Route useAutoKeys={false} path="/dev" component={DevApp} >
                    <IndexRoute component={DevApp} />
                </Route>



            </Router>
        );
    }

    render() {

        if (this.props.initialized == false){
            console.log('render: not initialized');
            return (
                <div className={'initializing_placeholder'} >
                    загрузка...
                </div>
            );
        }

        var user = this.props.currentUser;
        if (user == undefined){
            return (
                <LoginApp />
            );
        }
        let role = user.userRole;
        if (role == 'admin'){
            return this.getAdminRoute();
        }

        if (role == 'trainer'){
            return this.getTrainerRoute();
        }


        return this.getUserRoute();
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        initialized: state.users.initialized
    }
}

App = connect(mapStateToProps, null)(App)

export default App