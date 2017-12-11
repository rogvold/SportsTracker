/**
 * Created by sabir on 11.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');

var FieldTeamPanel = require('../FieldTeamPanel');
var TrainingTeamFieldPanel = require('../TrainingTeamFieldPanel');

var Dialog = require('../../dialog/Dialog');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var createReactClass = require('create-react-class');

var DaySessionsList= createReactClass({

    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {

            trainerId: undefined,

            day: undefined
        }
    },

    getInitialState: function () {
        return {
            selectedSession: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

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

    getSelectedSessionContent: function(){
        var session = this.state.selectedSession;
        if (session == undefined){
            return undefined;
        }
        var trainingId = session.id;
        var store = this.getFlux().store('OrganizationStore');
        var field = store.getTrainingField(trainingId);

        return (
            <div>

                <div style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10}} >
                    {moment(session.start).format('DD.MM.YYYY HH:mm')}
                </div>
                {field == undefined ? null :
                    <div style={{fontSize: 16, opacity: 0.6, textAlign: 'center', marginBottom: 20}} >
                        {field.name}
                    </div>
                }



                {true == true ? null :
                    <FieldTeamPanel trainingId={trainingId} />
                }

                <TrainingTeamFieldPanel trainingId={trainingId} />


            </div>
        );
    },

    onClick: function(session){
        this.setState({
            selectedSession: session
        });
    },

    getSessions: function(){
        var day = this.props.day;
        if (day == undefined){
            return [];
        }
        var sessions = day.sessions;
        sessions.sort(function(a, b){
            return (b.start - a.start);
        });
        var trainerId = this.props.trainerId;
        if (trainerId != undefined){
            sessions = sessions.filter(function(a){return (a.trainerId == trainerId)});
        }
        return sessions;
    },

    render: function () {
        var day = this.props.day;
        if (day == undefined){
            return null;
        }

        var sessions = this.getSessions();
        //var sessions = day.sessions;

        console.log('DaySessionsList: day = ', day);

        var store = this.getFlux().store('OrganizationStore')

        //sessions.sort(function(a, b){
        //    return (b.start - a.start);
        //});

        console.log('DaySessionsList: render: sessions = ', sessions);

        return (
            <div >
                <div style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5}} >
                    {moment(day.start).format('DD.MM.YYYY')}
                </div>

                <div style={{textAlign: 'center', opacity: 0.6, marginTop: 0, marginBottom: 15}} >
                    Количество тренировок:
                    <span style={{marginLeft: 5, fontWeight: 'bold'}} >
                        {sessions.length}
                    </span>
                </div>

                <div className={'trainings_list'} >

                    {sessions.map(function(session, k){
                        var key = 'session_' + k;
                        var onClick = this.onClick.bind(this, session);
                        var trainer = store.getTrainer(session.trainerId);

                        return (
                            <div onClick={onClick}
                                 key={key} className={'training_item hoverYellowBackground'} >

                                <div style={this.componentStyle.avatarPlaceholder}>
                                    <div style={this.componentStyle.avatar}>
                                        {true == true ? null :
                                            <BackgroundImageContainer style={{borderRadius: 3}}
                                                                      image={'http://di.sabir.pro/assets/images/children/gus.jpg'} />
                                        }
                                        <BackgroundImageContainer style={{borderRadius: 3}} image={trainer.avatar} />

                                    </div>
                                </div>

                                <div style={this.componentStyle.rightPlaceholder} className={'right_placeholder'} >
                                    <div style={this.componentStyle.namePlaceholder}>
                                        {trainer.firstName} {trainer.lastName}
                                    </div>
                                    <div style={this.componentStyle.timePlaceholder}>
                                        <span>
                                                <i className={'icon wait'} ></i>
                                                <span style={{marginRight: 5}}>
                                                    {moment(session.start).format('HH:mm')}
                                                </span>

                                                {true == true ? null :
                                                    <span style={{marginRight: 5, marginRight: 5}}>
                                                        {moment(session.end).format('HH:mm')}
                                                    </span>
                                                }


                                                {true == true ? null :
                                                    <span style={{opacity: 0.6}} >
                                                        ({moment.duration(session.duration).asMinutes()} мин.)
                                                    </span>
                                                }

                                        </span>
                                    </div>
                                </div>

                            </div>
                        );

                    }, this)}

                </div>

                {this.state.selectedSession == undefined ? null :
                    <Dialog level={10} dialogPanelStyle={{width: 760, padding: 10}}
                            content={this.getSelectedSessionContent()} onClose={this.setState.bind(this, {selectedSession: undefined})}
                        />
                }

            </div>
        );
    }

});

module.exports = DaySessionsList;