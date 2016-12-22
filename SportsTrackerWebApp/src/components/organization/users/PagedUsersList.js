/**
 * Created by sabir on 24.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var UsersList = require('./UsersList');

var PagedUsersList = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],
            pageSize: 10,

            onUserClick: function(user){

            },

            showSignUpDate: true,
            showTableHeader: true

        }
    },

    getInitialState: function () {
        return {
            selectedPage: 0
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

        paginatorPlaceholder: {
            //textAlign: 'center',
            marginTop: 5
        }

    },

    onUserClick: function(user){
        this.props.onUserClick(user);
    },

    selectPage: function(n){
        this.setState({
            selectedPage: n
        });
    },

    onNext: function(){
        this.setState({
            selectedPage: this.state.selectedPage + 1
        });
    },

    onPrev: function(){
        this.setState({
            selectedPage: this.state.selectedPage - 1
        });
    },

    canDoNext: function(){
        var max = this.getMaxPageNumber();
        return (this.state.selectedPage < max);
    },

    canDoPrev: function(){
        return (this.state.selectedPage > 0);
    },

    paginatorIsVisible: function() {
        var users = this.props.users;
        return ((users != undefined) && (users.length > this.props.pageSize));
    },

    getMaxPageNumber: function(){
        var usersNumber = (this.props.users == undefined) ? 0 : this.props.users.length;
        if (usersNumber == 0){
            return 0;
        }
        var k = Math.ceil(1.0 * usersNumber / this.props.pageSize) - 1;
        return k;
    },

    getSelectedUsers: function(){
        var users = this.props.users;
        var pageSize = this.props.pageSize;
        var k = this.state.selectedPage;
        users = users.slice(k * pageSize, (k + 1) * pageSize);
        return users;
    },

    getPaginator: function(){
        var max = this.getMaxPageNumber();
        var k = this.state.selectedPage;
        var canDoNext = this.canDoNext();
        var canDoPrev = this.canDoPrev();

        return (
            <div style={{textAlign: 'center'}} className={'ui basic buttons'} >

                <button className={'ui button'} onClick={this.onPrev} disabled={!canDoPrev}  >
                    <span style={{cursor: 'pointer'}} disabled={!canDoPrev}  >
                        <i className={'icon arrow left'} ></i>
                    </span>
                </button>

                <button className={'ui button'} >
                    {+k + 1} / {+max + 1}
                </button>

                <button className={'ui button'} onClick={this.onNext} disabled={!canDoNext}  >
                    <span>
                        <i className={'icon arrow right'} ></i>
                    </span>
                </button>

            </div>
        );
    },

    render: function () {
        var users = this.getSelectedUsers();
        var paginatorIsVisible = this.paginatorIsVisible();


        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>
                    <UsersList
                        showTableHeader={this.props.showTableHeader}
                        showSignUpDate={this.props.showSignUpDate}
                        users={users} onUserClick={this.onUserClick} />
                </div>

                {paginatorIsVisible == false ? null :
                    <div style={this.componentStyle.paginatorPlaceholder}>
                        {this.getPaginator()}
                    </div>
                }

            </div>
        );
    }

});

module.exports = PagedUsersList;