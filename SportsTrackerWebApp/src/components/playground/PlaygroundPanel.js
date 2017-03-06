/**
 * Created by sabir on 06.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var APIFunctionPanel = require('./panels/APIFunctionPanel');

var APIFactory = require('../../data/APIFactory');

var constants = require('../../constants');

var PlaygroundPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            tab: 'about',
            mode: 'playground'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    getTabsSwitcher: function(newTabName){
        //auth, profile, task, interval
        var tab = this.state.tab;
        return (
            <div className="tabs_placeholder" >

                <div className={'tab ' + (tab == 'about' ? 'active' : '')} onClick={this.setState.bind(this, {tab: 'about'})}  >
                    О системе
                </div>

                <div className={'tab ' + (tab == 'auth' ? 'active' : '')} onClick={this.setState.bind(this, {tab: 'auth'})}  >
                    Авторизация
                </div>
                <div className={'tab ' + (tab == 'groups' ? 'active' : '') }  onClick={this.setState.bind(this, {tab: 'groups'})}  >
                    Группы
                </div>
                <div className={'tab ' + (tab == 'fields' ? 'active' : '') }  onClick={this.setState.bind(this, {tab: 'fields'})}  >
                    Поля
                </div>
                <div className={'tab ' + (tab == 'trainings' ? 'active' : '') }  onClick={this.setState.bind(this, {tab: 'trainings'})}  >
                    Тренировки
                </div>

                <div className={'tab ' + (tab == 'shots' ? 'active' : '') }  onClick={this.setState.bind(this, {tab: 'shots'})}  >
                    Удары
                </div>

                <div className={'tab ' + (tab == 'points' ? 'active' : '') }  onClick={this.setState.bind(this, {tab: 'points'})}  >
                    Данные
                </div>
            </div>
        );
    },

    getModesSwitcher: function(){
        var mode = this.state.mode;
        return (
            <div className="modes_placeholder" >
                <div className={'mode ' + (mode == 'playground' ? 'active' : '')} onClick={this.setState.bind(this, {mode: 'playground'})}  >
                    Play with API
                </div>
                <div className={'mode ' + (mode == 'docs' ? 'active' : '') }  onClick={this.setState.bind(this, {mode: 'docs'})}  >
                    Docs
                </div>
            </div>
        );
    },

    render: function () {
        var defaultHeaders = APIFactory.DEFAULT_HEADERS;
        var tab = this.state.tab;
        var mode = this.state.mode;

        return (
            <div style={this.componentStyle.placeholder} className="api_playground_panel" >

                <div className={'sidebar'} >
                    {this.getTabsSwitcher()}
                </div>

                <div className={'content'} >

                    <div style={ (tab != 'about' ? {display: 'none'} : {})} >

                        <div className="api_functionality_description" >
                            <h2>
                                О системе
                            </h2>
                            <p>
                                Данные всех запросов -  в JSON формате.

                            </p>

                            <p>
                                Все запросы идут через протокол <b>HTTPS</b>, на домен {' '}
                                <b><u>{constants.SERVER_DOMAIN}</u></b> .
                            </p>

                            <h2>
                                Заголовки (headers)
                            </h2>

                            <p>
                                Все запросы должны иметь три заголовка (headers):
                                <ul>
                                    <li>
                                        <b>Content-Type</b>: <code>application/json</code>
                                    </li>
                                    <li>
                                        <b>client_id</b>: <code>{constants.PARSE_APP_ID}</code>
                                    </li>
                                    <li>
                                        <b>client_secret</b>: <code>{constants.PARSE_REST_API_KEY}</code>
                                    </li>
                                </ul>
                                Для всех последующих запросов вы должны передавать в
                                заголовке запроса параметр <b>access_token</b> {' '}
                                которые вы получили методом <b>login</b>.
                            </p>

                        </div>

                    </div>


                    <div style={ (tab != 'auth' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >

                            <h2>
                                Авторизация
                            </h2>

                            <p>
                                Для авторизованных запросов вы должны получить access_token с помощью метода login.

                            </p>

                            <h3>
                                Формат
                            </h3>

                            <p>
                                Ниже приведен пример выдачи метода <b>login</b>:
                            </p>

                            <pre className="json_output" >

                                <code dangerouslySetInnerHTML={{__html: JSON.stringify(
                                    {
                                        "result": {
                                            "id": "1RfAOiZoNo",
                                            "timestamp": 1468381921391,
                                            "userRole": "admin",
                                            "email": "sha-sabir@yandex.ru",
                                            "firstName": "Сабир",
                                            "lastName": "Шайхлисламов",
                                            "phone": "+79854367304",
                                            "organizationId": "1d6rECiVmX",
                                            "birthdayTimestamp": null,
                                            "sessionToken": "r:84518826d6e747dc142dddf09114bb52"
                                        }
                                    }
                                , null, '\t' )  }}  />

                            </pre>

                            <p>
                                Используйте <b>sessionToken</b> как <b>access_token</b> в заголовках авторизованных запросов.
                            </p>

                        </div>


                        <APIFunctionPanel name={APIFactory.SIGN_IN.name} description={APIFactory.SIGN_IN.description}
                                          parameters={APIFactory.SIGN_IN.parameters} headers={defaultHeaders.concat(APIFactory.SIGN_IN.headers)}
                        />

                        <APIFunctionPanel name={APIFactory.TOKEN.name} description={APIFactory.TOKEN.description}
                                          parameters={APIFactory.TOKEN.parameters} headers={defaultHeaders.concat(APIFactory.TOKEN.headers)}
                        />


                    </div>


                    <div style={ (tab != 'groups' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >

                            <h2>
                                Группы
                            </h2>

                            <p>

                            </p>

                        </div>

                        <APIFunctionPanel name={APIFactory.GET_TRAINER_GROUPS.name} description={APIFactory.GET_TRAINER_GROUPS.description}
                                          parameters={APIFactory.GET_TRAINER_GROUPS.parameters} headers={defaultHeaders.concat(APIFactory.GET_TRAINER_GROUPS.headers)}
                        />

                        <APIFunctionPanel name={APIFactory.GET_GROUP_USERS.name} description={APIFactory.GET_GROUP_USERS.description}
                                          parameters={APIFactory.GET_GROUP_USERS.parameters} headers={defaultHeaders.concat(APIFactory.GET_GROUP_USERS.headers)}
                        />

                    </div>


                    <div style={ (tab != 'fields' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >

                            <h2>
                                Поля
                            </h2>

                            <p>

                            </p>

                        </div>

                        <APIFunctionPanel name={APIFactory.LOAD_TRAINER_FIELDS.name} description={APIFactory.LOAD_TRAINER_FIELDS.description}
                                          parameters={APIFactory.LOAD_TRAINER_FIELDS.parameters} headers={defaultHeaders.concat(APIFactory.LOAD_TRAINER_FIELDS.headers)}
                        />


                    </div>

                    <div style={ (tab != 'trainings' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >
                            <h2>
                                Тренировки
                            </h2>

                            <p>

                            </p>
                        </div>


                        <APIFunctionPanel name={APIFactory.CREATE_TRAINING.name} description={APIFactory.CREATE_TRAINING.description}
                                          parameters={APIFactory.CREATE_TRAINING.parameters} headers={defaultHeaders.concat(APIFactory.CREATE_TRAINING.headers)}
                        />

                        <APIFunctionPanel name={APIFactory.FINISH_TRAINING.name} description={APIFactory.FINISH_TRAINING.description}
                                          parameters={APIFactory.FINISH_TRAINING.parameters} headers={defaultHeaders.concat(APIFactory.FINISH_TRAINING.headers)}
                        />

                    </div>

                    <div style={ (tab != 'shots' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >
                            <h2>
                                Удары по воротам
                            </h2>

                            <p>

                            </p>
                        </div>


                        <APIFunctionPanel name={APIFactory.CREATE_SHOT.name} description={APIFactory.CREATE_SHOT.description}
                                          parameters={APIFactory.CREATE_SHOT.parameters} headers={defaultHeaders.concat(APIFactory.CREATE_SHOT.headers)}
                        />

                        <APIFunctionPanel name={APIFactory.GET_TRAINING_SHOTS.name} description={APIFactory.GET_TRAINING_SHOTS.description}
                                          parameters={APIFactory.GET_TRAINING_SHOTS.parameters} headers={defaultHeaders.concat(APIFactory.GET_TRAINING_SHOTS.headers)}
                        />

                    </div>


                    <div style={ (tab != 'points' ? {display: 'none'} : {})} >

                        <div className={'api_functionality_description'} >
                            <h2>
                                Данные
                            </h2>

                            <p>
                                Используйте метод <b>saveUsersPoints</b>. Данный метод требует авторизации.
                                Передайте необходимые заголовки.
                            </p>
                            <p>
                                Формат данных следующий:
                            </p>

                            <pre className="json_output" >

                                <code dangerouslySetInnerHTML={{__html: JSON.stringify(
                                    [
                                        {"userId": "Go04d5cLvM","trainingId":"iIxABaSiF6", "t": [0, 0.1, 0.2], "x":[9.1,9.2,9.3], "y": [1,2,3], "step": [1,2,3]},
                                        {"userId": "wretwrtwet","trainingId":"iIxABaSiF6", "t": [0, 0.1, 0.2], "x":[2.1,7.2,10.3], "y": [0.4,6.7,3], "step": [1,2,3]}
                                    ]
                                    , null, '\t' )  }}  />
                            </pre>

                        </div>


                        {/*<APIFunctionPanel name={APIFactory.SAVE_USERS_POINTS.name} description={APIFactory.SAVE_USERS_POINTS.description}*/}
                                          {/*parameters={APIFactory.SAVE_USERS_POINTS.parameters} headers={defaultHeaders.concat(APIFactory.SAVE_USERS_POINTS.headers)}*/}
                        {/*/>*/}


                    </div>

                </div>



            </div>
        );
    }

});

module.exports = PlaygroundPanel;