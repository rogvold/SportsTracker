/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var UserItem = require('./UserItem');
var createReactClass = require('create-react-class');
var PlayersList= createReactClass({
    getDefaultProps: function () {
        return {
            players: [],

            onUserClick: function(user){

            }

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

        },

        listPlaceholder: {

        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 4
        }
    },

    onUserClick: function(user){
        console.log('onUserClick: user = ', user);
        this.props.onUserClick(user);
    },

    render: function () {
        var list = this.props.players;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(u, k){
                        var key = 'user_' + k;
                        var onClick = this.onUserClick.bind(this, u);
                        var number = (+k + 1);

                        return (
                            <div style={this.componentStyle.item} key={key} onClick={onClick} >
                                <UserItem user={u} number={number} />
                            </div>
                        );
                    }, this)}

                </div>



            </div>
        );
    }

});

module.exports = PlayersList;