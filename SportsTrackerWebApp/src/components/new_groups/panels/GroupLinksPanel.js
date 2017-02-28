/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'
import BallPreloader from '../../preloader/BallPreloader.js'

import SearchableUsersList from '../../organization/users/SearchableUsersList.js'

class GroupLinksPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        groupId: PropTypes.string.isRequired,
        loadGroupLinks: PropTypes.func,
        loading: PropTypes.bool
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


    render = () => {
        let {groupId, loading, groupsMap} = this.props;
        let groupUsers = this.getUsersList();
        let group = groupsMap[groupId];

        return (
            <div className={'update_group_links_panel'} >

                <div className={'group_users_panel'} >
                    <div className={'header'} >
                        {group.name}
                    </div>
                    {groupUsers.map((u) => {
                        return (
                            <div className={'group_user_item'} key={u.id} >
                                <div className={'name'} >
                                    {u.firstName} {u.lastName}
                                </div>
                            </div>
                        )
                    })}
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
        groupsMap: state.organization.groupsMap,
        usersMap: state.users.usersMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadGroupLinks: (groupId) => {
            return dispatch(actions.loadGroupUsersLinks(groupId))
        }
    }
}

GroupLinksPanel = connect(mapStateToProps, mapDispatchToProps)(GroupLinksPanel)

export default GroupLinksPanel