/**
 * Created by sabir on 14.12.16.
 */

/**
 * Created by sabir on 22.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var UpdateUserWrapper = require('../profile/user/UpdateUserWrapper');

var TrainingsCalendar = require('../../components/trainings/calendar/TrainingsCalendar');

var UserPagePanel = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            organization: undefined,
            user: undefined,
            defaultAvatar: 'http://app.flytrack.net/assets/images/empty_ava_pilot.jpg'

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.user != undefined){
            return;
        }
        this.loadOrganization(nextProps.user);
    },

    componentDidMount: function () {
        this.loadOrganization(this.props.user);
    },

    loadOrganization: function(user){
        console.log('UserPagePanel: loadOrganization: user = ', user);
        if (user == undefined){
            return;
        }
        this.getFlux().actions.loadTotalOrganizationLazily(user.organizationId, function(d){
            console.log('loaded: d = ', d);
            this.getFlux().actions.loadOrganizationTrainings();
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        }
    },

    isMe: function(){
        if (this.props.user == undefined){
            return false;
        }
        var store = this.getFlux().store('UsersStore');
        return store.isMe(this.props.user.id);
    },

    render: function () {
        console.log('UserPagePanel: render: user = ', this.props.user);
        var user = this.props.user;

        if (user == undefined){
            return null;
        }
        var avatar = (user.avatar == undefined) ? this.props.defaultAvatar : user.avatar;
        var isMe = this.isMe();

        console.log('isMe = ', isMe);

        var org = this.props.organization;
        if (org == undefined){
            org = {};
        }
        var role = user.userRole;

        return (
            <div style={this.componentStyle.placeholder} className={'user_home_page'} >

                <div className={'left_part'} >
                    <div className={'avatar_section'} >
                        <div className={'avatar_placeholder'} >
                            <img src={avatar} />
                        </div>

                        {isMe == false ? null :
                            <div className={'edit_user_button_placeholder'} >
                                <UpdateUserWrapper
                                    style={{display: 'block'}}
                                    userId={user.id}>
                                    <div className={'update_profile_button'} >
                                        Редактировать
                                    </div>
                                </UpdateUserWrapper>
                            </div>
                        }

                    </div>

                    {true == true ? null :
                        <div className={'friends_panel_placeholder'} >
                            <div className={'friends_panel'} >
                                <div className={'friends_header'} >
                                    Игроки
                                </div>
                            </div>
                            <div>

                            </div>

                        </div>
                    }

                </div>

                <div className={'right_part'} >

                    <div className={'user_info_block'} >
                        <div className={'user_name'} >
                            {user.firstName} {user.lastName}
                        </div>

                        <div className={'user_details'} >

                            <div className={'detail_row'} >
                                <div className={'detail_name'} >
                                    Школа
                                </div>
                                <div className={'detail_value'} >
                                    {org.name}
                                </div>
                            </div>


                            <div className={'detail_row'} >
                                <div className={'detail_name'} >
                                    Дата регистрации
                                </div>
                                <div className={'detail_value'} >
                                    {moment(user.timestamp).format('DD MMMM YYYY')}
                                </div>
                            </div>

                            {user.aboutMe == undefined ? null :
                                <div className={'detail_row'} >
                                    <div className={'detail_name'} >
                                        Обо мне
                                    </div>
                                    <div className={'detail_value'} >
                                        <div dangerouslySetInnerHTML={{__html: user.aboutMe.replace(/\n/g, '<br/>')}} ></div>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                    <div className={'photos_panel_placeholder'}>

                        {role != 'trainer' ? null :
                            <div className={'photos_panel'} >

                                <div className="photos_header" style={{fontSize: 19}} >
                                    Календарь тренировок
                                </div>

                                <div className={'photos_list_placeholder'} >
                                    <TrainingsCalendar />
                                </div>

                            </div>
                        }

                        {(org == undefined || role != 'user') ? null :
                            <div className={'photos_panel'} >

                                <div className="photos_header" style={{fontSize: 19}} >
                                    Мои тренировки
                                </div>

                                <div className={'photos_list_placeholder'} >
                                    trainings list goes here
                                </div>

                            </div>
                        }


                    </div>

                    <div className={'sessions_placeholder'} >

                    </div>

                </div>



            </div>
        );
    }

});

module.exports = UserPagePanel;