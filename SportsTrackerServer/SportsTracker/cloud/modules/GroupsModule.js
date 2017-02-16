/**
 * Created by sabir on 12.07.16.
 */

var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var UsersModule = require('../modules/UsersModule');

var GroupsModule = {

    transformGroup: function(g){
        if (g == undefined){
            return undefined;
        }
        return {
            id: g.id,
            timestamp: (new Date(g.createdAt)).getTime(),
            name: g.get('name'),
            description: g.get('description'),
            organizationId: g.get('organizationId'),
            trainerId: g.get('trainerId')
        }
    },

    transformGroupUserLink: function(link){
        if (link == undefined){
            return undefined;
        }
        return {
            id: link.id,
            organizationId: link.get('organizationId'), //for helping with requests
            userId: link.get('userId'),
            groupId: link.get('groupId')
        }
    },

    loadGroupUserLinks: function(groupId, callback, shouldTransform){
        if (groupId == undefined){
            return;
        }
        var q = new Parse.Query('GroupUserLink');
        q.equalTo('groupId', groupId);
        q.limit(1000);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){
                    return self.transformGroupUserLink(r);
                });
            }
            callback(results);
        });
    },


    createGroup: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }
        if (data.name == undefined || data.name.trim() == ''){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        var Group = Parse.Object.extend('Group');
        var g = new Group();
        g.set('organizationId', data.organizationId);
        g.set('name', data.name);
        if (data.description != undefined){
            g.set('description', data.description);
        }
        var self = this;
        g.save(null, {useMasterKey: true}).then(function(savedGroup){
            success(self.transformGroup(savedGroup));
        });
    },

    updateGroup: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }


        var q = new Parse.Query('Group');
        var self = this;
        q.get(data.id, {
            success: function(g){
                for (var key in data){
                    if (key == 'id' || key == 'organizationId'){
                        continue;
                    }
                    if (data[key] == undefined){
                        g.unset(key);
                    }else {
                        g.set(key, data[key]);
                    }
                }
                g.save(null, {useMasterKey: true}).then(function(saveGroup){
                    success(self.transformGroup(saveGroup));
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'group is not found'});
            }
        });
    },

    deleteGroup: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        var id = data.id;
        if (id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('Group');
        q.get(id, {
            success: function(g){
                self.loadGroupUserLinks(id, function(links){
                    Parse.Object.destroyAll(links, {
                        useMasterKey: true,
                        success: function(){
                            g.destroy({
                                useMasterKey: true,
                                success: function(){
                                    success({groupId: data.id});
                                },
                                error: function(){
                                    error({code: ECR.UNKNOWN_ERROR.code, message: 'Error while destroying group'});
                                }
                            });
                        }
                    });
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'group is not found'});
            }
        });
    },

    loadGroupUserLink: function(groupId, userId, callback, shouldTransform){
        if (groupId == undefined || userId == undefined){
            return;
        }
        var q = new Parse.Query('GroupUserLink');
        q.equalTo('groupId', groupId);
        q.equalTo('userId', userId);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (results.length == 0){
                callback(undefined);
                return;
            }
            var link = results[0];
            if (shouldTransform == true){
                link = self.transformGroupUserLink(link);
            }
            callback(link);
        });
    },

    deleteUserFromGroup: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.groupId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'groupId is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var self = this;
        this.loadGroupUserLink(data.groupId, data.userId, function(link){
            if (link == undefined){
                success();
                return;
            }
            link.destroy({
                success: function(){
                    success();
                },
                error: function(){
                    error({code: ECR.UNKNOWN_ERROR.code, message: 'can not destroy link'});
                }
            });
        });
    },

    addUserToGroup: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.groupId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'groupId is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined // new for Redux'});
            return;
        }
        var self = this;
        this.loadGroupUserLink(data.groupId, data.userId, function(link){
            if (link != undefined){
                success(link);
                return;
            }
            var GroupUserLink = Parse.Object.extend('GroupUserLink');
            var lnk = new GroupUserLink();
            lnk.set('groupId', data.groupId);
            lnk.set('userId', data.userId);
            lnk.set('organizationId', data.organizationId);
            lnk.save(null, {useMasterKey: true}).then(function(savedLink){
                success(self.transformGroupUserLink(savedLink));
            });
        }, true);
    },

    loadGroupUsers: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.groupId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'groupId is not defined'});
            return;
        }
        var self = this;
        this.loadGroupUserLinks(data.groupId, function(links){
            var usersIds = links.map(function(l){return l.userId});
            var q = new Parse.Query(Parse.User);
            q.limit(1000);
            q.addDescending('createdAt');
            q.containedIn('objectId', usersIds);
            q.find({useMasterKey: true}).then(function(users){
                if (users == undefined){
                    users = [];
                }
                users = users.map(function(u){return UsersModule.transformUser(u)});
                success(users);
            });
        }, true);
    },

    loadOrganizationGroups: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }
        var q = new Parse.Query('Group');
        var self = this;
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('organizationId', data.organizationId);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformGroup(r)});
            success(results);
        });
    },

    loadTrainerGroups: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.trainerId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'trainerId is not defined'});
            return;
        }
        var self = this;
        console.log('loading user with id = ' + data.trainerId);
        UsersModule.loadUser(data.trainerId, function(trainer){
            console.log("trainer loaded: " + JSON.stringify(trainer));
            var organizationId = trainer.organizationId;
            self.loadOrganizationGroups({organizationId: organizationId}, function(groups){
                success(groups);
            }, function(err){
                error(err);
            });
        }, function(err){
            error(err);
        }, true);
    },

    loadUserGroups: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var userId = data.userId;
        var self = this;
        var q2 = new Parse.Query('GroupUserLink');
        q2.equalTo('userId', userId);
        q2.limit(1000);
        q2.find({useMasterKey: true}).then(function(results){
            var links = results.map(function(r){return self.transformGroupUserLink(r)});
            var ids = links.map(function(link){return link.groupId});
            var q = new Parse.Query('Group');
            q.limit(1000);
            q.containedIn('objectId', ids);
            q.find(function(results){
                var arr = results.map(function(r){return self.transformGroup(r)});
                success(arr);
            });
        });
    }

};

module.exports = GroupsModule;