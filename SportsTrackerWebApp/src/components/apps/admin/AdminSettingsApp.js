/**
 * Created by sabir on 19.12.16.
 */
/**
 * Created by sabir on 19.12.16.
 */
/**
 * Created by sabir on 19.12.16.
 */
/**
 * Created by sabir on 19.12.16.
 */
/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import SimpleUserTemplate from '../../templates/redux/SimpleUserTemplate.js'

import FieldsPanel from '../../fields/panels/FieldsPanel.js'

class AdminSettingsApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        loadOrganization: PropTypes.func
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var user = this.props.currentUser;
        this.props.loadOrganization(user.organizationId);
    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;

        return (
            <div className={'user_index_app_content'} >
                <FieldsPanel />
            </div>
        )
    }

    render(){
        return (
            <SimpleUserTemplate active={'settings'} content={this.getContent()} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganization: (id) => dispatch(actions.loadOrganization(id))
    }
}




AdminSettingsApp = connect(mapStateToProps, mapDispatchToProps)(AdminSettingsApp)

export default AdminSettingsApp