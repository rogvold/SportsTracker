/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReactHeatmap from 'react-heatmap';

import SportHelper from '../../../helpers/SportHelper.js'
import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import HeatMapRangeSlider from '../../field/slider/HeatMapRangeSlider.js'

class TrainingHeatmapPanel extends React.Component {

    static defaultProps = {
        maxHeatMapLevel: 30,
        pointHeatLevel: 12
    }

    static propTypes = {

    }

    state = {
        from: 0,
        to: 0
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            from: 0,
            to: this.getMaxT()
        });
    }

    componentWillReceiveProps() {

    }

    getField = () => {
        let training = this.getTraining();
        if (training == undefined){
            return undefined;
        }
        let {store} = this.props;
        return store.organization.fieldsMap[training.fieldId];
    }

    getTraining = () => {
        let {store} = this.props;
        let trainingId = store.player.selectedTrainingId;
        let training = store.trainings.trainingsMap[trainingId];
        return training;
    }

    getSessions = (withFiltering = true) => {
        let {store} = this.props;
        let training = this.getTraining();
        let selectedUsersMap = store.player.selectedUsersMap;
        let sessions = TrainingsHelper.getTrainingSessions(training.id, store);
        //selected filtration
        if (withFiltering == true){
            sessions = sessions.filter((s) => {return (selectedUsersMap[s.session.userId] != undefined)})
        }
        return sessions;
    }

    getPoints = () => {
        let field = this.getField();
        let {store} = this.props;
        let {from, to} = this.state;
        const usersMap = store.users.usersMap;
        let sessions = this.getSessions();
        let points = [];
        for (var i in sessions){
            let s = sessions[i];
            if (s == undefined){
                continue;
            }
            let pts = s.points;
            if (pts == undefined || pts.length == 0){
                continue;
            }
            pts = pts.filter((p)=>{return (p.t <= to && p.t > from)})
            pts = pts.map((pp) => {
                    let newP = {
                        x: Math.max(Math.min(100.0 * pp.x / field.height, 100.0), 0),
                        y: Math.max(Math.min(100.0 * pp.y / field.width, 100.0), 0)
                    }
                    return newP;
                }
            )
            points = points.concat(pts);
        }
        return points;
    }

    onTimeChange = (from, to) => {
        this.setState({
            from: from,
            to: to
        });
    }

    getMaxT = () => {
        let sessions = this.getSessions(false);
        let max = 0;
        for (var i in sessions){
            let pts = sessions[i].points;
            if (pts == undefined || pts.length == 0){
                continue;
            }
            if (max < pts[pts.length - 1].t){
                max = pts[pts.length - 1].t;
            }
        }
        return max;
    }


    render = () => {
        let points = this.getPoints();
        let data = points.map((p) => {
            return {
                x: p.x,
                y: p.y,
                value: this.props.pointHeatLevel
            }
        });

        let {from, to} = this.state;
        let maxT = this.getMaxT();

        return (
            <div className={'training_heatmap_panel'} >


                <div className={'heatmap'}>
                    <ReactHeatmap data={data} max={this.props.maxHeatMapLevel} />
                </div>


                <div className={'controls_placeholder'} >
                    <div  className={'timer_placeholder'} >
                        {SportHelper.getTimeString(from)}
                    </div>

                    <div  className={'slider_placeholder'} >
                        <HeatMapRangeSlider maxT={maxT} onChange={this.onTimeChange} />
                    </div>

                    <div className={'timer_placeholder'} >
                        {SportHelper.getTimeString(to)}
                    </div>
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        store: state,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

TrainingHeatmapPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingHeatmapPanel)

export default TrainingHeatmapPanel