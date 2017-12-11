/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');
var BackgroundImageContainer = require('../image/BackgroundImageContainer');
var createReactClass = require('create-react-class');

var TrainersItem= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationStore')],
    getDefaultProps: function(){
        return {
            trainerId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationStore');
        return {
            loading: store.loading,
            trainer: store.getTrainer(this.props.trainerId)
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
            display: 'inline-block',
            padding: 5,
            border: '1px solid #EFF0F1',
            width: 232,
            borderRadius: 3,
            backgroundColor: 'white',
            cursor: 'pointer'
        },

        avatarPlaceholder: {
            width: 42,
            height: 42,
            borderRadius: 3,
            position: 'relative'
        },

        numberPlaceholder: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 2,
            borderTopRightRadius: 3,
            backgroundColor: 'white',
            fontSize: 8,
            opacity: 0.6,
            height: 14,
            lineHeight: '11px',
            fontWeight: 'bold'
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
        }
    },

    render: function(){
        var u = this.state.trainer;
        if (u == undefined){
            return null;
        }
        var tString = moment(u.timestamp).format('DD.MM.YYYY HH:mm');

        return (
            <div style={this.componentStyle.placeholder} className={'hoverYellowBackground'} >
                <div style={this.componentStyle.leftPlaceholder}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <BackgroundImageContainer image={u.avatar} style={{borderRadius: 3}} />
                    </div>

                </div>

                <div style={this.componentStyle.rightPlaceholder}>
                    <div style={this.componentStyle.namePlaceholder}>

                        <span style={{marginRight: 4}} >
                            {u.firstName}
                        </span>

                        <span>
                            {u.lastName}
                        </span>

                    </div>

                    <div style={this.componentStyle.infoPlaceholder}>

                        <span style={{marginRight: 10}}>
                            <i className={'icon wait'} style={{marginRight: 2}} ></i> {tString}
                        </span>

                    </div>

                </div>


            </div>
        );
    }

});

module.exports = TrainersItem;