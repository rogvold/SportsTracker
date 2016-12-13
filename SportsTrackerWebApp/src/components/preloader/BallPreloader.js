/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var BallPreloader = React.createClass({
    getDefaultProps: function () {
        return {
            text: 'Загрузкa'
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui inverted dimmer active' } style={{backgroundColor: 'rgba(255,255,255,1)'}} >

                    <div className={'content'} >

                        <div className={'center'} >

                            <div>
                                <img src={'assets/images/ball_loader.gif'} style={{width: 70}} />
                            </div>

                            <div style={{textAlign: 'center', marginTop: 15, color: 'black', opacity: 0.6}} >
                                {this.props.text}
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        );
    }

});

module.exports = BallPreloader;