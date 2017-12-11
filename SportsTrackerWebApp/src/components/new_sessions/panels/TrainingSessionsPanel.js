/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/TrainingsActions.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import TrainingUsersPanel from './TrainingUsersPanel.js'

import moment from 'moment'

class TrainingSessionsPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadTrainingSessions(this.props.trainingId)
    }

    componentWillReceiveProps() {

    }

    render = () => {
        const {trainingsMap, trainingId, fieldsMap} = this.props;
        const tr = trainingsMap[trainingId];
        if (tr == undefined){
            return null;
        }
        const field = fieldsMap[tr.fieldId];


        return (
            <div className={'training_sessions_panel'} >

                <div className={'date'} >
                    {moment(tr.startTimestamp).format('DD.MM.YYYY HH:mm')}
                </div>

                {field && <div className={'field_name'} >
                    {field.name}
                </div> }

                <TrainingUsersPanel trainingId={this.props.trainingId} />

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        loading: state.trainings.loading,
        trainingsMap: state.trainings.trainingsMap,
        fieldsMap: state.organization.fieldsMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTrainingSessions: (trainingId) => {
            return dispatch(actions.loadTrainingSessions(trainingId));
        }
    }
}

TrainingSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingSessionsPanel)

export default TrainingSessionsPanel