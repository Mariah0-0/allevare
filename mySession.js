const session = require('express-session');
var mySession;

exports.setMySession = function (userid, email, username) {
    session.userid = userid;
    session.username = username;
    session.email = email;
    mySession = session;
    console.log("Session Created.");
};

exports.getMySession = function () {
    return mySession;
};

exports.deleteSession = function () {
    mySession = "";
    console.log("Session Deleted.");
}