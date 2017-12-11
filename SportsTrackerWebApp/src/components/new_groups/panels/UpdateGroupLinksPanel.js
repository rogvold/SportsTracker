/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'
import BallPreloader from '../../preloader/BallPreloader.js'

import SearchableUsersList from '../../organization/users/SearchableUsersList.js'

class UpdateGroupLinksPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGroupLinks(this.props.groupId);
    }

    componentWillReceiveProps() {

    }

    getUsersList = () => {
        let {linksMap, usersMap, groupId} = this.props;
        console.log('getUsersList: linksMap, usersMap, groupId = ', linksMap, usersMap, groupId);
        let arr = [];
        for (var key in linksMap){
            let link = linksMap[key];
            if (link == undefined){
                continue;
            }
            if (link.groupId == groupId){
                let u = usersMap[link.userId];
                arr.push(u);
            }
        }
        arr.sort((a, b) => {
            if (a.lastName > b.lastName){return 1}
            if (a.lastName < b.lastName){return 1}
            return 0;
        })
        return arr;
    }

    onUserRemove = (userId) => {
        let {groupId} = this.props;
        this.props.deleteUser(userId, groupId);
    }

    getRestUsers = () => {
        let groupUsers = this.getUsersList();
        let {usersMap, linksMap, groupId} = this.props;
        let map = {};
        let arr = [];
        for (var i in groupUsers){
            let u = groupUsers[i];
            map[u.id] = 1;
        }
        for (var key in usersMap){
            let u = usersMap[key];
            if (map[u.id] == 1){
                continue;
            }
            if (u.userRole != 'user'){
                continue;
            }
            arr.push(u);
        }
        return arr;
    }

    onUserAdd = (u) => {
        let {groupId} = this.props;
        this.props.addUser(u.id, groupId);
    }


    render = () => {
        let {groupId, loading} = this.props;
        let groupUsers = this.getUsersList();
        let restUsers = this.getRestUsers();

        return (
            <div className={'update_group_links_panel'} >

                <div className={'left_placeholder'} >

                    <div className={'group_users_panel'} >
                        <div className={'header'} >
                            Игроки в команде
                        </div>
                        {groupUsers.map((u) => {
                            let onRemove = this.onUserRemove.bind(this, u.id)
                            return (
                                <div className={'group_user_item'} key={u.id} >
                                    <div className={'name'} >
                                        {u.firstName} {u.lastName}
                                    </div>
                                    <div className={'remove_placeholder'} onClick={onRemove}  >
                                        <i className={'icon remove'} ></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className={'right_placeholder'} >
                    <div className={'header'} >
                        Добавить игрока
                    </div>
                    <SearchableUsersList
                        showTableHeader={false}
                        showSignUpDate={false} users={restUsers} onUserClick={this.onUserAdd} />
                </div>

                {loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.organization.loading,
        linksMap: state.organization.userGroupLinksMap,
        usersMap: state.users.usersMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadGroupLinks: (groupId) => {
            return dispatch(actions.loadGroupUsersLinks(groupId))
        },
        addUser: (userId, groupId) => {
            return dispatch(actions.addUserToGroup(userId, groupId))
        },
        deleteUser: (userId, groupId) => {
            return dispatch(actions.deleteUserFromGroup(userId, groupId))
        }
    }
}

UpdateGroupLinksPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateGroupLinksPanel)

export default UpdateGroupLinksPanel