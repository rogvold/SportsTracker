/**
 * Created by sabir on 22.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateTeamPanel from './UpdateTeamPanel.js'

import UpdateGroupLinksPanel from '../../new_groups/panels/UpdateGroupLinksPanel.js'

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

                <div  className={'tabs_placeholder'}>

                    <div onClick={this.switchMode.bind(this, 'general')}
                         className={' tab ' + (mode == 'general' ? ' active ' : '')} >Общая информация</div>

                    <div onClick={this.switchMode.bind(this, 'users')}
                         className={' tab ' + (mode == 'users' ? ' active ' : '')}>Игроки</div>
                </div>

                <div style={{marginTop: 15}} >
                    {mode != 'general' ? null :
                        <UpdateTeamPanel teamId={teamId} />
                    }

                    {mode != 'users' ? null :
                        <UpdateGroupLinksPanel groupId={teamId} />
                    }

                </div>

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