/**
 * Created by sabir on 08.07.16.
 */
var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');



/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');

//api
var UserAPI = require('../api/UserAPI');

var TestField = require('../components/field/TestField');

var FieldTeamPanel = require('../components/field/FieldTeamPanel'); //ok

var HeatMap = require('../components/field/heatmap/HeatMap');

var HeatMapRangeSlider = require('../components/field/slider/HeatMapRangeSlider');

var HeatMapPanel = require('../components/field/heatmap/HeatMapPanel');

var Gate = require('../components/field/gate/Gate');

var CoolPreloader = require('../components/preloader/CoolPreloader');
var BallPreloader = require('../components/preloader/BallPreloader');

var AnimatedHeart = require('../components/heart/AnimatedHeart');

var SuperLineChart = require('../components/chart/SuperLineChart');

var TrainingTeamFieldPanel = require('../components/field/TrainingTeamFieldPanel');

var VkTemplate = require('../components/templates/vk/VkTemplate');

var DevApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {

        }
    },


    render: function(){

        return (
            <VkTemplate />
        );
    }

});

module.exports = DevApp;