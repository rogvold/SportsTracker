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
        const {usersMap} = this.props;

        return (
            <div  className={'trainings_list'} >
                {trainings.map((tr, k) => {
                    var key = 'tr_' + k;
                    var onClick = this.onClick.bind(this, tr);
                    var trainer = usersMap[tr.trainerId];

                    return (
                        <div onClick={onClick}
                             key={key} className={'training_item'} >

                            <div >
                                <div className={'name'} >
                                    {trainer.name}
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

                                    <span style={{opacity: 0.6}} >
                                        ({moment.duration(tr.endTimestamp - tr.startTimestamp).asMinutes()} мин.)
                                    </span>
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
        usersMap: state.users.usersMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

TrainingsList = connect(mapStateToProps, mapDispatchToProps)(TrainingsList)

export default TrainingsList