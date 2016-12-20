/**
 * Created by sabir on 19.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FieldsList extends React.Component {

    static defaultProps = {
        fields: [],
        onEditClick: function(field){
            console.log('onEditClick: field = ', field);
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

    onEditClick = (field) => {
        this.props.onEditClick(field);
    }

    render = () => {
        let fields = this.props.fields;

        return (
            <div className={'fields_list'} >

                {fields.map((field, k) => {

                    return (
                        <div className={'field_item'} key={k + '_' + field.id} >
                            <div className={'name_placeholder'} >
                                {field.name}
                            </div>
                            <div className={'dimensions_placeholder'}>
                                длина: {field.height} м,
                                ширина: {field.width} м
                            </div>
                            <div className={'edit_placeholder'} >
                                <i className={'icon pencil'} onClick={this.onEditClick.bind(this, field)} ></i>
                            </div>
                        </div>
                    )
                })}

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

//FieldsList = connect(mapStateToProps, mapDispatchToProps)(FieldsList)

export default FieldsList