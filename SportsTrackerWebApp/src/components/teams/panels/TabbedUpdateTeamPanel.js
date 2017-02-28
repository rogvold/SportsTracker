/**
 * Created by sabir on 22.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateTeamPanel from './UpdateTeamPanel.js'

import GroupLinksPanel from '../../new_groups/panels/GroupLinksPanel.js'

class TabbedUpdateTeamPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        mode: 'general'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    switchMode = (newMode) => {
        this.setState({
            mode: newMode
        });
    }

    render = () => {
        let {teamId} = this.props;
        let {mode} = this.state;

        return (
            <div className={'tabbed_update_team_panel'} >

                <GroupLinksPanel groupId={teamId} />

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//TabbedUpdateTeamPanel = connect(mapStateToProps, mapDispatchToProps)(TabbedUpdateTeamPanel)

export default TabbedUpdateTeamPanel