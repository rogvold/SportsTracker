/**
 * Created by sabir on 10.02.17.
 */
/**
 * Created by sabir on 20.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlaygroundPanel from '../playground/PlaygroundPanel'

import BackgroundImageContainer from '../image/BackgroundImageContainer'

class APIApp extends React.Component {

    static defaultProps = {}

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

    componentStyle = {
        topAdPlaceholder: {
            height: 280,
            width: '100%',
            position: 'relative'
        }
    }



    render() {
        var image = 'assets/images/api_background.png';

        return (
            <div className={'api_app'} >

                <div style={this.componentStyle.topAdPlaceholder}>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1}}>
                        <BackgroundImageContainer image={image} />
                    </div>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 2, background: 'rgba(0, 0, 0, 0.1)'}}>
                        <div style={{paddingTop: 100, lineHeight: '80px', fontSize: 64, color: 'white', textAlign: 'center'}} >
                            SportsTracker API Playground
                        </div>
                    </div>

                </div>


                <PlaygroundPanel />

            </div>
        )
    }

}

export default APIApp