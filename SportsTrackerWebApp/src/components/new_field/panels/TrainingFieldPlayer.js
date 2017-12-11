/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import SimpleField from './SimpleField.js'

import FieldSlider from '../../field/slider/FieldSlider.js'

import SportHelper from '../../../helpers/SportHelper.js'

class TrainingFieldPlayer extends React.Component {

    static defaultProps = {
        dt: 0.2 * 1000
    }

    static propTypes = {
    }

    state = {
        time: 0,
        status: 'playing',
        speed: 5,
        statusBeforeSeeking: 'playing'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.initTimer();
    }

    componentWillUnmount = () => {
        this.destroyInterval();
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
        let {time} = this.state;
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
            pts = pts.filter((p)=>{return (p && (p.t <= time))})
            if (pts.length == 0){
                continue;
            }
            let p = Object.assign({}, pts[pts.length - 1]);

            //should be good
            p.x = Math.max(Math.min(100.0 * p.x / field.height, 100.0), 0);
            p.y = Math.max(Math.min(100.0 * p.y / field.width, 100.0), 0);

            //p.x = Math.min(100.0 * p.x / field.width, 100.0);
            //p.y = Math.min(100.0 * p.y / field.height, 100.0);

            p.userId = s.session.userId;
            points.push(p)
        }
        return points;
    }

    onTimeChange = (t) => {
        let {statusBeforeSeeking} = this.state;
        this.setState({
            time: t,
            status: statusBeforeSeeking
        });
    }

    getMaxT = () => {
        //console.log('TrainingsFieldPlayer: getMaxT occured');
        let sessions = this.getSessions(false);
        //console.log('sessions = ', sessions);
        let max = 0;
        for (var i in sessions){
            //console.log('i = ', i);
            let pts = sessions[i].points;
            //console.log('pts = ', pts);
            if (pts == undefined || pts.length == 0){
                continue;
            }
            if (pts[pts.length - 1] && (max < pts[pts.length - 1].t)){
                max = pts[pts.length - 1].t;
            }
        }
        return max;
    }

    onBeforeTimeChange = () => {
        var status = this.state.status;
        this.setState({
            status: 'paused',
            statusBeforeSeeking: status
        });
    }

    pause = () => {
        this.setState({
            status: 'paused'
        });
    }

    play = () => {
        this.setState({
            status: 'playing'
        });
    }

    onTick = () =>{
        var status = this.state.status;
        if (status == 'paused'){
            return;
        }
        var {dt} = this.props;
        var t = this.state.time + this.state.speed * dt;
        var maxT = this.getMaxT();
        if (t >= maxT){
            this.setState({
                time: maxT,
                status: 'paused'
            });
        }else {
            this.setState({
                time: t
            });
        }
    }

    initTimer = () => {
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                this.onTick();
            }.bind(this), this.props.dt);
        }
    }

    destroyInterval = () => {
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    }

    getPlayPauseButton = () => {
        let {status} = this.state;
        if (status == 'playing'){
            return (
                <i className={'icon pause circle'} style={{marginRight: 0, cursor: 'pointer'}}
                   onClick={this.setState.bind(this, {status: 'paused'})} ></i>
            );
        }
        if (status == 'paused'){
            return (
                <i className={'icon play'} style={{marginRight: 0, cursor: 'pointer'}}
                   onClick={this.setState.bind(this, {status: 'playing'})} ></i>
            );
        }
    }

    render = () => {
        let field = this.getField();
        let training = this.getTraining();
        let sessions = this.getSessions();
        let points = this.getPoints();
        let maxT = this.getMaxT();
        let {time} = this.state;

        //console.log('rendering TrainingField: field, training, sessions, points = ', field, training, sessions, points);

        if (training == undefined || field == undefined){
            return null;
        }

        if ( this.getSessions(false).length == 0 ){
            return (
                    <div className={'empty_training'} >
                        пустая тренировка
                    </div>
                )
        }

        var currentTimeString = SportHelper.getTimeString(this.state.time);

        return (
            <div className={'training_field_player'} >
                <div className={'training_field'} >

                    <SimpleField points={points} />

                </div>

                <div className={'controls_placeholder'} >

                    <div className={'buttons_placeholder'} >
                        {this.getPlayPauseButton()}
                    </div>

                    <div className={'timer_placeholder'}  >
                        {currentTimeString}
                    </div>

                    <div className={'slider_placeholder'} >
                        <FieldSlider t={this.state.time}
                                     onBeforeChange={this.onBeforeTimeChange}
                                     onChange={this.onTimeChange} maxT={maxT} />
                    </div>

                </div>



            </div>

        )
    }

}


const mapStateToProps = (state) => {
    return {
        store: state,
        loading: state.trainings.loading,
    }
}

TrainingFieldPlayer = connect(mapStateToProps, null)(TrainingFieldPlayer)

export default TrainingFieldPlayer