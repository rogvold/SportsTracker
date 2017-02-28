/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/TrainingsActions.js'
import * as playerActions from '../../../redux/actions/PlayerActions.js'

import CalendarPanel from '../../new_calendar/panels/CalendarPanel.js'

import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import moment from 'moment';

import Dialog from '../../dialog/Dialog.js'

import TrainingsList from '../list/TrainingsList.js'
import TrainingSessionsPanel from '../../new_sessions/panels/TrainingSessionsPanel.js'

class TrainingsCalendarPanel extends React.Component {

    static defaultProps = {
        className: 'trainings_calendar_panel'
    }

    static propTypes = {
        trainings: PropTypes.array.isRequired,
        selectedTrainingId: PropTypes.string,
        selectTraining: PropTypes.func.isRequired,
        unselectTraining: PropTypes.func.isRequired,
        currentUser: PropTypes.object
    }

    state = {
        selectedTimestamp: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {currentUser} = this.props;
        if (currentUser.userRole == 'user'){
            this.props.loadUserTrainings(currentUser.id);
        }else {
            this.props.loadOrganizationTrainings();
        }

    }

    componentWillReceiveProps() {

    }

    getTrainingsForTimestamp = (timestamp) => {
        const {trainings} = this.props;
        var startTimestamp = +moment(timestamp).startOf('day');
        var endTimestamp = +moment(timestamp).endOf('day');
        let arr = trainings.filter((tr) => {
            let t = tr.startTimestamp;
            //if (t < 248212422600){
            //    t = t * 1000;
            //}
            return ((t > startTimestamp) && (t < endTimestamp));
        });
        arr.sort((a, b) => {
            return (b.startTimestamp - a.startTimestamp)
        });
        return arr;
    }

    getContent = (timestamp) => {
        let arr = this.getTrainingsForTimestamp(timestamp);
        if (arr.length == 0){
            return null;
        }
        return (
            <div className={'trainings_number_bubble_placeholder'} >
                <div className={'trainings_number_bubble'} >
                    {arr.length}
                </div>
            </div>
        )
        //return arr;
    }

    onDayClick = (t) => {
        this.setState({
            selectedTimestamp: t
        });
    }

    getTrainingContent = () => {
        var trainingId = this.props.selectedTrainingId;
        return (
            <div className={'selected_training_content'} >

                <TrainingSessionsPanel trainingId={trainingId} />

            </div>
        )

    }

    getSelectedContent = () => {
        var t = this.state.selectedTimestamp;
        if (t == undefined){
            return null;
        }
        let trs = this.getTrainingsForTimestamp(t);
        return (
            <div className={'training_day_placeholder'} >

                <div className={'header'} >
                    {moment(t).format('D MMMM')}
                </div>

                <TrainingsList trainings={trs} onTrainingClick={this.onTrainingClick} />

            </div>
        );
    }

    onTrainingClick = (tr) => {
        this.props.selectTraining(tr.id)
    }

    render = () => {
        const {trainings, className} = this.props;

        return (
            <div className={className} >

                <CalendarPanel
                    selectedTimestamp={this.state.selectedTimestamp}
                    onDayClick={this.onDayClick}
                    contentFunction={this.getContent} />

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

                {this.state.selectedTimestamp == undefined ? null :
                    <Dialog
                            level={1000}
                            content={this.getSelectedContent()}
                            onClose={this.setState.bind(this, {selectedTimestamp: undefined})}
                            dialogPanelStyle={{width: 540, padding: 10}}
                        />
                }

                {this.props.selectedTrainingId == undefined ? null :
                    <Dialog
                        level={1200}
                        content={this.getTrainingContent()}
                        onClose={this.props.unselectTraining}
                        dialogPanelStyle={{width: 840, padding: 10}}
                        />
                }

            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        trainings: TrainingsHelper.getAllTrainings(state.trainings.trainingsMap),
        loading: state.trainings.loading || state.organization.loading,
        selectedTrainingId: state.player.selectedTrainingId,
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganizationTrainings: (id) => {
            if (id == undefined){
                return;
            }
            return dispatch(actions.loadOrganizationTrainings(id))
        },
        loadUserTrainings: (userId) => {
            return dispatch(actions.loadUserTrainings(userId))
        },
        selectTraining: (id) => {
            return dispatch(playerActions.selectTraining(id))
        },
        unselectTraining: () => {
            return dispatch(playerActions.unselectTraining())
        }
    }
}

TrainingsCalendarPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingsCalendarPanel)

export default TrainingsCalendarPanel