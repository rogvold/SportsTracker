/**
 * Created by sabir on 24.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var PagedUsersList = require('./PagedUsersList');

var SearchableUsersList = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],

            onUserClick: function(user){

            },

            topRightContent: null,

            showSignUpDate: true,
            showTableHeader: true

        }
    },

    getInitialState: function () {
        return {
            query: ''
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

        inputPlaceholder: {
            marginBottom: 5
        },

        formPlaceholder: {
            width: '78%',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        topRightContent: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '22%'
        }
    },

    onQueryChange: function(evt){
        this.setState({
            query: evt.target.value
        });
    },

    containsString: function(s1, s2){
        if (s1 == undefined || s2 == undefined){
            return false;
        }
        s1 = s1.toLowerCase().trim();
        s2 = s2.toLowerCase().trim();
        if (s1.indexOf(s2) > -1){
            return true;
        }
        return false;
    },

    isCompatibleUser: function(u){
        var s = this.state.query;
        return (
            this.containsString(u.firstName, s) || this.containsString(u.lastName, s) ||
            this.containsString(u.nickname, s) || this.containsString(u.email, s)
        );
    },

    getFilteredUsers: function(){
        var users = this.props.users;
        if (this.state.query == undefined || this.state.query.trim() == ''){
            return users;
        }
        var arr = [];
        for (var i in users){
            if (this.isCompatibleUser(users[i])){
                arr.push(users[i]);
            }
        }
        return arr;
    },

    render: function () {
        var users = this.getFilteredUsers();

        var formPlaceholderStyle = assign({}, this.componentStyle.formPlaceholder);
        if (this.props.topRightContent == null){
            formPlaceholderStyle = assign({}, formPlaceholderStyle, {width: '100%'});
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui form'} style={formPlaceholderStyle} >
                    <div style={this.componentStyle.inputPlaceholder} className={'ui icon input'} >
                        <input type={'text'} value={this.state.query} onChange={this.onQueryChange} placeholder={'Поиск...'} />
                        <button className={'ui icon basci button'} style={{display: 'none'}} >
                            <i className={'icon search'} ></i>
                            Search
                        </button>
                        <i className={'icon search'} ></i>
                    </div>
                </div>

                {this.props.topRightContent == undefined ? null :
                    <div style={this.componentStyle.topRightContent}>
                        {this.props.topRightContent}
                    </div>
                }

                {users.length == 0 ?
                    <div>
                        <div style={{textAlign: 'center', marginBottom: 10}} >
                            <img src={'assets/images/empty_result.png'} style={{width: 250, display: 'inline-block'}} />
                            <br/>
                            <span style={{opacity: 0.6, fontSize: 16}} >
                                По запросу "<b>{this.state.query}</b>" не найден ни один пользователь
                            </span>

                        </div>
                    </div> :
                    <div style={this.componentStyle.listPlaceholder}>
                        <PagedUsersList
                            showTableHeader={this.props.showTableHeader}
                            showSignUpDate={this.props.showSignUpDate} users={users} onUserClick={this.props.onUserClick} />
                    </div>
                }



            </div>
        );
    }

});

module.exports = SearchableUsersList;