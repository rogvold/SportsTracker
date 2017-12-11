/**
 * Created by sabir on 18.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');

var BackgroundImageContainer = require('../image/BackgroundImageContainer');
var createReactClass = require('create-react-class');
var TrainingsList= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            dayTimestamp: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading
        }
    },

    getTrainings: function(){
        var trainings = this.getFlux().store('OrganizationStore').trainings;
        var arr = [];
        var start = moment(this.props.dayTimestamp).startOf('day').format('x');
        var end = moment(this.props.dayTimestamp).endOf('day').format('x');
        for (var i in trainings){
            var tr = trainings[i];
            var t = tr.startTimestamp;
            if (t > start && t < end){
                arr.push(tr);
            }
        }
        return arr;
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

        },

        listPlaceholder: {

        },

        item: {
            marginBottom: 10,
            padding: 5,
            border: '1px solid rgb(239, 240, 241)',
            borderRadius: 3,
            cursor: 'pointer'
        },

        namePlaceholder: {
            fontWeight: 'bold'
        },

        timePlaceholder: {
            opacity: 0.8
        },

        rightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        avatarPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 5
        },

        avatar: {
            width: 40,
            height: 40
        }

    },

    getTrainer: function(trainerId){
        var store = this.getFlux().store('OrganizationStore');
        var trainer = store.getTrainer(trainerId);
        return trainer;
    },

    render: function(){
        var trainings = this.getTrainings();

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {trainings.map(function(tr, k){
                        var key = 'tr_' + k;
                        var onClick = this.onClick.bind(this, tr);
                        var trainer = this.getTrainer(tr.trainerId);

                        return (
                            <div style={this.componentStyle.item} onClick={onClick}
                                 key={key} className={' hoverYellowBackground '} >

                                <div style={this.componentStyle.avatarPlaceholder}>
                                    <div style={this.componentStyle.avatar}>
                                        <BackgroundImageContainer style={{borderRadius: 3}}
                                                                  image={'http://di.sabir.pro/assets/images/children/gus.jpg'} />
                                    </div>
                                </div>

                                <div style={this.componentStyle.rightPlaceholder}>
                                    <div style={this.componentStyle.namePlaceholder}>
                                        {trainer.name}
                                    </div>
                                    <div style={this.componentStyle.timePlaceholder}>
                                        <span>
                                                <i className={'icon wait'} ></i>
                                                <span style={{marginRight: 5}}>
                                                    {moment(tr.startTimestamp).format('HH:mm')}
                                                </span>
                                                -
                                                <span style={{marginRight: 5, marginRight: 5}}>
                                                    {moment(tr.endTimestamp).format('HH:mm')}
                                                </span>

                                                <span style={{opacity: 0.6}} >
                                                    ({moment.duration(tr.endTimestamp - tr.startTimestamp).asMinutes()} мин.)
                                                </span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = TrainingsList;