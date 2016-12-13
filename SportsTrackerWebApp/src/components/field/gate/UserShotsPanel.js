/**
 * Created by sabir on 14.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Gate = require('./Gate');

var SportHelper = require('../../../helpers/SportHelper');

var UserShotsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            shots: SportHelper.generateRandomShots(Math.floor(15 * Math.random()) + 10)
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
            width: 700,
            margin: '0 auto'
        },

        gatePlaceholder: {

        },

        topPlaceholder: {

        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>
                    Количество ударов:
                    <span style={{fontWeight: 'bold', marginLeft: 5}} >
                        {this.props.shots.length}
                    </span>
                </div>

                <div style={this.componentStyle.gatePlaceholder}>
                    <Gate shots={this.props.shots} />
                </div>

            </div>
        );
    }

});

module.exports = UserShotsPanel;