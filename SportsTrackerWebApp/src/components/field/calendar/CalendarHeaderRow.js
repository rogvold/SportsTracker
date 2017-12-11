/**
 * Created by sabir on 17.06.16.
 */

var React = require('react');
var assign = require('object-assign');
var createReactClass = require('create-react-class');
var CalendarHeaderRow= createReactClass({
    getDefaultProps: function () {
        return {}
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
            borderBottom: '1px solid #EFF0F1',
            //borderRight: '1px solid #EFF0F1',
            background: 'white'
        },

        item: {
            width: 70,
            display: 'inline-block',
            verticalAlign: 'top',
            //borderRight: '1px solid #EFF0F1',
            padding: 5,
            //textAlign: 'center',
            fontSize: 18
            //backgroundColor: '#FAFAFA'
        }
    },

    render: function () {
        //var names = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница',
        //    'Суббота', 'Воскресенье', 'Отчёт'];

        //var names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'Отчёт'];
        var names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        return (
            <div style={this.componentStyle.placeholder}>

                {names.map(function(name, i){
                    var key = 'header_' + i;
                    var st = this.componentStyle.item;
                    if (i == 7){
                        //st = assign({}, st, {border: 'none', background: 'rgba(46,60,84,0.1)'})
                        st = assign({}, st, {border: 'none'})
                    }
                    return (
                        <div key={key} style={st}>
                            {name}
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = CalendarHeaderRow;