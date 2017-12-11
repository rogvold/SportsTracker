/**
 * Created by sabir on 09.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var PlayersList = require('./users/PlayersList');

var FieldPlayer = require('./FieldPlayer');

var SportHelper = require('../../helpers/SportHelper');

var UserTrainingPanel = require('./users/UserTrainingPanel');

var Dialog = require('../dialog/Dialog');
var createReactClass = require('create-react-class');
var FieldTeamPanel= createReactClass({
    getDefaultProps: function () {
        return {

            field: undefined,

            trainingId: undefined,

            players: SportHelper.generateFakeFootballUsers(22),

        }
    },

    getInitialState: function () {
        return {
            selectedPlayer: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 740,
            padding: 10,
            border: '1px solid #EFF0F1',
            borderRadius: 3,
            margin: '0 auto',
            backgroundColor: 'white'
        },

        playerPlaceholder: {

        },

        usersPlaceholder: {
            width: 720,
            margin: '0 auto'
        }

    },

    onUserClick: function(u){
        console.log('onUserClick: u = ', u);
        this.setState({
            selectedPlayer: u
        });
    },

    getSelectedPlayerContent: function(){
        var p = this.state.selectedPlayer;
        console.log('getSelectedPlayerContent: p = ', p);

        return (
            <div>
                <UserTrainingPanel
                    field={p.field}
                    userId={p.id} name={p.name} avatar={p.avatar}
                    points={p.training.points} />
            </div>
        );
    },

    getPlayerById: function(id){
        var list = this.props.players;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    },

    onPointClick: function(userId){
        var user = this.getPlayerById(userId);
        if (user == undefined){
            return;
        }
        this.setState({
            selectedPlayer: user
        });
    },

    render: function () {
        var players = this.props.players;
        var selectedPlayer = this.state.selectedPlayer;
        console.log('FieldTeamPanel: trainingId = ', this.props.trainingId);
        console.log('FieldTeamPanel: players = ', this.props.players);
        console.log('FieldTeamPanel: selectedPlayer = ', this.state.selectedPlayer);
        var field = this.props.field;


        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.playerPlaceholder}>
                    <FieldPlayer
                        field={this.props.field}
                        players={this.props.players} onPointClick={this.onPointClick} />
                </div>

                <div style={this.componentStyle.usersPlaceholder}>

                    <PlayersList players={this.props.players} onUserClick={this.onUserClick} />

                </div>

                {selectedPlayer == undefined ? null :
                    <Dialog level={100} content={this.getSelectedPlayerContent()}
                            dialogPanelStyle={{width: 740, padding: 10}}
                            onClose={this.setState.bind(this, {selectedPlayer: undefined})}
                        />
                }


            </div>
        );
    }

});

module.exports = FieldTeamPanel;