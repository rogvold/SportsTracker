var ECR = require('cloud/helpers/ErrorCodesRegistry');

var OrganizationsModule = require('cloud/modules/OrganizationsModule');
var UsersModule = require('cloud/modules/UsersModule');
var FieldsModule = require('cloud/modules/FieldsModule');
var GroupsModule = require('cloud/modules/GroupsModule');
var TrainingsModule = require('cloud/modules/TrainingsModule');
var RealtimeTrainingsModule = require('cloud/modules/RealtimeTrainingsModule');

var crypto = require('crypto');

require('cloud/app.js');

//WEB

Parse.Cloud.define("testAPI", function(request, response) {
    var data = request.params.data;
    response.success(data);
});

//user
Parse.Cloud.define("loadUser", function(request, response) {
    var data = request.params.data;
    if (data == undefined || data.userId == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUser: data or userId is undefined'});
        return;
    }
    UsersModule.loadUser(data.userId, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    }, true);
});

Parse.Cloud.define("createUser", function(request, response) {
    var data = request.params.data;
    Parse.Cloud.useMasterKey();
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createUser: data is undefined'});
        return;
    }
    //todo: check permission
    UsersModule.createUser(data, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateUser", function(request, response) {
    var data = request.params.data;
    Parse.Cloud.useMasterKey()
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateUser: data is undefined'});
        return;
    }
    //todo: check permission
    UsersModule.updateUser(data, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    });
});

//organizations

Parse.Cloud.define("registerAdminAndOrganization", function(request, response) {
    var data = request.params.data;
    if (data == undefined || data.user == undefined || data.organization == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'registerAdminAndOrganization: incorrect input data'});
        return;
    }
    data.user.userRole = 'admin';
    UsersModule.createUser(data.user, function(admin){
        data.organization.adminId = admin.id;
        OrganizationsModule.createOrganization(data.organization, function(org){
            response.success({
                user: admin,
                organization: org
            });
        }, function(err){
            response.error(err);
        });
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadTotalOrganizationByAdminId", function(request, response) {
    var data = request.params.data;
    if (data == undefined || data.adminId == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadTotalOrganization: incorrect input data'});
        return;
    }
    var adminId = data.adminId;
    OrganizationsModule.loadOrganizationByAdminId(adminId, function(org){
        UsersModule.loadAllOrganizationUsers(org.id, function(d){
            GroupsModule.loadOrganizationGroups({organizationId: org.id}, function(groups){
                FieldsModule.loadOrganizationFields(org.id, function(fields){
                    UsersModule.loadUser(org.adminId, function(admin){
                        response.success({
                            organization: org,
                            users: d.users,
                            trainers: d.trainers,
                            groups: groups,
                            fields: fields,
                            admin: admin
                        });
                    }, function(err){
                        response.error(err);
                    }, true);
                });
            }, function(err){
                response.error(err);
            })
        });
    }, function(err){

    })

});

Parse.Cloud.define("updateOrganization", function(request, response) {
    var data = request.params.data;
    OrganizationsModule.updateOrganization(data, function(org){
        response.success(org);
    }, function(err){
        response.error(err);
    });
});

//fields

