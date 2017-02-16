/**
 * Created by sabir on 17.07.16.
 */
// var express = require('express');
// var app = express();
// app.use(express.bodyParser());

var crypto = require('crypto');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, X-Parse-Session-Token');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
        //res.status(200).send('OK');
    }
    else {
        next();
    }
};

// app.use(allowCrossDomain);
//
// app.post('/pusherAuth', function(req, res) {
//     //res.render('hello', { message: 'Congrats, you just set up your app!' });
//     var user = req.user;
//     //console.log('userId = ' + user.id);
//
//     var sessionToken = req.get('X-Parse-Session-Token');
//     var socket_id = req.body.socket_id;
//     var channel_name = req.body.channel_name;
//
//     var pusherAppKey = '3eed46933cb0fc3713a7';
//     var pusherAppSecret = 'bd4302b0235cbb6c1692';
//
//     var stringToSign = socket_id + ':' + channel_name;
//
//     var authToken = pusherAppKey + ':' + crypto.createHmac('sha256', pusherAppSecret).update(stringToSign).digest('hex');
//
//     res.status(200).send(JSON.stringify({auth: authToken}));
//
//     //var stringToSign = socket_id + ':' + channel_name;
//
//
//     //Parse.User.become(sessionToken).then(function (user) {
//     //    // The current user is now set to user.
//     //    var channel_data = {
//     //        user_id: user.id,
//     //        user_info: {
//     //            name: user.get('firstName') + ' ' + user.get('lastName'),
//     //            imageUrl: user.get('avatar')
//     //        }
//     //    };
//     //
//     //    res.status(200).send(JSON.stringify({auth: authToken, channel_data: JSON.stringify(channel_data)}));
//     //
//     //}, function (error) {
//     //
//     //});
//
// });
//
//
// app.listen();