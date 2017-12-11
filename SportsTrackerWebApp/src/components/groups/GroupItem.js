/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GroupItem= createReactClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            groupId: undefined
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
            width: 250,
            textAlign: 'left'
        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 14,
            marginBottom: 5
        },

        descriptionPlaceholder: {

        }
    },

    getGroup: function(){
        var groupId = this.props.groupId;
        var store = this.getFlux().store('OrganizationStore');
        var group = store.getGroup(groupId);
        return group;
    },

    render: function () {
        var group = this.getGroup();
        if (group == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.namePlaceholder}>
                    {group.name}
                </div>

                <div style={this.componentStyle.descriptionPlaceholder}>
                    {group.description}
                </div>

            </div>
        );
    }

});

module.exports = GroupItem;