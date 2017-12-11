/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var FieldPoint = require('./FieldPoint');
var createReactClass = require('create-react-class');
var Field= createReactClass({
    getDefaultProps: function () {
        return {
            style: {
                width: 720,
                height: 460
            },

            field: undefined,

            points: [],
            tracePoints: [],

            onPointClick: function(userId){

            }

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
        placeholder: {
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url("http://www.clker.com/cliparts/e/1/0/1/1206569652298015110focadima_Soccer_Field.svg.hi.png")',
            backgroundImage: 'url("http://www.englishpatient.ru/img/football_pitch.png")'
        }
    },

    onPointClick: function(userId){
        this.props.onPointClick(userId);
    },

    getKx: function(){
        var imHeight = this.props.style.height;
        var imWidth = this.props.style.width;

        var field = this.props.field;
        if (field == undefined){
            return 1;
        }
        return (
            1.0 * imWidth / field.width
        );
    },

    getKy: function(){
        var imHeight = this.props.style.height;
        var imWidth = this.props.style.width;

        var field = this.props.field;
        if (field == undefined){
            return 1;
        }
        return (
            1.0 * imHeight / field.height
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var points = this.props.points;
        var tracePoints = this.props.tracePoints;

        var imHeight = this.props.style.height;
        var imWidth = this.props.style.width;

        var kx = this.getKx();
        var ky = this.getKy();

        console.log('Field: render: kx, ky = ', kx, ky)
        console.log('Field: render: field = ', this.props.field)

        return (
            <div style={st}>

                {points.map(function(p, k){
                    var x = Math.floor(p.x * kx); // fuck  ?
                    var y = Math.floor(p.y * ky); //fuck?
                    var key = 'point_' + k;
                    var name = (+k + 1);
                    var onClick = this.onPointClick.bind(this, p.userId);
                    if (this.props.shouldNumerate == false){
                        name = '';
                    }

                    return (
                        <div key={key} >
                            <FieldPoint name={name} x={x} y={y} color={p.color} userId={p.userId}
                                        onClick={onClick}
                                />
                        </div>
                    );
                }, this)}

                {tracePoints.map(function(p, k){
                    var x = Math.floor(p.x * kx); //fuck?
                    var y = Math.floor(p.y * ky); //fuck?
                    var key = 'tracePoint_' + k;
                    return (
                        <div key={key} >
                            <FieldPoint x={x} y={y} radius={2} style={{border: 'none'}}
                                        color={p.color} userId={p.userId} />
                        </div>
                    );
                }, this)}


            </div>
        );
    }

});

module.exports = Field;