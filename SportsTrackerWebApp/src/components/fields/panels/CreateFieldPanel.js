/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import FieldForm from '../../organization/fields/update/FieldForm.js'

import BallPreloader from '../../preloader/BallPreloader.js'

class CreateFieldPanel extends React.Component {

    static defaultProps = {
        onFieldCreated: () => {
            console.log('field created');
        }
    }

    static propTypes = {}

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
        this.props.createField(data).then(() => {
            this.props.onFieldCreated();
        })
    }

    render = () => {

        return (
            <div className={'create_field_panel'} >

                <FieldForm onSubmit={this.onSubmit} />

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        loading: state.organization.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createField: (data) => {
            return dispatch(actions.createField(data))
        }
    }
}

CreateFieldPanel = connect(mapStateToProps, mapDispatchToProps)(CreateFieldPanel)

export default CreateFieldPanel