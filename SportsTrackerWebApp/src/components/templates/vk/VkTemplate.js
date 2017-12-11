/**
 * Created by sabir on 13.12.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var createReactClass = require('create-react-class');
var VkTemplate= createReactClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            logo: 'assets/images/sport_logo.png',
            //companyName: 'Sport Tracker'
            companyName: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading
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

        }
    },

    render: function(){
        var avatar = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRZQpnK3MkA60LqFsxhcwnjag8qjJ7eeFked-7w77-oLt2HfHXQrg';

        return (
            <div style={this.componentStyle.placeholder} className={'vk_template'} >

                <div className={'header_placeholder'} >

                    <div className={'template_header'} >

                        <div className={'logo_placeholder'} >

                            <img src={this.props.logo} />

                            {this.props.companyName == undefined ? null :
                                <div className={'logo_slogan'} >
                                    {this.props.companyName}
                                </div>
                            }

                        </div>

                        <div className={'current_user_placeholder'} >

                            <div className={'current_user_name'} >
                                Audrey Tauto
                            </div>

                            <div style={{backgroundImage: 'url("' + avatar + '")'}} className={'user_avatar'} ></div>

                        </div>

                    </div>


                </div>

            </div>
        );
    }

});

module.exports = VkTemplate;