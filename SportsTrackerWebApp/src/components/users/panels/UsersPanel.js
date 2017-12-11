/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchableUsersList from '../../organization/users/SearchableUsersList.js'

import CreateUserWrapper from '../buttons/CreateUserWrapper.js'

import Dialog from '../../dialog/Dialog.js'

import ReduxUserPagePanel from '../../profile_page/ReduxUserPagePanel.js'

class UsersPanel extends React.Component {

    static defaultProps = {
        userRole: 'user'
    }

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

    getUsers = () => {
        let map = this.props.usersMap;
        let arr = [];
        let role = this.props.userRole;
        for (var key in map){
            let u = map[key];
            if (u == undefined || u.userRole != role){
                continue;
            }
            arr.push(u);
        }
        arr.sort((a, b) => {
            return (b.timestamp - a.timestamp)
        });
        return arr;
    }

    getRightContent = () => {
        return (
            <CreateUserWrapper userRole={this.props.userRole} className={'pl5'} >
                <button className={'ui basic button fluid'} >
                    <i className={'icon plus'} ></i> Добавить
                </button>
            </CreateUserWrapper>
        )
    }

    onUserClick = (u) => {
        this.setState({
            selectedUserId: u.id
        });
    }

    render = () => {
        let users = this.getUsers();
        let {selectedUserId} = this.state;

        return (
            <div className={'users_panel'} >


                {this.props.organizationLoading == true ? null :
                    <SearchableUsersList
                        onUserClick={this.onUserClick}
                        topRightContent={this.getRightContent()}
                        users={users} />
                }


                {this.props.loading == false ? null :
                    <div className={'simple_loading_placeholder'} >
                        загрузка...
                    </div>
                }

                {selectedUserId == undefined ? null :
                    <Dialog
                        content={<ReduxUserPagePanel userId={selectedUserId} />}
                        onClose={this.setState.bind(this, {selectedUserId: undefined})}
                        dialogPanelStyle={{width: 840, padding: 10}}
                        />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        usersMap: state.users.usersMap,
        loading: (state.users.loading || state.organization.loading),
        organizationLoading: state.organization.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

UsersPanel = connect(mapStateToProps, mapDispatchToProps)(UsersPanel)

export default UsersPanel