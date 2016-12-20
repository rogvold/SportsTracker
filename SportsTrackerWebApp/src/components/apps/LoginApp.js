/**
 * Created by sabir on 18.12.16.
 */


import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthPanel from '../auth/panels/AuthPanel.js'
import LogoutWrapper from '../auth/buttons/LogoutWrapper.js'

class LoginApp extends React.Component {

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
            <div className={'login_app'} >


                <AuthPanel />

                <LogoutWrapper >
                    logout!
                </LogoutWrapper>

            </div>
        )
    }

}

export default LoginApp