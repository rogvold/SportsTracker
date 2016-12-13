/**
 * Created by sabir on 16.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var RealTimeHeartRateChart = require('../chart/RealTimeHeartRateChart');

var AnimatedHeart = require('../heart/AnimatedHeart');

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var HeartPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('RealTimeStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('RealTimeStore');
        return {
            messages: store.messages,
            lastMessage: store.getLastMessage(),
            fakeMode: store.fakeMode
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        backgroundLayer: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 10
        },

        mainLayer: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.9)'
        }

    },

    render: function(){
        var points = this.state.messages;
        var data = this.state.lastMessage;
        var fakeMode = this.state.fakeMode;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.backgroundLayer}>
                    <BackgroundImageContainer image={'assets/images/hrm_background.jpg'} />
                </div>



                <div style={this.componentStyle.mainLayer}>

                    {data != undefined ? null :
                        <div style={{width: '100%'}} >
                            <div style={{textAlign: 'center', paddingTop: 120, fontSize: 20, opacity: 0.8}} >
                                Ожидаем данные с HRM...
                            </div>
                            {fakeMode == true ? null :
                                <div style={{marginTop: 30, textAlign: 'center'}} >
                                    <button className={'icon green ui button circular'} style={{marginRight: 0}}
                                            onClick={this.getFlux().actions.runFakeHeartRate} >
                                        <i className={'icon wizard'} style={{marginRight: 5}} ></i>
                                        Запустить симуляцию
                                    </button>
                                </div>
                            }

                        </div>
                    }

                    {data == undefined ? null :
                            <div style={{position: 'relative', height: '100%', width: '100%' }}>

                                <div style={{position: 'absolute', top: 0, left: 0, right: 0}} >
                                    <div style={{marginTop: -50}} >
                                        <AnimatedHeart content={data.hr} />
                                    </div>

                                </div>

                                <div style={{position: 'absolute', bottom: 0, opacity: 0.9}}>
                                    <RealTimeHeartRateChart
                                        width={window.innerWidth}
                                        points={points} />
                                </div>

                            </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = HeartPanel;