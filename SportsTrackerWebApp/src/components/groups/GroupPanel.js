/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UpdateGroupButton = require('./UpdateGroupButton');

var GroupPanel= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {

            groupId: undefined,

            editable: true,

            onUpdate: function(){

            },

            onDelete: function(){

            }


        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            group: store.getGroup(this.props.groupId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        namePlaceholder: {
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 10
        },

        groupDescription: {
            opacity: 0.6,
            marginBottom: 10
        }

    },

    render: function(){
        var group = this.state.group;
        if (group == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >


                <div style={this.componentStyle.namePlaceholder}>
                    {group.name}

                    {this.props.editable == false ? null :
                        <span style={{marginLeft: 5}} >
                            <UpdateGroupButton groupId={this.props.groupId} onUpdate={this.props.onUpdate}
                                           onDelete={this.props.onDelete} buttonClassName={''}
                                               style={{margin: 0, cursor: 'pointer', opacity: 0.6}}
                                />
                        </span>
                    }

                </div>

                {group.description == undefined || group.description.trim() == '' ? null:
                    <div style={this.componentStyle.groupDescription}>
                        {group.description}
                    </div>
                }




            </div>
        );
    }

});

module.exports = GroupPanel;