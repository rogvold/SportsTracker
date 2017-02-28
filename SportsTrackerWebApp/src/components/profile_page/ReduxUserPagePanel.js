/**
 * Created by sabir on 21.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import TrainingsCalendarPanel from '../new_trainings/panels/TrainingsCalendarPanel.js'
import TrainingsPanel from '../new_trainings/panels/TrainingsPanel.js'

import BallPreloader from '../preloader/BallPreloader.js'

import UpdateUserReduxWrapper from '../profile/user/UpdateUserReduxWrapper.js'

class ReduxUserPagePanel extends React.Component {

    static defaultProps = {
        userId: undefined,
        // defaultAvatar: 'http://app.flytrack.net/assets/images/empty_ava_pilot.jpg'
        defaultAvatar: 'assets/images/empty_ava.png',
        canEdit: false
    }

    static propTypes = {
        usersMap: PropTypes.object,
        organization: PropTypes.object,
        currentUser: PropTypes.object
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    isMe = () => {
        if (this.props.currentUser == undefined){
            return false;
        }
        let currentUserId = this.props.currentUser.id;
        return (this.props.userId == currentUserId);
    }

    render = () => {
        let isMe = this.isMe();
        let {usersMap, userId, defaultAvatar, currentUser, canEdit} = this.props;
        console.log('ReduxUserPagePanel: usersMap, userId, defaultAvatar, currentUser, canEdit = ', usersMap, userId, defaultAvatar, currentUser, canEdit);
        console.log('ReduxUserPagePanel: usersMap = ', usersMap);

        if (userId == undefined && currentUser != undefined){
            userId = currentUser.id;
        }

        let user = usersMap[userId];
        let avatar = (user == undefined || user.avatar == undefined) ? defaultAvatar : user.avatar;
        var org = this.props.organization;
        //if (org == undefined){
        //    org = {};
        //}
        if (user == undefined){
            return null;
        }

        var role = user.userRole;
        let canEditProfile = (isMe == true || currentUser.userRole == 'admin');
        if (canEdit == false){
            canEditProfile = false;
        }

        return (
            <div className={'user_home_page'} >

                <div className={'left_part'} >
                    <div className={'avatar_section'} >
                        <div className={'avatar_placeholder'} >
                            <img src={avatar} />
                        </div>

                        {canEditProfile == false ? null :
                            <div className={'edit_user_button_placeholder'} >
                                <UpdateUserReduxWrapper userId={userId} >
                                    <div className={'update_profile_button'} >
                                        Редактировать
                                    </div>
                                </UpdateUserReduxWrapper>
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
                            {org &&
                                <div className={'detail_row'} >
                                    <div className={'detail_name'} >
                                        Школа
                                    </div>
                                    <div className={'detail_value'} >
                                        {org.name}
                                    </div>
                                </div>
                            }


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
                                    {org && <TrainingsCalendarPanel className={''} />}
                                </div>

                            </div>
                        }

                        {(org == undefined || role != 'user') ? null :
                            <div className={'photos_panel'} >

                                <div className="photos_header" style={{fontSize: 19}} >
                                    Мои тренировки
                                </div>

                                <div className={'photos_list_placeholder'} >
                                     <TrainingsPanel userId={userId} />
                                </div>

                            </div>
                        }


                    </div>

                    <div className={'sessions_placeholder'} >

                    </div>

                </div>


                {this.props.loading == false ? null :
                    <BallPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        organization: state.organization.organization,
        loading: state.organization.loading || state.users.loading,
        currentUser: state.users.currentUser,
        usersMap: state.users.usersMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        }
    }
}

ReduxUserPagePanel = connect(mapStateToProps, mapDispatchToProps)(ReduxUserPagePanel)

export default ReduxUserPagePanel