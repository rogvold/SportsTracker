/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GroupForm from '../../groups/new/GroupForm.js'

import * as actions from '../../../redux/actions/OrganizationActions.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import DeleteButton from '../../button/DeleteButton.js'

import UpdateGroupLinksPanel from '../../new_groups/panels/UpdateGroupLinksPanel.js'

class UpdateTeamPanel extends React.Component {

    static defaultProps = {


        onTeamUpdated: () => {
            console.log('default onTeamUpdated occured');
        },

        onTeamDeleted: () => {
            console.log('default onTeamDeleted occured');
        }

    }

    static propTypes = {
        teamsMap: PropTypes.object.isRequired,
        teamId: PropTypes.string.isRequired,
        updateTeam: PropTypes.func.isRequired,
        deleteTeam: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
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
        let d = Object.assign({}, this.getTeam(), data);
        this.props.updateTeam(d).then(() => {
            this.props.onTeamUpdated()
        });
    }

    getTeam = () => {
        return this.props.teamsMap[this.props.teamId];
    }

    onDelete = () => {
        this.props.deleteTeam(this.props.teamId).then(
            () => {this.props.onTeamDeleted()}
        );
    }

    render = () => {
        let team = this.getTeam();

        return (
            <div className={'update_team_panel'} >

                {team == undefined ? null :
                    <GroupForm onSubmit={this.onSubmit}
                               name={team.name} description={team.description} />
                }

                <div className={'delete_button_placeholder'} >
                    <DeleteButton onDelete={this.onDelete} buttonClassName={'ui inverted red button noMarginRight'}  />
                </div>

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        teamsMap: state.organization.groupsMap,
        loading: state.organization.loading
        //currentUserId: state.users.currentUser,
        //loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateTeam: (data) => {
            return dispatch(actions.updateGroup(data))
        },

        deleteTeam: (id) => {
            return dispatch(actions.deleteGroup(id))
        }

    }
}

UpdateTeamPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateTeamPanel)

export default UpdateTeamPanel