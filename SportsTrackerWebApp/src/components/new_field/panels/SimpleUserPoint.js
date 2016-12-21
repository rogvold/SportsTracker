/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SimpleUserPoint extends React.Component {

    static defaultProps = {
        height: 40,
        width: 60,
        clothesImg: 'assets/images/shirt.png',

        x: 0,
        y: 0
    }

    static propTypes = {
        userId: PropTypes.string.isRequired,
        usersMap: PropTypes.object
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

    getUser = () => {
        let {usersMap, userId} = this.props;
        if (userId == undefined){
            return null;
        }
        return usersMap[userId];
    }

    render = () => {
        const user = this.getUser();
        if (user == undefined){
            return null;
        }

        //var centerX = this.props.x - (this.props.height / 2.0);
        //var centerY = this.props.y - (this.props.width / 2.0);

        var centerX = this.props.x + '%';
        var centerY = this.props.y + '%';


        var st = Object.assign({},
            {left: centerX, top: centerY, width: this.props.width, height: this.props.height},
            this.props.style);

        //var st = assign({}, this.componentStyle.placeholder,
        //    {left: centerX, top: centerY, width: this.props.width, height: this.props.height},
        //    this.props.style);

        return (
            <div className={'simple_user_point transition02s'} style={st} >
                <div className={'name'} >
                    {user.firstName}
                </div>
                <div className={'clothes_placeholder'} >
                    <img src={this.props.clothesImg} />
                </div>
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

SimpleUserPoint = connect(mapStateToProps, mapDispatchToProps)(SimpleUserPoint)

export default SimpleUserPoint