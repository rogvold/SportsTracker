/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrainersItem = require('./TrainersItem');

var Dialog = require('../dialog/Dialog');

var TrainerPanel = require('./TrainerPanel');
var createReactClass = require('create-react-class');
var TrainersList= createReactClass({
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
            trainers: store.trainers
        }
    },

    getInitialState: function(){
        return {
            selectedTrainer: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },


    onClick: function(g){
        this.setState({
            selectedTrainer: g
        });
    },

    onDelete: function(){
        this.setState({
            selectedTrainer: undefined
        });
    },

    onUpdate: function(){

    },

    getSelectedTrainerContent: function(){
        var trainer = this.state.selectedTrainer;

        return (
            <div>
                <TrainerPanel trainerId={trainer.id} onDelete={this.onDelete} onUpdate={this.onUpdate} />
            </div>
        );
    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {
            //textAlign: 'center',
            //minHeight: 150
        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            //backgroundColor: 'white',
            //border: '1px solid rgb(239, 240, 241)',
            //borderRadius: 3,
            //padding: 7,
            margin: 5,
            cursor: 'pointer'
        },

        dialogPanelStyle: {
            width: 800,
            padding: 10
        }

    },

    onClick: function(u){
        this.setState({
            selectedTrainer: u
        });
    },

    render: function(){
        var trainers = this.state.trainers;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>
                    {trainers.map(function(u, k){
                        var key = 'trainer_' + k + '_' + u.id;
                        var onClick = this.onClick.bind(this, u);
                        return (
                            <div style={this.componentStyle.item} onClick={onClick} key={key} >
                                <TrainersItem trainerId={u.id} />
                            </div>
                        );

                    }, this)}
                </div>

                {this.state.selectedTrainer == undefined ? null :
                    <Dialog onClose={this.setState.bind(this, {selectedTrainer: undefined})} level={100}
                            content={this.getSelectedTrainerContent()} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }


            </div>
        );
    }

});

module.exports = TrainersList;