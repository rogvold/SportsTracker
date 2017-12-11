/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var GatePoint = require('./GatePoint');
var createReactClass = require('create-react-class');
var GateCorner= createReactClass({
    getDefaultProps: function () {
        return {
            direction: 'left',
            shots: []
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 232
        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 77
        }

    },

    getShotsArray: function(){
        var map = {};
        var arr = [];
        var shots = this.props.shots;
        for (var i in shots){
            var s = shots[i];
            var key = '' + s.number;
            if (map[key] == undefined){
                map[key] = {
                    areaNumber: s.number,
                    shotsNumber: 0
                }
            }
            map[key].shotsNumber = map[key].shotsNumber + 1;
        }
        for (var key in map){
            arr.push(map[key]);
        }
        arr.sort(function(a1, a2){
            return a1.areaNumber - a2.areaNumber;
        });
        arr = arr.map(function(a){return a.shotsNumber});
        return arr;
    },

    getCornerPoints: function(direction, arr){
        var shotsArray = this.getShotsArray();
        return (
            <div>
                {arr.map(function(a, k){
                    var key = direction + '_' + k;
                    var shotsNumber = shotsArray[a];
                    var name = '' + a;

                    return (
                        <div style={this.componentStyle.item} key={key}>
                            <GatePoint shotsNumber={shotsNumber} name={name} />
                        </div>
                    );

                }, this)}
            </div>
        );
    },

    getLeftDirectionCorner: function(){
        var arr = [9, 7, 3, 8, 5, 2, 6, 4, 1];
        return this.getCornerPoints('left', arr);
    },

    getRightDirectionCorner: function(){
        var arr = [3, 7, 9, 2, 5, 8, 1, 4, 6];
        return this.getCornerPoints('right', arr);
    },

    render: function () {
        var direction = this.props.direction;

        return (
            <div style={this.componentStyle.placeholder}>

                {direction != 'left' ? null :
                    <div>
                        {this.getLeftDirectionCorner()}
                    </div>
                }

                {direction != 'right' ? null :
                    <div>
                        {this.getRightDirectionCorner()}
                    </div>
                }


            </div>
        );
    }

});

module.exports = GateCorner;