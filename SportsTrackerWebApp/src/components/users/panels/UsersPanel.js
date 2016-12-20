/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchableUsersList from '../../organization/users/SearchableUsersList.js'

import CreateUserWrapper from '../buttons/CreateUserWrapper.js'

class UsersPanel extends React.Component {

    static defaultProps = {
        userRole: 'user'
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired
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

    render = () => {
        let users = this.getUsers();

        return (
            <div className={'users_panel'} >


                {this.props.organizationLoading == true ? null :
                    <SearchableUsersList
                        topRightContent={this.getRightContent()}
                        users={users} />
                }


                {this.props.loading == false ? null :
                    <div className={'simple_loading_placeholder'} >
                        загрузка...
                    </div>
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