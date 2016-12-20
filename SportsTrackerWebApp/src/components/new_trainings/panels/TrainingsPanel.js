/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/TrainingsActions.js'

import TrainingsList from '../list/TrainingsList.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

class TrainingsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadOrganizationTrainings();
    }

    componentWillReceiveProps() {

    }

    render = () => {
        const {trainings} = this.props;

        return (
            <div className={'trainings_panel'} >

                <TrainingsList trainings={trainings} />

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        trainings: TrainingsHelper.getAllTrainings(state.trainings.trainingsMap),
        loading: state.trainings.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganizationTrainings: () => {
            return dispatch(actions.loadOrganizationTrainings());
        }
    }
}

TrainingsPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingsPanel)

export default TrainingsPanel