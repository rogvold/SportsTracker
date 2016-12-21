/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from '../../dialog/Dialog.js'

import UpdateUserReduxPanel from './UpdateUserReduxPanel.js'

class UpdateUserReduxWrapper extends React.Component {

    static defaultProps = {
        level: 100
    }

    static propTypes = {
        userId: PropTypes.string
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

    onClose = () => {
        this.setState({
            dialogVisible: false
        });
    }

    show = () => {
        this.setState({
            dialogVisible: true
        });
    }

    getContent = () => {
        return (
            <div>
                <UpdateUserReduxPanel
                    onUserUpdated={this.onClose}
                    userId={this.props.userId} />
            </div>
        );
    }

    render = () => {

        return (
            <div >

                <div onClick={this.show}>
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getContent()}
                            level={this.props.level} onClose={this.onClose}
                            dialogPanelStyle={{width: 620, padding: 10}}
                        />
                }

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//UpdateUserReduxWrapper = connect(mapStateToProps, mapDispatchToProps)(UpdateUserReduxWrapper)

export default UpdateUserReduxWrapper