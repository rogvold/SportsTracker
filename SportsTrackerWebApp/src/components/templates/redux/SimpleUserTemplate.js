/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/UsersActions.js';

import LogoutWrapper from '../../auth/buttons/LogoutWrapper.js';

import {browserHistory, useRouterHistory, Link} from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import CommonHelper from '../../../helpers/CommonHelper.js'

class SimpleUserTemplate extends React.Component {

    static defaultProps = {
        logo: 'assets/images/sport_logo.png',
        companyName: undefined,

        showCloseButton: true,

        active: 'index'

    }

    static propTypes = {
        loading: PropTypes.bool,
        currentUser: PropTypes.object,
        companyName: PropTypes.string,

        content: PropTypes.element
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

    getHeaderLinks = () => {
        var role = this.props.currentUser.userRole;
        if (role == 'admin'){
            return [
                {
                    name: 'index',
                    displayName: 'Календарь',
                    icon: '',
                    url: '/'
                },
                {
                    name: 'users',
                    displayName: 'Игроки',
                    icon: '',
                    url: '/users'
                },
                {
                    name: 'trainers',
                    displayName: 'Тренеры',
                    icon: '',
                    url: '/trainers'
                },
                {
                    name: 'teams',
                    displayName: 'Команды',
                    icon: '',
                    url: '/teams'
                },
                {
                    name: 'settings',
                    displayName: 'Настройки',
                    icon: '',
                    url: '/settings'
                },
                {
                    name: 'help',
                    displayName: 'Помощь',
                    icon: '',
                    url: '/help'
                }
            ]
        }
        if (role == 'trainer'){
            return [
                {
                    name: 'index',
                    displayName: 'Мои тренировки',
                    icon: '',
                    url: '/'
                },
                {
                    name: 'teams',
                    displayName: 'Команды',
                    icon: '',
                    url: '/teams'
                },
                {
                    name: 'users',
                    displayName: 'Игроки ',
                    icon: '',
                    url: '/users'
                },
                {
                    name: 'help',
                    displayName: 'Помощь',
                    icon: '',
                    url: '/help'
                }
            ]
        }
        return []
    }

    getNameString = () => {
        var user = this.props.currentUser;
        return (user.firstName + ' ' +user.lastName[0] + '.');
    }

    onLinkClick = (link) => {
        console.log('on link click occured: link = ', link);
        CommonHelper.forceTransitionTo('/#' + link.url);
        //history.pushState(null, null, link.url);
        //browserHistory.push('/#' + link.url);
        //appHistory.push(link.url);

    }

    render() {
        let user = this.props.currentUser;
        let isEmptyName = (user.firstName == undefined && user.lastName == undefined);
        let links = this.getHeaderLinks();
        let org = this.props.organization;
        let name = this.getNameString();
        if (user.userRole == 'admin'){
            if (org != undefined){
                name = org.name;
            }else {
                name = '';
            }

        }

        return (
            <div className={'simple_user_template'} >

                <div className={'header'} >

                    <div className={'header_inner'} >
                        <div className={'logo_placeholder'} >
                            <div className={'logo_img_placeholder'} >
                                <img src={this.props.logo} className={'logo'} />
                            </div>
                            <div className={'company_name'} >{this.props.companyName}</div>
                        </div>

                        {links.length == 0 ? null :
                            <div className={'center_links_placeholder'} >
                                {links.map((link, k) => {
                                    let isActive = (this.props.active == link.name);
                                    return (
                                        <Link to={link.url} className={'link_item ' + (isActive == true ? 'active' : '') } key={k}  >
                                            {link.displayName}
                                        </Link>
                                    )
                                })}
                            </div>
                        }

                        <div className={'right_placeholder'} >

                            {this.props.showCloseButton == false ? null :
                                <div className={'logout_placeholder'} >
                                    <LogoutWrapper >
                                        <div className={'logout'} >
                                            <i className={'icon log out'} ></i>
                                            выход
                                        </div>
                                    </LogoutWrapper>
                                </div>
                            }

                            <div className={'current_user_placeholder'} >
                                <div className={'name_placeholder'} >
                                    {isEmptyName == true ?
                                        <span><i className={'icon user'} ></i> {user.email}</span> :
                                        <span>{name}</span>
                                    }
                                </div>
                                <div className={'avatar_placeholder'} >
                                    <img src={user.avatar} className={'avatar'} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={'content'} >
                    {this.props.content}
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        organization: state.organization.organization,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        }
    }
}

SimpleUserTemplate = connect(mapStateToProps, mapDispatchToProps)(SimpleUserTemplate)

export default SimpleUserTemplate