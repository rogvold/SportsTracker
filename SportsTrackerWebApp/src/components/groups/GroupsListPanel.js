/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GroupItem = require('./GroupItem');

var Dialog = require('../dialog/Dialog');

var GroupPanel = require('./GroupPanel');

var GroupsListPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            groups: store.getGroups()
        }
    },

    getInitialState: function(){
        return {
            selectedGroup: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {
            //textAlign: 'center',
            minHeight: 150
        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            backgroundColor: 'white',
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3,
            padding: 7,
            margin: 5,
            cursor: 'pointer'
        },

        dialogPanelStyle: {
            width: 800,
            padding: 10
        }

    },

    onClick: function(g){
        this.setState({
            selectedGroup: g
        });
    },

    onDelete: function(){
        this.setState({
            selectedGroup: undefined
        });
    },

    onUpdate: function(){

    },

    getSelectedGroupContent: function(){
        var g = this.state.selectedGroup;

        return (
            <div>
                <GroupPanel groupId={g.id} onDelete={this.onDelete} onUpdate={this.onUpdate} />
            </div>
        );
    },

    render: function(){
        var groups = this.state.groups;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {groups.map(function(g, k){
                        if (g == undefined){
                            return null;
                        }
                        var key = 'group_' + k + '_' +g.id;
                        var onClick = this.onClick.bind(this, g);

                        return (
                            <div style={this.componentStyle.item} key={key} onClick={onClick} className={'hoverYellowBackground'} >
                                <GroupItem groupId={g.id} />
                            </div>
                        );

                    }, this)}

                </div>


                {this.state.selectedGroup == undefined ? null :
                    <Dialog onClose={this.setState.bind(this, {selectedGroup: undefined})} level={100}
                            content={this.getSelectedGroupContent()} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = GroupsListPanel;