/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import FieldForm from '../../organization/fields/update/FieldForm.js'

import DeleteButton from '../../button/DeleteButton.js'

import BallPreloader from '../../preloader/BallPreloader.js'

class UpdateFieldPanel extends React.Component {

    static defaultProps = {
        onFieldUpdated: () => {
            console.log('field is updated');
        }
    }

    static propTypes = {
        updateField: PropTypes.func.isRequired,
        fieldId: PropTypes.string.isRequired
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

    getField = () => {
        return this.props.fieldsMap[this.props.fieldId];
    }

    onSubmit = (data) => {
        var f = this.getField();
        var d = Object.assign({}, f, data);
        this.props.updateField(d).then( () => {
            this.props.onFieldUpdated();
        })
    }

    onDelete = () => {
        this.props.deleteField(this.props.fieldId).then(
            () => {this.props.onFieldDeleted()}
        )
    }

    render = () => {
        let field = this.getField();

        return (
            <div className={'update_field_panel'} >

                {field == undefined ? null :
                    <FieldForm
                        onSubmit={this.onSubmit}
                        name={field.name} width={field.width} height={field.height} />
                }

                <div className={'delete_button_placeholder'} >
                    <DeleteButton buttonClassName={'ui red inverted button noMarginRight'}
                                  onDelete={this.onDelete} />
                </div>

                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        fieldsMap: state.organization.fieldsMap,
        loading: state.organization.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (data) => {
            return dispatch(actions.updateField(data))
        },
        deleteField: (id) => {
            return dispatch(actions.deleteField(id))
        }
    }
}

UpdateFieldPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateFieldPanel)

export default UpdateFieldPanel