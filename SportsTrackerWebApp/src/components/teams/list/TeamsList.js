/**
 * Created by sabir on 19.12.16.
 */



import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class TeamsList extends React.Component {

    static defaultProps = {
        teams: [],
        onTeamClick: (team) => {
            console.log('defaultProps: onTeamClick: team = ', team);
        }
    }

    static propTypes = {
        teams: PropTypes.array.isRequired,
        onTeamClick: PropTypes.func.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;

        return (
            <div className={'user_index_app_content'} >
                this is admin users app
            </div>
        )
    }

    onTeamClick = (team) => {
        this.props.onTeamClick(team);
    }


    render = () => {
        const {teams} = this.props;

        return (
            <div className={'teams_list'} >

                {teams.map( (team, k) => {
                    return (
                        <div className={'team_item'} key={k + '_' + team.id} onClick={this.onTeamClick.bind(this, team)} >
                            <div className={'header'} >
                                {team.name}
                            </div>
                            <div>
                                {team.description}
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUser: state.users.currentUser
//    }
//}
//
//const mapDispatchToProps = (dispatch) => {
//    return {
//        loadOrganization: (id) => dispatch(actions.loadOrganization(id))
//    }
//}



//TeamsList = connect(mapStateToProps, mapDispatchToProps)(TeamsList)

export default TeamsList