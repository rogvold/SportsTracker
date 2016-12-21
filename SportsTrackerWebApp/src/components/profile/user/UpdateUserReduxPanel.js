/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/UsersActions.js'

import UserForm from '../../users/forms/UserForm.js'

import BallPreloader from '../../preloader/BallPreloader.js'

class UpdateUserReduxPanel extends React.Component {

    static defaultProps = {
        onUserUpdated: () => {
            console.log('onUserUpdated occured');
        }
    }

    static propTypes = {
        updateUser: PropTypes.func,
        usersMap: PropTypes.object,
        currentUser: PropTypes.object,
        userId: PropTypes.string
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

    onSubmit = (data) => {
        console.log('UpdateUserReduxPanel: data = ', data);
        this.props.updateUser(data).then(() => {
            this.props.onUserUpdated()
        })
    }

    render = () => {
        const {usersMap, loading, userId, currentUser} = this.props;
        let user = (userId == undefined) ? currentUser : usersMap[userId];
        if (user == undefined){
            return null;
        }

        return (
            <div className={'update_user_panel'} >

                <div className={'form_placeholder'} >
                    <UserForm initialValues={user}
                              hasEmailSection={false}
                              hasPasswordSection={false}
                              onSubmit={this.onSubmit}  />
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
        usersMap: state.users.usersMap,
        currentUser: state.users.currentUser,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data) => {
            return dispatch(actions.updateUser(data))
        }
    }
}

UpdateUserReduxPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateUserReduxPanel)

export default UpdateUserReduxPanel