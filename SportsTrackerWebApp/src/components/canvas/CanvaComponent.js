/**
 * Created by sabir on 08.07.16.
 */
"use strict";

var React = require('react');
var assign = require('object-assign');

var ReactCanvas = require('react-canvas');

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

var ReactART = require('react-art');

var Group = ReactART.Group;
var Shape = ReactART.Shape;
var Surface = ReactART.Surface;
var Transform = ReactART.Transform;


var CanvaComponent = React.createClass({
    /**
     * Initialize state members.
     */
    getInitialState: function() {
        return {

        };
    },

    /**
     * When the component is mounted into the document - this is similar to a
     * constructor, but invoked when the instance is actually mounted into the
     * document. Here's, we'll just set up an animation loop that invokes our
     * method. Binding of `this.onTick` is not needed because all React methods
     * are automatically bound before being mounted.
     */
    componentDidMount: function() {

    },

    componentWillUnmount: function() {

    },



    componentStyle: {
        placeholder: {}
    },

    render: function() {
        return (
            <Surface
                width={700}
                height={700}
                style={{cursor: 'pointer'}}>
                {this.renderGraphic(this.state.degrees)}
            </Surface>
        );
    },

    onClick: function(){
        alert('click!');
    },

    renderGraphic: function() {

        return (
            <Group>
                <Group x={210} y={135}>

                    <Shape fill="#7BC7BA" d={BG_PATH} />

                    <Shape fill="#D97B76" d={RED_DOT_PATH} />
                    <Shape fill="#DBBB79" d={YELLOW_DOT_PATH} />
                    <Shape fill="#A6BD8A" d={GREEN_DOT_PATH} />

                    <Group x={55} y={29} onClick={this.onClick} >
                        <Shape fill="#D97B76" d={TRI} />
                    </Group>

                </Group>
            </Group>
        );
    }

});


var BORDER_PATH = "M3.00191459,4 C1.34400294,4 0,5.34785514 0,7.00550479 L0,220.994495 C0,222.65439 1.34239483,224 3.00191459,224 L276.998085,224 C278.655997,224 280,222.652145 280,220.994495 L280,7.00550479 C280,5.34561033 278.657605,4 276.998085,4 L3.00191459,4 Z M3.00191459,4";

var BG_PATH = "M3.00191459,1 C1.34400294,1 0,2.34785514 0,4.00550479 L0,217.994495 C0,219.65439 1.34239483,221 3.00191459,221 L276.998085,221 C278.655997,221 280,219.652145 280,217.994495 L280,4.00550479 C280,2.34561033 278.657605,1 276.998085,1 L3.00191459,1 Z M3.00191459,1";

var TRI = "M30 0 L15 40 L45 40 Z";


var BAR_PATH = "M3.00191459,0 C1.34400294,0 0,1.34559019 0,3.00878799 L0,21 C0,21 0,21 0,21 L280,21 C280,21 280,21 280,21 L280,3.00878799 C280,1.34708027 278.657605,0 276.998085,0 L3.00191459,0 Z M3.00191459,0";

var RED_DOT_PATH = "M12.5,17 C16.0898511,17 19,14.0898511 19,10.5 C19,6.91014895 16.0898511,4 12.5,4 C8.91014895,4 6,6.91014895 6,10.5 C6,14.0898511 8.91014895,17 12.5,17 Z M12.5,17";
var YELLOW_DOT_PATH = "M31.5,17 C35.0898511,17 38,14.0898511 38,10.5 C38,6.91014895 35.0898511,4 31.5,4 C27.9101489,4 25,6.91014895 25,10.5 C25,14.0898511 27.9101489,17 31.5,17 Z M31.5,17";
var GREEN_DOT_PATH = "M50.5,17 C54.0898511,17 57,14.0898511 57,10.5 C57,6.91014895 54.0898511,4 50.5,4 C46.9101489,4 44,6.91014895 44,10.5 C44,14.0898511 46.9101489,17 50.5,17 Z M50.5,17";
var CENTER_DOT_PATH = "M84,105 C92.8365564,105 100,97.8365564 100,89 C100,80.1634436 92.8365564,73 84,73 C75.1634436,73 68,80.1634436 68,89 C68,97.8365564 75.1634436,105 84,105 Z M84,105";


module.exports = CanvaComponent;