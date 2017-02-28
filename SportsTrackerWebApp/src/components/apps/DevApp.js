/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthPanel from '../auth/panels/AuthPanel.js'
import LogoutWrapper from '../auth/buttons/LogoutWrapper.js'

import CreateUserPanel from '../users/panels/CreateUserPanel.js'

import CalendarPanel from '../new_calendar/panels/CalendarPanel.js'

import JuniorAPI from '../../api/JuniorAPI'



class DevApp extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    testGetToken(){
        JuniorAPI.getNewToken('+7 999 999 99 99', '1qa2ws3ed');
    }

    testAuthJunior(){
        JuniorAPI.authJunior();
    }

    testGetFields(){
        JuniorAPI.getFields();
    }

    testLoadAllTrainerData() {
        JuniorAPI.getAllTrainerData();
    }

    testLoadGroupUsersLinks() {
        var groupId = "7263";
        JuniorAPI.loadGroupUsersLinks(groupId)
    }

    render() {

        return (
            <div className={'dev_app'} >

                <button onClick={this.testGetToken}>
                    test get token
                </button>

                <button onClick={this.testAuthJunior}>
                    test auth
                </button>

                <button onClick={this.testGetFields}>
                    test getFields
                </button>

                <button onClick={this.testLoadAllTrainerData}>
                    test testLoadAllTrainerData
                </button>

                <button onClick={this.testLoadGroupUsersLinks} >
                    testLoadGroupUsersLinks
                </button>



            </div>
        )
    }

}

export default DevApp