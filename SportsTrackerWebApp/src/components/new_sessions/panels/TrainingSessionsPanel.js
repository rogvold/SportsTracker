/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/TrainingsActions.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import TrainingUsersPanel from './TrainingUsersPanel.js'

class TrainingSessionsPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        trainingId: PropTypes.string.isRequired
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

        return (
            <div className={'training_sessions_panel'} >

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
        loading: state.trainings.loading
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