Parse.Cloud.define("createField", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createField: data is undefined'});
        return;
    }
    FieldsModule.createField(data, function(field){
        response.success(field);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateField", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateField: data is undefined'});
        return;
    }
    FieldsModule.updateField(data, function(field){
        response.success(field);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteField", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteField: data is undefined'});
        return;
    }
    FieldsModule.deleteField(data, function(field){
        response.success(field);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadOrganizationFields", function(request, response) {
    var data = request.params.data;
    if (data == undefined || data.organizationId == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadOrganizationFields: data or organizationId is undefined'});
        return;
    }
    FieldsModule.loadOrganizationFields(data.organizationId, function(field){
        response.success(field);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadTrainerFields", function(request, response) {
    var data = request.params.data;
    if (data == undefined || data.trainerId == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadTrainerFields: data or trainerId is undefined'});
        return;
    }
    FieldsModule.loadTrainerFields(data.trainerId, function(field){
        response.success(field);
    }, function(err){
        response.error(err);
    });
});

//groups

Parse.Cloud.define("getOrganizationGroups", function(request, response) {
    var data = request.params.data;
    GroupsModule.loadOrganizationGroups(data, function(groups){
        response.success(groups);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getTrainerGroups", function(request, response) {
    var data = request.params.data;
    GroupsModule.loadTrainerGroups(data, function(groups){
        response.success(groups);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadUserGroups", function(request, response) {
    var data = request.params.data;
    GroupsModule.loadUserGroups(data, function(groups){
        response.success(groups);
    }, function(err){
        response.error(err);
    });
});


Parse.Cloud.define("createGroup", function(request, response) {
    var data = request.params.data;
    GroupsModule.createGroup(data, function(group){
        response.success(group);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateGroup", function(request, response) {
    var data = request.params.data;
    GroupsModule.updateGroup(data, function(group){
        response.success(group);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("detachGroupFromTrainer", function(request, response) {
    var data = request.params.data;
    data.trainerId = undefined;
    GroupsModule.updateGroup(data, function(group){
        response.success(group);
    }, function(err){
        response.error(err);
    });
});



Parse.Cloud.define("deleteGroup", function(request, response) {
    var data = request.params.data;
    GroupsModule.deleteGroup(data, function(d){
        response.success(d);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getGroupUsers", function(request, response) {
    var data = request.params.data;
    GroupsModule.loadGroupUsers(data, function(users){
        response.success(users);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("addUserToGroup", function(request, response) {
    var data = request.params.data;
    GroupsModule.addUserToGroup(data, function(link){
        response.success(link);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteUserFromGroup", function(request, response) {
    var data = request.params.data;
    GroupsModule.deleteUserFromGroup(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

//trainings

Parse.Cloud.define("loadTrainerTrainings", function(request, response) {
    var data = request.params.data;
    TrainingsModule.loadTrainerTrainings(data, function(trainings){
        response.success(trainings);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadOrganizationTrainings", function(request, response) {
    var data = request.params.data;
    TrainingsModule.loadOrganizationTrainings(data, function(trainings){
        response.success(trainings);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createTraining", function(request, response) {
    var data = request.params.data;
    TrainingsModule.createTraining(data, function(training){
        response.success(training);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("finishTraining", function(request, response) {
    var data = request.params.data;
    TrainingsModule.finishTraining(data, function(training){
        response.success(training);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateTraining", function(request, response) {
    var data = request.params.data;
    TrainingsModule.updateTraining(data, function(training){
        response.success(training);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadTrainingSessions", function(request, response) {
    var data = request.params.data;
    TrainingsModule.loadTrainingSessions(data.trainingId, function(list){
        response.success(list);
    });
});

Parse.Cloud.define("savePoints", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'savePoints: data is not defined'});
        return;
    }
    if (data.trainingId == undefined || data.userId == undefined ||
        data.x == undefined || data.x.length == 0 ||
        data.y == undefined || data.y.length != data.x.length ||
        data.step == undefined || data.step.length != data.x.length ||
        data.t == undefined || data.t.length != data.x.length){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'savePoints: incorrect input data'});
        return;
    }

    var points = data.x.map(function(x, i){return {t: data.t[i], x: data.x[i], y: data.y[i], step: data.step[i]}});

    TrainingsModule.saveUserTrainingPoints(data.trainingId, data.userId, points, function(training){
        response.success();
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("saveUsersPoints", function(request, response) {
    //var data = request.params.data;
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'saveUsersPoints: data is not defined'});
        return;
    }

    RealtimeTrainingsModule.uploadPoints(data, function(sessions){
        response.success(sessions);
    });
});

Parse.Cloud.define('authorizePusherChannel', function (request, response) {
    var user = request.user;
    if (user == undefined) {
        response.error('User should be autenticated.');
        return;
    }

    var pusherAppKey = '3eed46933cb0fc3713a7';
    var pusherAppSecret = 'bd4302b0235cbb6c1692';
    var stringToSign = request.body.socket_id + ':' + request.body.channel_name;

    var channel_data = {
        user_id: user.id,
        user_info: {
            name: user.get('firstName') + ' ' + user.get('lastName'),
            imageUrl: user.get('avatar')
        }
    };

    var authToken = pusherAppKey + ':' + crypto.createHmac('sha256', pusherAppSecret).update(stringToSign).digest('hex');

    response.success({auth: authToken, channel_data: channel_data});
    //response.send({auth: authToken, channel_data: channel_data});
});