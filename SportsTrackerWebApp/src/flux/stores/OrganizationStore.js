/**
 * Created by sabir on 12.07.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var OrganizationStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.organization = undefined;
        this.errorMessage = undefined;
        this.users = [];
        this.trainers = [];
        this.admin = undefined;

        this.fieldsMap = {};
        this.groupsMap = {};

        this.trainings = [];

        this.sessions = [];

        this.bindActions(

            constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION, this.startLoading,
            constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION_SUCCESS, this.regAdmin,
            constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION_FAIL, this.stopLoading,


            constants.LOAD_TOTAL_ORGANIZATION, this.startLoading,
            constants.LOAD_TOTAL_ORGANIZATION_SUCCESS, this.loadTotalOrgSuccess,
            constants.LOAD_TOTAL_ORGANIZATION_FAIL, this.stopLoading,

            constants.CREATE_ORGANIZATION, this.createOrg,
            constants.CREATE_ORGANIZATION_SUCCESS, this.createOrgSuccess,
            constants.CREATE_ORGANIZATION_FAIL, this.createOrgFail,

            constants.UPDATE_ORGANIZATION, this.startLoading,
            constants.UPDATE_ORGANIZATION_SUCCESS, this.updateOrgSuccess,
            constants.UPDATE_ORGANIZATION_FAIL, this.stopLoading,

            constants.LOAD_ORGANIZATION, this.startLoading,
            constants.LOAD_ORGANIZATION_SUCCESS, this.loadOrgSuccess,
            constants.LOAD_ORGANIZATION_FAIL, this.loadOrgFail,

            constants.LOAD_ORGANIZATION_USERS, this.startLoading,
            constants.LOAD_ORGANIZATION_USERS_SUCCESS, this.loadOrgUsersSuccess,
            constants.LOAD_ORGANIZATION_USERS_FAIL, this.stopLoading,

            constants.CREATE_ORGANIZATION_TRAINER, this.createOrgTrainer,
            constants.CREATE_ORGANIZATION_TRAINER_SUCCESS, this.createOrgTrainerSuccess,
            constants.CREATE_ORGANIZATION_TRAINER_FAIL, this.createOrgTrainerFail,

            constants.CREATE_ORGANIZATION_USER, this.startLoading,
            constants.CREATE_ORGANIZATION_USER_SUCCESS, this.createUserSuccess,
            constants.CREATE_ORGANIZATION_USER_FAIL, this.stopLoading,


            // fields
            constants.LOAD_ORGANIZATION_FIELDS, this.startLoading,
            constants.LOAD_ORGANIZATION_FIELDS_SUCCESS, this.loadFieldsSuccess,
            constants.LOAD_ORGANIZATION_FIELDS_FAIL, this.stopLoading,

            constants.CREATE_FIELD, this.startLoading,
            constants.CREATE_FIELD_SUCCESS, this.createFieldSuccess,
            constants.CREATE_FIELD_FAIL, this.stopLoading,

            constants.UPDATE_FIELD, this.startLoading,
            constants.UPDATE_FIELD_SUCCESS, this.updateFieldSuccess,
            constants.UPDATE_FIELD_FAIL, this.stopLoading,

            constants.DELETE_FIELD, this.startLoading,
            constants.DELETE_FIELD_SUCCESS, this.deleteFieldSuccess,
            constants.DELETE_FIELD_FAIL, this.stopLoading,

            //groups
            constants.LOAD_ORGANIZATION_GROUPS, this.startLoading,
            constants.LOAD_ORGANIZATION_GROUPS_SUCCESS, this.loadGroupsSuccess,
            constants.LOAD_ORGANIZATION_GROUPS_FAIL, this.stopLoading,

            constants.CREATE_ORGANIZATION_GROUP, this.startLoading,
            constants.CREATE_ORGANIZATION_GROUP_SUCCESS, this.createGroupSuccess,
            constants.CREATE_ORGANIZATION_GROUP_FAIL, this.stopLoading,

            constants.UPDATE_ORGANIZATION_GROUP, this.startLoading,
            constants.UPDATE_ORGANIZATION_GROUP_SUCCESS, this.createGroupSuccess,
            constants.UPDATE_ORGANIZATION_GROUP_FAIL, this.stopLoading,

            constants.DELETE_ORGANIZATION_GROUP, this.startLoading,
            constants.DELETE_ORGANIZATION_GROUP_SUCCESS, this.deleteGroupSuccess,
            constants.DELETE_ORGANIZATION_GROUP_FAIL, this.stopLoading,

            constants.LOAD_USER_GROUPS, this.startLoading,
            constants.LOAD_USER_GROUPS_SUCCESS, this.loadUserGroupsSuccess,
            constants.LOAD_USER_GROUPS_FAIL, this.stopLoading,

            constants.LOAD_GROUP_USERS, this.startLoading,
            constants.LOAD_GROUP_USERS_SUCCESS, this.loadGroupUsersSuccess,
            constants.LOAD_GROUP_USERS_FAIL, this.stopLoading,

            constants.ADD_USER_TO_GROUP, this.startLoading,
            constants.ADD_USER_TO_GROUP_SUCCESS, this.addUserToGroupSuccess,
            constants.ADD_USER_TO_GROUP_FAIL, this.stopLoading,

            constants.DETACH_USER_FROM_GROUP, this.startLoading,
            constants.DETACH_USER_FROM_GROUP_SUCCESS, this.detachUserFromGroupSuccess,
            constants.DETACH_USER_FROM_GROUP_FAIL, this.stopLoading,

            constants.UPDATE_USER_SUCCESS, this.onUpdateUserSuccess,

            constants.LOAD_ORGANIZATION_TRAININGS, this.startLoading,
            constants.LOAD_ORGANIZATION_TRAININGS_SUCCESS, this.loadOrganizationTrainingsSuccess,
            constants.LOAD_ORGANIZATION_TRAININGS_FAIL, this.stopLoading,

            constants.LOAD_SESSIONS, this.startLoading,
            constants.LOAD_SESSIONS_FAIL, this.stopLoading,
            constants.LOAD_SESSIONS_SUCCESS, this.sessionsLoaded

        );
    },

    startLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    stopLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    loadOrganizationTrainingsSuccess: function(payload){
        this.loading = false;
        this.trainings = payload.trainings;
        this.emit('change');
    },

    addUserToGroupSuccess: function(payload){
        this.loading = false;
        var userId = payload.userId;
        var groupId = payload.groupId;
        var usersIds = this.groupsMap[groupId].usersIds;
        if (usersIds == undefined){
            usersIds = [];
        }
        usersIds.push(userId);
        this.groupsMap[groupId].usersIds = usersIds;
        this.emit('change');
    },

    detachUserFromGroupSuccess: function(payload){
        this.loading = false;
        var userId = payload.userId;
        var groupId = payload.groupId;
        var usersIds = this.groupsMap[groupId].usersIds;
        usersIds = this.removeItemFromArray(userId, usersIds);
        this.groupsMap[groupId].usersIds = usersIds;
        this.emit('change');
    },

    loadUserGroupsSuccess: function(payload){
        this.loading = false;
        var groups = payload.groups;
        var userId = payload.userId;
        var groupsMap = this.groupsMap;
        for (var i in groups){
            var g = groups[i];
            if (groupsMap[g.id] == undefined){
                continue;
            }
            var usersIds = (groupsMap[g.id].usersIds == undefined) ? [] : groupsMap[g.id].usersIds;
            var f = false;
            for (var j in usersIds){
                if (usersIds[j] == userId){
                    f = true;
                }
            }
            if (f == false){
                usersIds.push(userId);
            }
            groupsMap[g.id].usersIds = usersIds;
        }
        this.groupsMap = groupsMap;
        this.emit('change');
    },

    loadGroupUsersSuccess: function(payload){
        this.loading = false;
        var users = payload.users;
        var groupId = payload.groupId;
        var usersIds = users.map(function(r){return r.id});
        this.groupsMap[groupId].usersIds = usersIds;
        this.emit('change');
    },

    regAdmin: function(payload){
        this.loading = false;
        this.organization = payload.organization;
        this.emit('change');
    },

    consumeGroups: function(groups){
        groups = (groups == undefined) ? [] : groups;
        for (var i in groups){
            this.groupsMap[groups[i].id] = groups[i];
        }
    },

    consumeFields: function(fields){
        fields = (fields == undefined) ? [] : fields;
        for (var i in fields){
            this.fieldsMap[fields[i].id] = fields[i];
        }
    },

    loadTotalOrgSuccess: function(payload){
        this.loading = false;
        var data = payload.data;
        this.organization = data.organization;
        this.users = data.users;
        this.trainers = data.trainers;
        this.admin = data.admin;
        this.consumeFields(data.fields);
        this.consumeGroups(data.groups);
        this.emit('change');
    },

    createGroupSuccess: function(payload){
        var group = payload.group;
        this.loading = false;
        this.groupsMap[group.id] = group;
        this.emit('change');
    },

    loadGroupsSuccess: function(payload){
        this.loading = false;
        var groups = payload.groups;
        for (var i in groups){
            var g = groups[i];
            this.groupsMap[g.id] = g;
        }
        this.emit('change');
    },

    deleteGroupSuccess: function(payload){
        this.loading = false;
        this.groupsMap[payload.groupId] = undefined;
        this.emit('change');
    },

    deleteFieldSuccess: function(payload){
        this.loading = false;
        //this.fieldsMap[payload.fieldId] = undefined;
        this.fieldsMap[payload.fieldId].deleted = true;
        this.emit('change');
    },

    createUserSuccess: function(payload){
        this.loading = false;
        this.users = [payload.user].concat(this.users);
        this.emit('change');
    },


    loadFieldsSuccess: function(payload){
        this.loading = false;
        var fields = payload.fields;
        for (var i in fields){
            this.fieldsMap[fields[i].id] = fields[i];
        }
        this.emit('change');
    },


    createFieldSuccess: function(payload){
        this.loading = false;
        this.fieldsMap[payload.field.id] = payload.field;
        this.emit('change');
    },


    updateFieldSuccess: function(payload){
        this.loading = false;
        this.fieldsMap[payload.field.id] = payload.field;
        this.emit('change');
    },

    createOrg: function(payload){
        this.loading = true;
        this.errorMessage = undefined;
        this.emit('change');
    },


    createOrgSuccess: function(payload){
        this.loading = false;
        this.organization = payload.organization;
        this.errorMessage = undefined;
        this.emit('change');
    },

    createOrgFail: function(payload){
        this.loading = false;
        this.organization = undefined;
        this.errorMessage = payload.message;
        this.emit('change');
    },


    updateOrgSuccess: function(payload){
        this.loading = false;
        this.organization = payload.organization;
        this.emit('change');
    },


    loadOrgSuccess: function(payload){
        this.loading = false;
        this.organization = payload.organization;
        this.emit('change');
    },

    loadOrgFail: function(payload){
        this.loading = false;
        this.organization = undefined;
        this.emit('change');
    },


    loadOrgUsersSuccess: function(payload){
        this.loading = false;
        this.users = payload.users;
        this.trainers = payload.trainers;
        this.emit('change');
    },

    createOrgTrainer: function(payload){
        this.loading = true;
        this.errorMessage = undefined;
        this.emit('change');
    },

    createOrgTrainerSuccess: function(payload){
        this.loading = false;
        var trainer = payload.trainer;
        this.trainers = [trainer].concat(this.trainers);
        this.errorMessage = undefined;
        this.emit('change');
    },

    createOrgTrainerFail: function(payload){
        this.loading = false;
        this.errorMessage = payload.errorMessage;
        this.emit('change');
    },

    getUserById: function(userId){
        var list = this.users.concat(this.trainers);
        for (var i in list){
            if (list[i].id == userId){
                return list[i];
            }
        }
        return undefined;
    },

    getGroup: function(groupId){
        if (groupId == undefined){
            return undefined;
        }
        var map = this.groupsMap;
        return map[groupId];
    },

    getGroups: function(){
        var arr = [];
        var map = this.groupsMap;
        for (var key in map){
            if (map[key] != undefined){
                arr.push(map[key]);
            }
        }
        arr.sort(function(g1, g2){
            return (g2.timestamp - g1.timestamp);
        });
        return arr;
    },

    getTrainer: function(trainerId){
        var list = this.trainers;
        for (var i in list){
            if (list[i].id == trainerId){
                return list[i];
            }
        }
        return undefined;
    },

    getUser: function(userId){
        var list = this.users;
        for (var i in list){
            if (list[i].id == userId){
                return list[i];
            }
        }
        return undefined;
    },

    getTrainerGroups: function(trainerId){
        if (trainerId == undefined){
            return [];
        }
        var arr = [];
        var map = this.groupsMap;
        for (var key in map){
            var g = map[key];
            if (g.trainerId == trainerId){
                arr.push(g);
            }
        }
        arr.sort(function(g1, g2){
            return g1.timestamp - g2.timestamp;
        });
        return arr;
    },

    getGroupTrainer: function(groupId){
        if (groupId == undefined){
            return undefined;
        }
        var group = this.groupsMap[groupId];
        if (group == undefined){
            return undefined;
        }
        var trainerId = group.trainerId;
        if (trainerId == undefined){
            return undefined;
        }
        return this.getTrainer(trainerId);
    },

    onUpdateUserSuccess: function(payload){
        var f = false;
        var u = payload.user;
        for (var i in this.users){
            if (this.users[i].id == u.id){
                f = true;
                this.users[i] = u;
            }
        }
        for (var i in this.trainers){
            if (this.trainers[i].id == u.id){
                f = true;
                this.trainers[i] = u;
            }
        }
        if (f == true){
            this.emit('change');
        }
    },

    isInArray: function(a, arr){
        if (arr == undefined || a == undefined){
            return false;
        }
        for (var i in arr){
            if (arr[i] == a){
                return true;
            }
        }
        return false;
    },

    removeItemFromArray: function(a, arr){
        var res = [];
        if (a == undefined || arr == undefined){
            return;
        }
        for (var i in arr){
            if (arr[i] != a){
                res.push(arr[i]);
            }
        }
        return res;
    },

    getGroupUsers: function(groupId){
        var map = this.groupsMap;
        var usersIds = (map[groupId].usersIds) == undefined ? [] : map[groupId].usersIds;
        var self = this;
        var users = usersIds.map(function(id, k){return self.getUser(id)});
        return users;
    },

    getUserGroups: function(userId){
        var map = this.groupsMap;
        var arr = [];
        for (var key in map){
            var usersIds = map[key].usersIds;
            if (this.isInArray(userId, usersIds) == true){
                arr.push(map[key]);
            }
        }
        return arr;
    },

    getField: function(fieldId){
        if (fieldId == undefined){
            return undefined;
        }
        return this.fieldsMap[fieldId];
    },

    getAllFields: function(){
        var arr = [];
        var map = this.fieldsMap;
        for (var key in map){
            if (map[key].deleted == true){
                continue;
            }
            arr.push(map[key]);
        }
        return arr;
    },

    getTrainings: function(){
        return this.trainings;
    },

    getTraining: function(id){
        console.log('getTraining: id = ', id);
        var trainings = this.trainings;
        console.log('trainings = ', trainings);
        for (var i in trainings){
            if (trainings[i].id == id){
                return trainings[i];
            }
        }
    },

    sessionsLoaded: function(payload){
        console.log('sessionsLoaded: payload = ', payload);
        this.loading = false;

        console.log('setting sessions = ', payload.list);

        this.sessions = payload.list;

        console.log('EMITTTTTTTT    ');
        this.emit('change');
        setTimeout(function(){
            this.emit("change");
        }.bind(this), 100);
    },

    getTrainingField: function(trainingId){
        var training = this.getTraining(trainingId);
        if (training == undefined){
            return undefined;
        }
        var fieldId = training.fieldId;
        if (fieldId == undefined){
            return undefined;
        }
        return this.fieldsMap[fieldId];
    },

    getSessions: function(){
        var sessions = this.sessions;
        console.log('getSessions: sessions = ', sessions);
        for (var i in sessions){
            var s = sessions[i].session;
            console.log('s = ', s)
            console.log('s.trainingId = ', s.trainingId)
            var tr = this.getTraining(s.trainingId);
            if (tr == undefined){
                console.log('tr == undefined');
                continue;
            }
            var fieldId = tr.fieldId;
            var field = (fieldId == undefined) ? undefined : this.fieldsMap[fieldId];
            sessions[i].startTimestamp = tr.startTimestamp;
            sessions[i].field = field;
            sessions[i].session.field = field;
        }
        console.log('getSessions: returning sessions = ', sessions);
        return sessions;
    }

});

module.exports = OrganizationStore;