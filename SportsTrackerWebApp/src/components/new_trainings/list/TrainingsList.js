/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

class TrainingsList extends React.Component {

    static defaultProps = {
        trainings: [],

        onTrainingClick: function(tr){

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

    onClick = (tr) => {
        this.props.onTrainingClick(tr);
    }

    render = () => {
        const {trainings} = this.props;
        const {usersMap, fieldsMap} = this.props;

        return (
            <div  className={'trainings_list'} >
                {trainings.map((tr, k) => {
                    let key = 'tr_' + k;
                    let onClick = this.onClick.bind(this, tr);
                    let trainer = usersMap[tr.trainerId];
                    let field = fieldsMap[tr.fieldId];

                    return (
                        <div onClick={onClick} key={key} className={'training_item'} >

                            <div>
                                <div className={'field_name'} >
                                    {field.name}
                                </div>

                                <div className={'time'}>

                                    <i className={'icon wait'} ></i>
                                    <span style={{marginRight: 5}}>
                                         {moment(tr.startTimestamp).format('HH:mm')}
                                    </span>
                                    -
                                    <span style={{marginRight: 5, marginRight: 5}}>
                                        {moment(tr.endTimestamp).format('HH:mm')}
                                    </span>

                                    <span className={'delimiter_span'} >|</span>

                                    <i className={'icon user'} ></i> тренер: {' '}
                                        {trainer.firstName} {trainer.lastName}

                                </div>
                            </div>

                        </div>
                    );

                })}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        usersMap: state.users.usersMap,
        fieldsMap: state.organization.fieldsMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

TrainingsList = connect(mapStateToProps, mapDispatchToProps)(TrainingsList)

export default TrainingsList