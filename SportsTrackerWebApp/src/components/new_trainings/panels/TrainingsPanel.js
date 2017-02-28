/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/TrainingsActions.js'

import TrainingsList from '../list/TrainingsList.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import * as playerActions from '../../../redux/actions/PlayerActions.js'
import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import Dialog from '../../dialog/Dialog.js'

import TrainingSessionsPanel from '../../new_sessions/panels/TrainingSessionsPanel.js'

class TrainingsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        userId: PropTypes.string,
        currentUser: PropTypes.object
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {currentUser, userId, usersMap} = this.props;

        if (userId == undefined){
            userId = currentUser.id;
        }
        let user = usersMap[userId];
        let role = user.userRole;

        console.log('TrainingsPanel mounted: user = ', user);

        // if (role == 'user'){
        //     this.props.loadUserTrainings(userId);
        // }else {
        //     this.props.loadOrganizationTrainings();
        // }
    }

    componentWillReceiveProps() {

    }

    getTrainings = () => {
        let {trainingsMap, userId, currentUser, sessionsMap} = this.props;
        if (userId == undefined){
            userId = currentUser.id;
        }
        let arr = [];
        //console.log('TrainingsPanel: getTrainings occured');
        //console.log('sessionsMap = ', sessionsMap);

        for (var key in sessionsMap){
            let s = sessionsMap[key];
            if (s.session.userId == userId){
                //console.log('found user session  - ', s.session);
                let tr = trainingsMap[s.trainingId];
                if (tr != undefined){
                    arr.push(tr);
                }
            }
        }
        arr.sort((a, b) => {
            return (b.startTimestamp - a.startTimestamp)
        })
        return arr;
    }

    onTrainingClick = (tr) => {
        this.props.selectTraining(tr.id);
    }

    getTrainingContent = () => {
        var trainingId = this.props.selectedTrainingId;
        return (
            <div className={'selected_training_content'} >

                <TrainingSessionsPanel trainingId={trainingId} />

            </div>
        )

    }

    render = () => {
        let {currentUser, userId, selectedTrainingId} = this.props;
        if (userId == undefined){
            userId = currentUser.id;
        }
        let trainings = this.getTrainings();
        console.log('TrainingsPanel: render: userId, trainings = ', userId, trainings);

        return (
            <div className={'trainings_panel'} >

                <TrainingsList
                    showDate={true}
                    trainings={trainings} userId={userId} onTrainingClick={this.onTrainingClick} />

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

                {selectedTrainingId &&
                <Dialog
                        dialogPanelStyle={{width: 840, padding: 10}}
                        level={1200}
                        content={this.getTrainingContent()}
                        onClose={this.props.unselectTraining}
                    />}

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        //trainings: TrainingsHelper.getAllTrainings(state.trainings.trainingsMap),
        trainingsMap: state.trainings.trainingsMap,
        sessionsMap: state.trainings.sessionsMap,
        loading: state.trainings.loading,
        currentUser: state.users.currentUser,
        selectedTrainingId: state.player.selectedTrainingId,
        usersMap: state.users.usersMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganizationTrainings: () => {
            return dispatch(actions.loadOrganizationTrainings());
        },
        loadUserTrainings: (userId) => {
            return dispatch(actions.loadUserTrainings(userId));
        },
        selectTraining: (id) => {
            return dispatch(playerActions.selectTraining(id))
        },
        unselectTraining: () => {
            return dispatch(playerActions.unselectTraining())
        }
    }
}

TrainingsPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingsPanel)

export default TrainingsPanel