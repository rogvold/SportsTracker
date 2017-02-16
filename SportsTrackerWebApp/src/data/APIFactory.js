/**
 * Created by sabir on 05.09.16.
 */

var constants = require('../constants');

var APIFactory = {

    self: this,

    // BASE: 'http://api.parse.com/1/functions/',
    BASE: 'https://sportstrackerparse.sabir.pro/parse/functions/',
    // BASE: 'https://sportstrackerparse.sabir.pro/v1/',

    DEFAULT_HEADERS: [{
        name: 'client_id',
        value: constants.PARSE_APP_ID
    }, {
        // name: 'X-Parse-REST-client_secret',
        name: 'client_secret',
        value: constants.PARSE_REST_API_KEY
    },
        {
            name: 'Content-Type',
            value: 'application/json'
        }
    ],

    SIGN_IN: {
        name: 'login',
        description: 'login',
        requestType: 'GET',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email of user',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'password of user',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },



    SIGN_UP: {
        name: 'signup',
        description: 'sign up',
        requestType: 'POST',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email of user',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'password of user',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    LOG_OUT: {
        name: 'logout',
        description: 'This method revokes the sessionToken',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: []
    },

    UPDATE_PROFILE: {
        name: 'updateProfile',
        description: 'update user profile',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'firstName',
            description: 'First name',
            isRequired: false,
            paramType: 'string'
        }, {
            name: 'lastName',
            description: 'Last name',
            isRequired: false,
            paramType: 'string'
        }, {
            name: 'avatar',
            description: 'the URL of user avatar',
            idRequires: 'false',
            paramType: 'string'
        }]
    },

    GET_PROFILE: {
        name: 'getProfile',
        description: 'get user profile information',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: []
    },

    GET_TRAINER_GROUPS: {
        name: 'getTrainerGroups',
        description: 'получение списка групп тренера',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'trainerId',
            description: 'ID тренера',
            isRequired: false,
            paramType: 'string'
        }]
    },

    GET_GROUP_USERS: {
        name: 'getGroupUsers',
        description: 'получения пользователей внутри группы',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'groupId',
            description: 'ID группы',
            isRequired: false,
            paramType: 'string'
        }
        ]
    },

    LOAD_TRAINER_FIELDS: {
        name: 'loadTrainerFields',
        description: 'загрузка списка футбольных полей',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'trainerId',
            description: 'ID тренера',
            isRequired: false,
            paramType: 'string'
        }
        ]
    },

    CREATE_TRAINING: {
        name: 'createTraining',
        description: 'cоздание тренировки',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'trainerId',
            description: 'ID тренера',
            isRequired: false,
            paramType: 'string'
        }, {
            name: 'fieldId',
            description: 'ID поля',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'startTimestamp',
                description: 'UNIX таймстемп начала тренировки (в миллисекундах)',
                isRequired: true,
                paramType: 'number'
            }
        ]
    },

    FINISH_TRAINING: {
        name: 'finishTraining',
        description: 'завершение тренировки',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'id',
            description: 'ID тренировки',
            isRequired: false,
            paramType: 'string'
        }, {
            name: 'endTimestamp',
            description: 'UNIX таймстемп конца тренировки (в миллисекундах)',
            isRequired: true,
            paramType: 'number'
        }
        ]
    },

    SAVE_USERS_POINTS: {
        name: 'saveUsersPoints',
        description: 'сохранение координат нескольких пользователей',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: []
    },


    CREATE_TASK: {
        name: 'createTask',
        description: 'create task',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'name',
            description: 'name of task',
            isRequired: true,
            paramType: 'string'
        },

            {
                name: 'serviceId',
                description: 'The id of the service of the task. Please use "getServices" (on the "Services" tab) method to get the list of available services. ',
                isRequired: true,
                paramType: 'string'
            },
            {
                name: 'serviceUserId',
                description: 'The id of the user of the service that you use.',
                isRequired: false,
                paramType: 'string'
            },

            {
                name: 'serviceTaskId',
                description: 'The id of the task of the service.',
                isRequired: false,
                paramType: 'string'
            },

            {
                name: 'description',
                description: 'description of task',
                isRequired: false,
                paramType: 'string'
            }

        ]
    },

    UPDATE_TASK: {
        name: 'updateTask',
        description: 'update existing task',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'id',
            description: 'id of the task you want to update',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'name',
                description: 'new name of task',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'description',
                description: 'new description of task',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'serviceId',
                description: 'The id of the service of the task. Please use "getServices" (on the "Services" tab) method to get the list of available services. ',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'serviceUserId',
                description: 'The id of the user of the service that you use.',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'serviceTaskId',
                description: 'The id of the task of the service.',
                isRequired: false,
                paramType: 'string'
            }
        ]
    },

    DELETE_TASK: {
        name: 'deleteTask',
        description: 'delete existing task',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'id',
            description: 'id of the task you want to delete',
            isRequired: true,
            paramType: 'string'
        }
        ]
    },

    LOAD_USER_TASKS: {
        name: 'getTasks',
        description: 'returns list of user tasks',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: []
    },

    CREATE_INTERVAL: {
        name: 'createInterval',
        description: 'creates interval of the task',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'taskId',
            isRequired: true,
            paramType: 'string',
            description: 'id of the task'
        }, {
            name: 'start',
            isRequired: true,
            paramType: 'number',
            description: 'UNIX timestamp of start (in milliseconds)'
        }, {
            name: 'duration',
            isRequired: true,
            paramType: 'number',
            description: 'duration of the interval (in milliseconds)'
        }]
    },

    UPDATE_INTERVAL: {
        name: 'updateInterval',
        description: 'updates existing interval',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'id',
            isRequired: true,
            paramType: 'string',
            description: 'id of the interval'
        }, {
            name: 'start',
            isRequired: false,
            paramType: 'number',
            description: 'new UNIX timestamp of start (in milliseconds)'
        }, {
            name: 'duration',
            isRequired: false,
            paramType: 'number',
            description: 'new duration of the interval (in milliseconds)'
        }]
    },

    DELETE_INTERVAL: {
        name: 'deleteInterval',
        description: 'deletes existing interval',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'id',
            isRequired: true,
            paramType: 'string',
            description: 'id of the interval'
        }]
    },

    LOAD_TASK_INTERVALS: {
        name: 'getIntervals',
        description: 'returns list of task intervals ordered by start',
        requestType: 'POST',
        headers: [{name: 'access_token'}],
        parameters: [{
            name: 'taskId',
            isRequired: true,
            paramType: 'string',
            description: 'task id'
        }]
    },

    GET_SERVICES: {
        name: 'getServices',
        description: 'returns list of available services that are compatible with TimeFlip',
        requestType: 'POST',
        headers: [],
        parameters: []
    }


};

module.exports = APIFactory;