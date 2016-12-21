/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import PlayerUsersSelectorPanel from '../../player_tools/panels/PlayerUsersSelectorPanel.js'

import TrainingFieldPlayer from '../../new_field/panels/TrainingFieldPlayer.js'

import TrainingSessionsTabbedPanel from '../../new_sessions/panels/TrainingSessionsTabbedPanel.js'

import UserShotsPanel from '../../field/gate/UserShotsPanel.js'

class TrainingUsersPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        trainingId: PropTypes.string.isRequired,
        store: PropTypes.object.isRequired,
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

    getSessions = () => {
        const {store, trainingId} = this.props;
        let sessions = TrainingsHelper.getTrainingSessions(trainingId, store);
        return sessions;
    }

    getUsers = () => {
        let sessions = this.getSessions();
        let usersMap = this.props.store.users.usersMap;
        let arr = [];
        for (var i in sessions){
            let s = sessions[i].session;
            arr.push(usersMap[s.userId]);
        }
        return arr;
    }

    render = () => {
        const sessions = this.getSessions();
        const users = this.getUsers();

        //console.log('TrainingUsersPanel: render: sessions, users = ', sessions, users);

        return (
            <div className={''} >

                <TrainingSessionsTabbedPanel trainingId={this.props.trainingId} />

                <div className={'shots_placeholder'} >
                    <UserShotsPanel />
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        store: state,
        loading: state.trainings.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

TrainingUsersPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingUsersPanel)

export default TrainingUsersPanel