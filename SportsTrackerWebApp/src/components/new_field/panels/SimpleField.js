/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SimpleUserPoint from './SimpleUserPoint.js'

import PureRenderMixin from 'react-addons-pure-render-mixin';

//points = [{x, y, t, userId}]
class SimpleField extends React.Component {

    static defaultProps = {
        points: []
    }

    static propTypes = {
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        const {points} = this.props;

        return (
            <div className={'simple_field'} >
                {points.map( (p, k) => {
                    let key = p.userId;
                    return (
                        <SimpleUserPoint key={key} userId={p.userId} x={p.x} y={p.y} />
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

//SimpleField = connect(mapStateToProps, mapDispatchToProps)(SimpleField)

export default SimpleField