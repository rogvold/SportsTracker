/**
 * Created by sabir on 24.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var Dialog = require('../../dialog/Dialog');

var SearchableUsersList = require('./SearchableUsersList');

var CreateNewUserPanel = require('./CreateNewUserPanel');

var UserUpdateButton = require('./update/UserUpdateButton');

var createReactClass = require('create-react-class');

var OrganizationUsersPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

            createUserEnabled: true

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            users: store.users
        }
    },

    getInitialState: function(){
        return {
            selectedUser: undefined,
            newUserDialogVisible: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            marginBottom: 10
        },

        listPlaceholder: {
            borderTop: '1px solid #eff0f1',
            borderLeft: '1px solid #eff0f1',
            borderRight: '1px solid #eff0f1'
        },

        item: {
            padding: 10,
            fontSize: 16,
            backgroundColor: 'white',
            borderBottom: '1px solid #eff0f1',
            cursor: 'pointer'
        },

        infoBlock: {
            padding: 10,
            fontSize: 16,
            border: '1px solid #eff0f1',
            backgroundColor: 'white',
            marginBottom: 5
        },

        usersPlaceholder: {
            padding: 5,
            backgroundColor: 'white',
            width: 960,
            margin: '0 auto',
            borderRadius: 4,
            border: '1px solid #eff0f1'
        }

    },

    getSelectedUser: function(){
        var user = this.state.selectedUser;
        var users = this.state.users;
        for (var i in users){
            if (users[i].id == user.id){
                return users[i];
            }
        }
        return undefined;
    },

    onUserClick: function(user){
        console.log('onUserClick occured: user = ', user);
        this.setState({
            selectedUser: user
        });
    },

    onClose: function(){
        this.setState({
            selectedUser: undefined
        });
    },

    getSelectedUserPanel: function(){
        var u = this.getSelectedUser();

        return (
            <div >

                <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}} >
                    <span>
                        {u.firstName} {u.lastName}
                    </span>

                    <span style={{marginLeft: 4}}>
                        <UserUpdateButton userId={u.id} />
                    </span>

                </div>

                <div>

                </div>

            </div>
        );
    },

    getCreateButtonContent: function(){
        return (
            <div style={{textAlign: 'right'}} >
                <button className={'ui basic green button'} style={{marginRight: 0}} onClick={this.setState.bind(this, {newUserDialogVisible: true})} >
                    <i className={'icon plus'} ></i> Новый пользователь
                </button>
            </div>
        );
    },

    onNewUserSubmit: function(data){
        this.getFlux().actions.createOrganizationUser(data, function(){
            this.setState({
                newUserDialogVisible: false
            });
        }.bind(this));
    },

    getNewUserDialogContent: function(){
        return (
            <div style={{padding: 10, position: 'relative'}}>

                <h3 style={{textAlign: 'center', fontSize: 20, marginTop: 10, marginBottom: 30}} >
                    Регистрация нового пользователя
                </h3>

                <CreateNewUserPanel onSubmit={this.onNewUserSubmit} />

            </div>
        );
    },

    render: function(){
        var users = this.state.users;

        var topRightContentForSearchableList = (this.props.createUserEnabled == true) ? this.getCreateButtonContent() : null;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.usersPlaceholder}>
                    <SearchableUsersList
                        topRightContent={topRightContentForSearchableList}
                        users={users} onUserClick={this.onUserClick} />
                </div>

                {this.state.selectedUser == undefined ? null :
                    <Dialog level={12} dialogPanelStyle={{width: 975, padding: 5}} onClose={this.onClose}
                            content={this.getSelectedUserPanel()}
                        />
                }

                {this.state.newUserDialogVisible == false ? null :
                    <Dialog level={12} dialogPanelStyle={{width: 420, padding: 5}}
                            onClose={this.setState.bind(this, {newUserDialogVisible: false})}
                            content={this.getNewUserDialogContent()} />
                }

                {this.state.newUserDialogVisible == true ? null :
                    <div>
                        {this.state.loading == false ? null :
                            <CoolPreloader />
                        }
                    </div>
                }

            </div>
        );
    }

});

module.exports = OrganizationUsersPanel;