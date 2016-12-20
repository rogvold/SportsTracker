/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthPanel from '../auth/panels/AuthPanel.js'
import LogoutWrapper from '../auth/buttons/LogoutWrapper.js'

import CreateUserPanel from '../users/panels/CreateUserPanel.js'

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

    render() {

        return (
            <div className={'dev_app'} >

                this is a dev app

                <CreateUserPanel />

            </div>
        )
    }

}

export default DevApp