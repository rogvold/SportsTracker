/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var HeatMapPanel = require('../heatmap/HeatMapPanel');

var FieldPlayer = require('../FieldPlayer');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var SportHelper = require('../../../helpers/SportHelper');

var UserShotsPanel = require('../gate/UserShotsPanel');
var createReactClass = require('create-react-class');
var UserTrainingPanel= createReactClass({
    getDefaultProps: function () {
        return {

            field: undefined,
            userId: undefined,
            name: undefined, //todo: power with FLUX
            avatar: undefined,

            points: []

        }
    },

    getInitialState: function () {
        return {
            mode: 'tracking'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        tab: {
            padding: 7,
            marginLeft: 15,
            marginRight: 15,
            cursor: 'pointer',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        activeTab: {
            paddingBottom: 4,
            borderBottom: '3px solid #57BE85',
            fontWeight: 'bold',
            cursor: 'default'
        },

        tabsPlaceholder: {
            textAlign: 'center'
        },

        contentPlaceholder: {
            marginTop: 5
        },

        avatarPlaceholder: {
            width: 42,
            height: 42,
            borderRadius: 3
        },

        leftPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 50
        },

        rightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 160
        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 14
        },

        infoPlaceholder: {
            opacity: 0.4,
            marginTop: 5,
            fontSize: 12
        },

        userPlaceholder: {

        }

    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },

    render: function () {
        var mode = this.state.mode;
        var points = this.props.points;

        var players = [{
            training: {
                points: points
            }
        }];

        var points = this.props.points;
        points = (points == undefined) ? [] : points;

        var dur = SportHelper.getDuration(points);
        var durString = SportHelper.getDurationString(dur);
        var distance = SportHelper.getDistance(points);
        var distString = SportHelper.getDistanceString(distance);

        console.log('UserTrainingPanel: render: field = ', this.props.field);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.userPlaceholder}>

                    <div style={this.componentStyle.leftPlaceholder}>

                        <div style={this.componentStyle.avatarPlaceholder}>
                            <BackgroundImageContainer image={this.props.avatar} style={{borderRadius: 3}} />
                        </div>

                    </div>

                    <div style={this.componentStyle.rightPlaceholder}>
                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.name}
                        </div>

                        <div style={this.componentStyle.infoPlaceholder}>
                        <span style={{marginRight: 10}}>
                            <i className={'icon wait'} style={{marginRight: 2}} ></i> {durString}
                        </span>

                        <span style={{marginRight: 0}}>
                            <i className={'icon location arrow'} style={{marginRight: 2}} ></i> {distString}
                        </span>
                        </div>

                    </div>

                </div>

                <div style={this.componentStyle.tabsPlaceholder}>

                    <div onClick={this.switchMode.bind(this, 'tracking')} className={'hoverOpacity08'}
                         style={assign({}, this.componentStyle.tab, (mode == 'tracking') ? this.componentStyle.activeTab : {})}>Трекинг</div>

                    <div onClick={this.switchMode.bind(this, 'heatmap')} className={'hoverOpacity08'}
                         style={assign({}, this.componentStyle.tab, (mode == 'heatmap') ? this.componentStyle.activeTab : {})}>Карта положения</div>

                </div>

                <div style={this.componentStyle.contentPlaceholder}>
                    {mode != 'tracking' ? null :
                        <div>
                            <FieldPlayer
                                field={this.props.field}
                                shouldNumerate={false} players={players} showTrace={true} />

                            <div style={{marginTop: 10}} >
                                <UserShotsPanel />
                            </div>

                        </div>
                    }

                    {mode != 'heatmap' ? null :
                        <div>
                            <HeatMapPanel field={this.props.field} points={points} />
                        </div>
                    }
                </div>

            </div>
        );
    }

});

module.exports = UserTrainingPanel;