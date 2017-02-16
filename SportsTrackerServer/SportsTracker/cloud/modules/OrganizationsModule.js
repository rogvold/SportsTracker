/**
 * Created by sabir on 05.07.16.
 */

var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var UsersModule = require('../modules/UsersModule');
var TrainingsModule = require('../modules/TrainingsModule');

var OrganizationsModule = {

    transformOrganization: function(org){
        if (org == undefined){
            return undefined;
        }
        return {
            id: org.id,
            name: org.get('name'),
            address: org.get('address'),
            adminId: org.get('adminId'),
            timestamp: new Date(org.createdAt).getTime()
        }
    },

    loadOrganization: function(organizationId, success, error){
        console.log('loadOrganization: organizationId = ' + organizationId);

        if (organizationId == undefined){
            console.log('oops organizationId is not defined');
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('Organization'));
        var self = this;

        q.containedIn('objectId', [organizationId]);

        q.find({useMasterKey: true}).then(
            function(orgs){
                console.log('loaded orgs: orgs = ' + JSON.stringify(orgs));
                if (orgs == undefined || orgs.length == 0){
                    error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organization with specified organizationId (' + organizationId + ') is not found'});
                }
                else {
                    success(self.transformOrganization(orgs[0]));
                }
                // success: function(org){
                //     console.log('organization loaded = ' + JSON.stringify(org));
                //     success(self.transformOrganization(org));
                // },
                // error: function(){
                //     error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organization with specified organizationId is not found'});
                // }
            },
            function(err){
                console.log('error occured: err = ' + JSON.stringify(err));
                error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organization with specified organizationId (' + organizationId + ') is not found'});
            }
        );


    },

    createOrganization: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        var adminId = data.adminId;
        if (adminId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'adminId is not defined'});
            return;
        }
        if (data.name == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        if (data.address == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'address is not defined'});
            return;
        }
        var self = this;
        var Organization = Parse.Object.extend('Organization');
        var org = new Organization();
        org.set('adminId', adminId);
        org.set('name', data.name);
        org.set('address', data.address);
        org.save(null, {useMasterKey: true}).then(function(savedOrg){
            success(self.transformOrganization(savedOrg));
        });
    },

    updateOrganization: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        var organizationId = data.organizationId;
        if (organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('Organization');
        q.get(organizationId, {
            success: function(org){
                for (var key in data){
                    if (key == 'adminId'){
                        continue;
                    }
                    org.set(key, data[key]);
                }
                org.save(null, {useMasterKey: true}).then(function(updatedOrg){
                    success(self.transformOrganization(updatedOrg));
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'organization is not found'});
            }
        });
    },

    loadOrganizationByAdminId: function(adminId, callback){
        var q = new Parse.Query('Organization');
        q.equalTo('adminId', adminId);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            callback(self.transformOrganization(results[0]));
        });
    }

};

module.exports = OrganizationsModule;