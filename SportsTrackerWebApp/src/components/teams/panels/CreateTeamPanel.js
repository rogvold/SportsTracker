/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GroupForm from '../../groups/new/GroupForm.js'

import * as actions from '../../../redux/actions/OrganizationActions.js'

class CreateTeamPanel extends React.Component {

    static defaultProps = {
        onCreated: () => {

        }
    }

    static propTypes = {
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

    onSubmit = (data) => {
        this.props.createTeam(data).then(() => {
            this.props.onCreated();
        });
    }

    render = () => {

        return (
            <div className={'create_team_panel'} >

                <GroupForm onSubmit={this.onSubmit} />

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTeam: (data) => {
            return dispatch(actions.createGroup(data))
        }
    }
}

CreateTeamPanel = connect(mapStateToProps, mapDispatchToProps)(CreateTeamPanel)

export default CreateTeamPanel