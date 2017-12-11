/**
 * Created by sabir on 16.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var createReactClass = require('create-react-class');
var TrainingsList= createReactClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {

            trainings: [],

            onTrainingClick: function(tr){

            }

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    getTrainer: function(trainerId){
        var store = this.getFlux().store('OrganizationStore');
        var trainer = store.getTrainer(trainerId);
        return trainer;
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

    onClick: function(tr){
        this.props.onTrainingClick(tr);
    },

    render: function () {
        var trainings = this.props.trainings;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {trainings.map(function(tr, k){
                        var key = 'tr_' + k;
                        var onClick = this.onClick.bind(this, tr);
                        var trainer = this.getTrainer(tr.trainerId);

                        return (
                            <div style={this.componentStyle.item} onClick={onClick}
                                 key={key} className={'hoverYellowBackground'} >

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