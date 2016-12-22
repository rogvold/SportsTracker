/**
 * Created by sabir on 24.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var UsersList = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],

            onUserClick: function(user){

            },

            showSignUpDate: true,
            showTableHeader: true

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

        },

        listPlaceholder: {
            borderTop: '1px solid #eff0f1',
            borderLeft: '1px solid #eff0f1',
            borderRight: '1px solid #eff0f1'
        },

        item: {
            fontSize: 16,
            backgroundColor: 'white',
            borderBottom: '1px solid #eff0f1',
            cursor: 'pointer'
        },

        namePlaceholder: {
            width: '40%',
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '1px solid #eff0f1',
            padding: 10
        },

        signupDatePlaceholder: {
            width: '16%',
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '1px solid #eff0f1',
            padding: 10,
            textAlign: 'left'
        },

        headerPlaceholder: {
            border: '1px solid #eff0f1',
            borderBottom: 'none'
        }

    },

    onUserClick: function(k){
        var users = this.props.users;
        this.props.onUserClick(users[k]);
    },

    render: function () {
        var users = this.props.users;
        if (users == undefined || users.length == 0){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.showTableHeader == false ? null :
                    <div style={this.componentStyle.headerPlaceholder}>

                        <div style={assign({}, this.componentStyle.namePlaceholder, {fontWeight: 'bold'})}>
                            Имя, Фамилия
                        </div>

                        {this.props.showSignUpDate == false ? null :
                            <div style={assign({}, this.componentStyle.signupDatePlaceholder, {fontWeight: 'bold'})}>
                                Дата регистрации
                            </div>
                        }
                    </div>
                }


                <div style={this.componentStyle.listPlaceholder}>
                    {users.map(function(u, k){
                        var key = 'user_' + k + '_' + u.id;
                        var onClick = this.onUserClick.bind(this, k);

                        return (
                            <div style={this.componentStyle.item} className={'hoverYellowBackground'}
                                 key={key} onClick={onClick} >

                                <div style={assign({}, this.componentStyle.namePlaceholder, (this.props.showSignUpDate == true ? {} : {width: '100%'}))}>
                                    {u.firstName + ' ' + u.lastName}
                                </div>

                                {this.props.showSignUpDate == false ? null :
                                    <div style={this.componentStyle.signupDatePlaceholder}>
                                        {moment(u.timestamp).format('DD.MM.YYYY')}
                                    </div>
                                }

                            </div>
                        );

                    }, this)}
                </div>

            </div>
        );
    }

});

module.exports = UsersList;