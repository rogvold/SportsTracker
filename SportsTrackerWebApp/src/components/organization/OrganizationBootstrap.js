/**
 * Created by sabir on 13.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BallPreloader = require('../preloader/BallPreloader');
var createReactClass = require('create-react-class');
var OrganizationBootstrap= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            adminId: undefined,


            reloadMode: false

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        var usersStore = flux.store('UsersStore');
        var loading = (store.loading || usersStore.loading );
        return {
            loading: loading
        }
    },

    getInitialState: function(){
        return {
            loadingFired: false
        }
    },

    componentWillReceiveProps: function(nextProps){
        var shouldLoad = false;
        if (this.state.loadingFired == true){
            return;
        }
        if (this.props.adminId == undefined || nextProps.adminId != undefined){
            this.startLoading();
        }
    },

    componentDidMount: function(){
        console.log('OrganizationBootstrap: componentDidMount occured');
        this.startLoading();
    },

    startLoading: function(){
        console.log('startLoading occured');

        var adminId = this.props.adminId;

        var reloadMode = this.props.reloadMode;
        var store = this.getFlux().store('OrganizationStore');
        var org = store.organization;

        console.log('org = ', org);

        if (org == undefined){
            setTimeout(function(){
                this.getFlux().actions.loadTotalOrganizationByAdminId(adminId, function(){
                    this.getFlux().actions.loadOrganizationTrainings();
                }.bind(this));
            }.bind(this), 30);

            this.setState({
                loadingFired: true
            });

        }else {
            if (reloadMode == true){
                setTimeout(function(){
                    this.getFlux().actions.loadTotalOrganizationByAdminId(org.adminId, function(){
                        this.getFlux().actions.loadOrganizationTrainings();
                    }.bind(this));
                }.bind(this), 30);
            }
            this.setState({
                loadingFired: true
            });
        }
    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                {this.state.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        );
    }

});

module.exports = OrganizationBootstrap;