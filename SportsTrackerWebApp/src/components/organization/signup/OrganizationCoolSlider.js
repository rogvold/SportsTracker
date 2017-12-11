/**
 * Created by sabir on 21.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var ClubCoolSlider= createReactClass({
    getDefaultProps: function () {
        return {

            timerInterval: 8 * 1000, // 8 seconds

            photos: [
                {
                    url: 'http://di.sabir.pro/assets/images/signup_01.jpg',
                    text: 'Для современных спортивных школ, которым не безразличен прогресс клиентов.'
                    //text: 'Понять и улучшить можно только то, что можно измерить'
                },
                {
                    url: 'http://di.sabir.pro/assets/images/signup_02_1.jpg',
                    text: 'Улучшайте тренировки своих клиентов, анализируя их активность.'
                }
                //{
                //    url: 'http://updates.polar.com/wp-content/uploads/2015/11/Flow-clubs-.jpg',
                //    text: 'Ваши клиенты всегда смогут увидеть свой прогресс в личном кабинете'
                //}
            ]

        }
    },

    getInitialState: function () {
        return {
            currentSlideNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initTimer();
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            height: '100%',
            width: '100%'
        },

        zeroLayer: {
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },

        overlay: {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(46, 60, 84, 0.7)',
            textAlign: 'center',
            padding: 10,
            color: 'white',
            fontSize: 24,
            paddingTop: 150
        },

        textPlaceholder: {
            position: 'absolute',
            zIndex: 2,
            bottom: 50,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'white',
            fontSize: 30,
            lineHeight: '44px',
            paddingLeft: 30,
            paddingRight: 30
        }

    },

    initTimer: function(){
        if (this.intervalId != undefined){
            return;
        }
        this.intervalId = setInterval(function(){
            var photos = this.props.photos;
            var n = this.state.currentSlideNumber;
            n = (n + 1) % photos.length;
            this.setState({
                currentSlideNumber: n
            });
        }.bind(this), this.props.timerInterval);
    },

    destroyTimer: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    render: function () {
        var photos = this.props.photos;
        var url = photos[this.state.currentSlideNumber].url;
        var text = photos[this.state.currentSlideNumber].text;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.zeroLayer}>
                    <BackgroundImageContainer image={url} />
                </div>

                <div style={this.componentStyle.overlay}>

                </div>

                <div style={this.componentStyle.textPlaceholder}>
                    {text}
                </div>

            </div>
        );
    }

});

module.exports = ClubCoolSlider;