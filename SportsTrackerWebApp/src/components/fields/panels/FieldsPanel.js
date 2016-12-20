/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/OrganizationActions.js'

import FieldsList from '../list/FieldsList.js'

import Dialog from '../../dialog/Dialog.js'

import UpdateFieldPanel from './UpdateFieldPanel.js'
import CreateFieldPanel from './CreateFieldPanel.js'

class FieldsPanel extends React.Component {

    static defaultProps = {
        fields: []
    }

    static propTypes = {
        fields: PropTypes.array.isRequired
    }

    state = {
        selectedFieldId: undefined,
        createDialogVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onEditClick = (field) => {
        this.setState({
            selectedFieldId: field.id
        });
    }

    render = () => {
        const {fields} = this.props;

        return (
            <div className={'fields_panel'} >

                <div className={'header'} >
                    <div className={'fields_number_placeholder'} >
                        {fields.length == 0 ?
                            <span></span> :
                            <span>Количество полей: <b>{fields.length}</b></span>
                        }
                    </div>
                    <div className={'new_field_button_placeholder'} >
                        <button className={'icon basic button mini ui'} onClick={()=>{this.setState({createDialogVisible: true})}} >
                            <i className={'icon plus'} ></i> Добавить поле
                        </button>
                    </div>
                </div>

                <div className={'fields_list_placeholder'} >
                    <FieldsList fields={fields} onEditClick={this.onEditClick} />
                </div>

                {this.state.createDialogVisible == false ? null :
                    <Dialog
                            content={<CreateFieldPanel onFieldCreated={() => {this.setState({createDialogVisible: false})}} />}
                            dialogPanelStyle={{width: 520, padding: 10}}
                            onClose={() => {this.setState({createDialogVisible: false})}}
                        />
                }

                {this.state.selectedFieldId == undefined ? null :
                    <Dialog
                        content={<UpdateFieldPanel
                                    fieldId={this.state.selectedFieldId}
                                    onFieldUpdated={this.setState.bind(this, {selectedFieldId: undefined})} onFieldDeleted={this.setState.bind(this, {selectedFieldId: undefined})} />}
                        dialogPanelStyle={{width: 520, padding: 10}}
                        onClose={this.setState.bind(this, {selectedFieldId: undefined})} />
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

let getFields = (map) => {
    var arr = [];
    for (var key in map){
        var f = map[key];
        if (f == undefined || f.deleted == true){
            continue;
        }
        arr.push(f);
    }
    arr.sort((a, b) => {
        return (a.timestamp - b.timestamp)
    });
    return arr;
}

const mapStateToProps = (state) => {
    return {
        fields: getFields(state.organization.fieldsMap),
        loading: state.organization.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

FieldsPanel = connect(mapStateToProps, mapDispatchToProps)(FieldsPanel)

export default FieldsPanel