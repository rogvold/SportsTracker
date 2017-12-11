/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import SimpleUserTemplate from '../../templates/redux/SimpleUserTemplate.js'

import UsersPanel from '../../users/panels/UsersPanel.js'

class TrainerUsersApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var user = this.props.currentUser;
        this.props.loadOrganization(user.organizationId);
    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;

        return (
            <div className={'user_index_app_content'} >

                <UsersPanel />

            </div>
        )
    }

    render(){
        return (
            <SimpleUserTemplate active={'users'} content={this.getContent()} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganization: (id) => dispatch(actions.loadOrganization(id))
    }
}




TrainerUsersApp = connect(mapStateToProps, mapDispatchToProps)(TrainerUsersApp)

export default TrainerUsersApp