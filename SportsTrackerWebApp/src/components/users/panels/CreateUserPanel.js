/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/UsersActions.js'

import BallPreloader from '../../preloader/BallPreloader.js'

import UserForm from '../forms/UserForm.js'

class CreateUserPanel extends React.Component {

    static defaultProps = {
        userRole: 'user',
        onUserCreated: function(){
            console.log('default: onUserCreated');
        }
    }

    static propTypes = {
        userRole: PropTypes.string.isRequired
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
        console.log('onSubmit: data = ', data);
        let {email, password, firstName, lastName} = data;
        this.props.createUser({email, password, firstName, lastName, userRole: this.props.userRole}).then(
            () => {this.props.onUserCreated()}
        )
    }

    render = () => {

        return (
            <div className={'create_user_panel'} >

                <UserForm onSubmit={this.onSubmit}  />

                {this.props.loading && <BallPreloader />}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (data) => {
            return dispatch(actions.createUser(data))
        }
    }
}

CreateUserPanel = connect(mapStateToProps, mapDispatchToProps)(CreateUserPanel)

export default CreateUserPanel