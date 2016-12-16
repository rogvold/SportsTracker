/**
 * Created by sabir on 14.12.16.
 */

/**
 * Created by sabir on 21.06.16.
 */
var React = require('react');
var assign = require('object-assign');

var HeaderLinks = require('./HeaderLinks');

var TrainerHeaderLinks = React.createClass({
    getDefaultProps: function () {
        return {
            active: undefined
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
        var links = [

            //{
            //    name: 'users',
            //    displayName: 'Клиенты',
            //    icon: '',
            //    url: '/'
            //},

            {
                displayName: 'Мои тренировки',
                name: 'index',
                icon: '',
                url: '/'
            },

            {
                displayName: 'Команды',
                name: 'teams',
                icon: '',
                url: '/teams'
            },

            {
                displayName: 'Игроки',
                name: 'users',
                icon: '',
                url: '/users'
            },



            {
                displayName: 'Помощь',
                name: 'help',
                icon: '',
                url: '/help'
            }
        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <HeaderLinks items={links} active={this.props.active} />
            </div>
        );
    }

});

module.exports = TrainerHeaderLinks;