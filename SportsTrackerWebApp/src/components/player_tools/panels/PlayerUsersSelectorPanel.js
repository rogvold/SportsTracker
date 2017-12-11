/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/PlayerActions.js'

import * as TrainingsHelper from '../../../helpers/TrainingsHelper.js'

import BackgroundImageContainer from '../../image/BackgroundImageContainer.js'

import moment from 'moment';

class PlayerUsersSelectorPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
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

    getUsers =() => {
        let {trainingId, store} = this.props;
        let sessions = TrainingsHelper.getTrainingSessions(trainingId, store);
        let arr = [];
        let usersMap = store.users.usersMap;
        for (var i in sessions){
            let userId = sessions[i].session.userId;
            if (userId == undefined){continue;}
            let u = usersMap[userId];
            if (u == undefined){
                continue;
            }
            arr.push(u);
        }
        return arr;
    }

    getUserDuration = (userId) => {
        let {trainingId, store} = this.props;
        let sessions = TrainingsHelper.getTrainingSessions(trainingId, store);
        for (var i in sessions){
            let s = sessions[i];
            if (s.session.userId != userId){
                continue;
            }
            let pts = s.points;
            if (pts == undefined || pts.length == 0){
                return 0;
            }
            return (Math.floor((pts[pts.length - 1].t - pts[0].t) / 60000.0));
        }
        return 0;
    }


    render = () => {
        let users = this.getUsers();
        let selMap = this.props.store.player.selectedUsersMap;

        return (
            <div className={'player_users_selector_panel'} >

                <div className={'users_list'} >

                    {users.map( (u, k) => {
                        let isChecked = (selMap[u.id] != undefined);
                        let onClick = this.props.toggle.bind(this, u.id);
                        let dur = this.getUserDuration(u.id);
                        return (
                            <div className={'user_item ' + (isChecked == true ? ' selected ' : '' ) } key={k + '_' + u.id} onClick={onClick} >
                                <div className={'left_placeholder'} >
                                    <div className={'avatar'} >
                                        <BackgroundImageContainer
                                            style={{borderRadius: 1000}}
                                            image={u.avatar} />
                                    </div>
                                </div>
                                <div className={'right_placeholder'} >
                                    <div className={'top'}>
                                        <div className={'name'} >
                                            {u.firstName} {u.lastName}
                                        </div>
                                        <div className={'checkbox_placeholder'} >
                                            <i className={'icon ' + (isChecked == false ? ' square outline ' : ' checkmark box ')} ></i>
                                        </div>
                                    </div>
                                    <div className={'bottom'} >
                                        <i className={'icon wait'} ></i> {dur} мин.
                                    </div>
                                </div>
                            </div>
                        )
                    } )}

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
        toggle: (userId) => {
            return dispatch(actions.toggleUser(userId))
        }
    }
}

PlayerUsersSelectorPanel = connect(mapStateToProps, mapDispatchToProps)(PlayerUsersSelectorPanel)

export default PlayerUsersSelectorPanel