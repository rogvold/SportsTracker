/**
 * Created by sabir on 15.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../../preloader/CoolPreloader');

var Dialog = require('../../../dialog/Dialog');

var UserGroupsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            user: store.getUser(this.props.userId),
            groups: store.getUserGroups(this.props.userId),
            allGroupsMap: store.groupsMap
        }
    },

    getInitialState: function(){
        return {
            groupsDialogVisible: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        this.getFlux().actions.loadUserGroups(this.props.userId);
    },

    componentStyle: {
        placeholder: {
            //position: 'relative'
        },


        groupsList: {
            marginTop: 5
        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 4,
            //backgroundColor: '#55617F',
            //backgroundColor: '#424F64',
            backgroundColor: '#55617F',
            borderRadius: 100,
            minWidth: 50
        },

        namePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 4,
            minWidth: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            paddingLeft: 5
        },

        deleteButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 28,
            padding: 4,
            textAlign: 'center'
        },

        deleteButton: {
            color: '#EB7265',
            cursor: 'pointer',
            display: 'inline-block'
        },

        topPlaceholder: {

        },

        addButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 4
        },

        infoPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            lineHeight: '24px'
        },

        glItem: {
            marginBottom: 5,
            cursor: 'pointer',
            padding: 5,
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 4
        }


    },

    getDialogContent: function(){
        var list = this.getListGroups();
        var user = this.state.user;
        return (
            <div style={{position: 'relative'}} >

                <div style={{marginBottom: 10}} >
                    Выберите команду для игрока
                    <b>
                        <span style={{marginLeft: 5}} >
                            {user.firstName}
                        </span>
                        <span style={{marginLeft: 5}} >
                            {user.lastName}
                        </span>
                    </b>
                </div>

                <div>
                    {list.map(function(g, k){
                        var key = 'glf_' + k;
                        var onGroupSelect = this.onGroupSelect.bind(this, g);

                        return (
                            <div style={this.componentStyle.glItem} key={key} className={'hoverYellowBackground'}
                                 onClick={onGroupSelect} >
                                {g.name}
                            </div>
                        );
                    }, this)}
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    },

    onGroupSelect: function(g){
        this.getFlux().actions.addUserToGroup(this.props.userId, g.id, function(){
            this.setState({
                groupsDialogVisible: false
            });
        }.bind(this));
    },

    getListGroups: function(){
        console.log('getListGroups occured');
        var exMap = {};
        var groups = this.state.groups;
        for (var i in groups){
            var g = groups[i];
            exMap[g.id] = g;
        }
        var map = this.state.allGroupsMap;
        var arr = [];
        for (var key in map){
            var g = map[key];
            if (exMap[g.id] == undefined){
                arr.push(g);
            }
        }
        console.log('returning arr = ', arr);
        return arr;
    },

    onRemove: function(g){
        this.getFlux().actions.detachUserFromGroup(this.props.userId, g.id);
    },

    render: function(){
        var groups = this.state.groups;
        var dialogGroups = this.getListGroups();

        var addNewGroupButtonIsVisible = (dialogGroups.length > 0);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.topPlaceholder}>

                    {groups.length == 0 ?
                        <div style={this.componentStyle.infoPlaceholder}>
                            Игрок еще не состоит ни в одной команде
                        </div>
                        : null
                    }

                </div>

                <div style={this.componentStyle.groupsList}>

                    {groups.map(function(g, k){
                        var key = 'g_' + k;
                        var onRemove = this.onRemove.bind(this, g);

                        return (
                            <div style={this.componentStyle.item} key={key} >

                                <div style={this.componentStyle.namePlaceholder}>
                                    {g.name}
                                </div>

                                <div style={this.componentStyle.deleteButtonPlaceholder}>
                                    <div style={this.componentStyle.deleteButton} onClick={onRemove} >
                                        <i className={'icon remove'} style={{marginRight: 0}} ></i>
                                    </div>
                                </div>
                            </div>
                        );

                    }, this)}

                    {addNewGroupButtonIsVisible == false ? null :
                        <div style={this.componentStyle.addButtonPlaceholder}>
                            <button className={'ui basic button circular mini green'} style={{marginRight: 0, padding: 7, paddingLeft: 14, paddingRight: 14, fontSize: 14}}
                                    onClick={this.setState.bind(this, {groupsDialogVisible: true})}
                                >
                                <i className={'icon plus'} ></i> добавить команду
                            </button>
                        </div>
                    }

                </div>


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

                {this.state.groupsDialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()} dialogPanelStyle={{width: 500, padding: 15}}
                            onClose={this.setState.bind(this, {groupsDialogVisible: false})} level={10000} />
                }

            </div>
        );
    }

});

module.exports = UserGroupsPanel;