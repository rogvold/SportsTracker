/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

//var mo = require('mo-js');

var MoJS = require('mo-js');

var AnimatedHeart = React.createClass({
    getDefaultProps: function () {
        return {

            width: 400,
            height: 400,

            content: undefined

        }
    },

    getInitialState: function () {
        return {
            content: this.props.content
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var content = nextProps.content;
        setTimeout(function(){
            this.makeAnimation();
        }.bind(this), 10);
        this.setState({
            content: content
        });
    },

    componentDidMount: function () {
        setTimeout(function(){
            this.makeAnimation();
        }.bind(this), 100);
    },

    componentStyle: {
        placeholder: {
            width: 400,
            height: 400,
            //border: '1px solid grey',
            position: 'relative',
            margin: '0 auto'
        },

        contentPlaceholder: {
            width: 60,
            height: 60,
            textAlign: 'center',
            position: 'absolute',
            //border: '1px dashed grey',
            //color: '#988ADE'
            color: '#6BAED6'
        }

    },

    makeAnimation: function(){


        var el = this.refs.sabir;
        var sabirContent = this.refs.sabirContent;

        this.timeline = new MoJS.Timeline();

        var h = this.props.height * 0.15;
        var fontSize = 0.9 * h;

        var tweens = [
            // burst animation

            new mojs.Burst({
                parent: el,
                duration: 1500,
                shape : 'circle',
                fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                x: '50%',
                y: '50%',
                opacity: 0.6,
                childOptions: { radius: {20:0} },
                radius: {40:120},
                count: 6,
                isSwirl: true,
                isRunLess: true,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
            }),
            // ring animation
            new mojs.Transit({
                parent: el,
                duration: 750,
                type: 'circle',
                radius: {30: 90},
                fill: 'transparent',
                //stroke: '#988ADE',
                stroke: '#6BAED6',
                strokeWidth: {15:0},
                opacity: 0.6,
                x: '50%',
                y: '50%',
                isRunLess: true,
                easing: mojs.easing.bezier(0, 1, 0.5, 1),
                onUpdate: function(progress){
                    //sabirContent.style.WebkitTransform = sabirContent.style.transform = 'scale3d(' + progress + ',' + progress, ',1)';
                }
            })];

        for (var i in tweens){
            this.timeline.add(tweens[i]);
        }

        this.timeline.start();

    },

    render: function () {


        var st = assign({}, this.componentStyle.placeholder);

        var h = this.props.height * 0.15;
        var w = this.props.width * 0.25;

        var left = (this.props.width - w) / 2;
        var top = (this.props.height - h) / 2;

        var contentStyle = assign({}, this.componentStyle.contentPlaceholder,
            {top: top, left: left, fontSize: 0.9 * h, lineHeight: h + 'px', width: w, height: h});



        return (
            <div ref={'sabir'} style={st}>

                <div style={contentStyle} onClick={this.makeAnimation} ref={'sabirContent'} >
                    {this.state.content}
                </div>

            </div>
        );
    }

});

module.exports = AnimatedHeart;