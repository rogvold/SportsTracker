/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from '../../dialog/Dialog.js'

import CreateUserPanel from '../panels/CreateUserPanel.js'

class CreateUserWrapper extends React.Component {

    static defaultProps = {
        className: '',
        userRole: 'user'
    }

    static propTypes = {

    }

    state = {
        dialogVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getContent = () => {
        return (
            <CreateUserPanel
                userRole={this.props.userRole}
                onUserCreated={()=>{this.setState({dialogVisible: false})}} />
        )
    }

    render = () => {

        return (
            <div className={' create_user_wrapper '}  >

                <div className={this.props.className} onClick={()=>{this.setState({dialogVisible: true})}} >
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                            dialogPanelStyle={{width: 520, padding: 10}}
                            content={this.getContent()}
                            onClose={()=>{this.setState({dialogVisible: false})}}
                        />
                }

            </div>
        )
    }

}


export default CreateUserWrapper