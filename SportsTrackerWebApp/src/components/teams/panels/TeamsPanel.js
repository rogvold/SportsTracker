/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TeamsList from '../list/TeamsList.js'

import Dialog from '../../dialog/Dialog.js'

import UpdateTeamPanel from './UpdateTeamPanel.js'
import TabbedUpdateTeamPanel from './TabbedUpdateTeamPanel.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import CreateTeamPanel from './CreateTeamPanel.js'

class TeamsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        teams: PropTypes.array.isRequired
    }

    state = {
        selectedTeamId: undefined,
        createDialogVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onTeamClick = (team) => {
        this.setState({
            selectedTeamId: team.id
        });
    }

    render = () => {
        const {teams} = this.props;

        return (
            <div className={'teams_panel'} >

                {this.props.loading == true ? null :
                    <div className={'header'} >
                        <div className={'amount_placeholder'} >
                            {teams.length == 0 ?
                                <span>
                                У вас еще нет ни одной команды
                            </span> :
                                <span>
                                Количество команд: <b>{teams.length}</b>
                            </span>
                            }
                        </div>
                        <div className={'add_team_placeholder'} >
                            <button className={'ui basic mini button'} onClick={()=>{this.setState({createDialogVisible: true})}} >
                                <i className={'icon plus'} ></i> Добавить команду
                            </button>
                        </div>
                    </div>
                }

                <div className={'teams_list_placeholder'} >
                    <TeamsList teams={this.props.teams} onTeamClick={this.onTeamClick} />
                </div>

                {this.props.loading == false ? null :
                    <div style={{textAlign: 'center', padding: 10, opacity: 0.6}} >
                        loading...
                    </div>
                }

                {this.state.createDialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={{padding: 10, width: 520}}
                        content={<CreateTeamPanel onCreated={this.setState.bind(this, {createDialogVisible: false})} />}
                        onClose={this.setState.bind(this, {createDialogVisible: false})} />
                }

                {this.state.selectedTeamId == undefined ? null :
                    <Dialog
                        dialogPanelStyle={{padding: 10, width: 520}}
                        content={<TabbedUpdateTeamPanel teamId={this.state.selectedTeamId}
                        onTeamDeleted={this.setState.bind(this, {selectedTeamId: undefined})}
                        onTeamUpdated={this.setState.bind(this, {selectedTeamId: undefined})} />}
                        onClose={this.setState.bind(this, {selectedTeamId: undefined})} />
                }

            </div>
        )
    }

}

let getTeams = (state) => {
    let map = state.organization.groupsMap;
    let arr = [];
    for (let key in map){
        let team = map[key];
        if (team == undefined){
            continue;
        }
        arr.push(team);
    }
    arr.sort((a, b) => {
        return (a.timestamp - b.timestamp);
    })
    return arr;
}

const mapStateToProps = (state) => {
    return {
        teams: getTeams(state),
        loading: state.organization.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onLogout: (data) => {
        //    dispatch(actions.logOut())
        //}
    }
}

TeamsPanel = connect(mapStateToProps, mapDispatchToProps)(TeamsPanel)

export default TeamsPanel