/**
 * Created by sabir on 19.12.16.
 */


import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import SimpleUserTemplate from '../../templates/redux/SimpleUserTemplate.js'

import TeamsPanel from '../../../components/teams/panels/TeamsPanel.js'

class TrainerTeamsApp extends React.Component {

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

                <TeamsPanel />

            </div>
        )
    }

    render(){
        return (
            <SimpleUserTemplate active={'teams'} content={this.getContent()} />
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




TrainerTeamsApp = connect(mapStateToProps, mapDispatchToProps)(TrainerTeamsApp)

export default TrainerTeamsApp