/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TrainingFieldPlayer from '../../new_field/panels/TrainingFieldPlayer.js'

import PlayerUsersSelectorPanel from '../../player_tools/panels/PlayerUsersSelectorPanel.js'

import TrainingHeatmapPanel from '../../new_heatmap/panels/TrainingHeatmapPanel.js'

class TrainingSessionsTabbedPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        mode: 'tracking'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    switchMode = (newMode) => {
        this.setState({
            mode: newMode
        });
    }

    render = () => {
        let {mode} = this.state;

        return (
            <div className={'training_sessions_tabbed_panel'} >

                <div  className={'tabs_placeholder'}>

                    <div onClick={this.switchMode.bind(this, 'tracking')}
                         className={' tab ' + (mode == 'tracking' ? ' active ' : '')} >Трекинг</div>

                    <div onClick={this.switchMode.bind(this, 'heatmap')}
                         className={' tab ' + (mode == 'heatmap' ? ' active ' : '')}>Карта положения</div>

                </div>

                {mode != 'tracking' ? null :
                    <div className={'training_users_panel'} >
                        <TrainingFieldPlayer />
                    </div>
                }

                {mode != 'heatmap' ? null :
                    <div>
                        <TrainingHeatmapPanel />
                    </div>
                }

                <PlayerUsersSelectorPanel trainingId={this.props.trainingId} />



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

//TrainingSessionsTabbedPanel = connect(mapStateToProps, mapDispatchToProps)(TrainingSessionsTabbedPanel)

export default TrainingSessionsTabbedPanel