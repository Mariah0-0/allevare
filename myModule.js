var mysql = require('mysql');
var fs = require('fs');
var con;

exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "allevare"
    });
    return con;
};

exports.authenticateUser = function (res, body, mySess, myCallback) {
    var userEmail = body.email;
    var userPassword = body.password;
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * from user WHERE email = '" + userEmail + "' AND password = '" + userPassword + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length > 0) {
                myCallback(res, mySess, result[0]);
            }
            else {
                var message = "<script>document.getElementById(\"l_error_message\").innerHTML = \"You have entered an incorrect email or password!\";</script> ";
                fs.readFile("login-page.html", function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end(message);
                });
            }
        });
    });
};

exports.addUser = function (res, body, mySess, myCallback) {
    var userUsername = body.username;
    var userEmail = body.email;
    var userPassword = body.password;
    var user;
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * from user WHERE username='" + userUsername + "' or email='" + userEmail + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length == 0) {
                var sql2 = "INSERT INTO user(username, email, password) VALUES(\"" + userUsername + "\", \"" + userEmail + "\", \"" + userPassword + "\")";
                con.query(sql2, function (err2, result2) {
                    if (err2) throw err2;
                });
                sql2 = "SELECT * FROM user where username=\""+userUsername+"\"";
                con.query(sql2, function (err2, result2) {
                    if (err2) throw err2;
                    user = result2[0];
                    var sql3 = "CREATE TABLE records_u" + user.userid + "(rDate date primary key, mood int, water int, screen int, stress int, sleep int, journal varchar(300))";
                    con.query(sql3, function (err3, result3) {
                        if (err3) throw err3;
                    });
                    var sql4 = "INSERT INTO records_u" + user.userid + " VALUES \
                        (date_sub(date(now()), interval 7 day), 5, 7, 5, 3, 5, ''), \
                        (date_sub(date(now()), interval 6 day), 2, 6, 4, 6, 8, ''), \
                        (date_sub(date(now()), interval 5 day), 1, 10, 8, 5, 7, ''), \
                        (date_sub(date(now()), interval 4 day), 3, 9, 10, 2, 4, ''), \
                        (date_sub(date(now()), interval 3 day), 4, 5, 9, 7, 3, 'Dear Journal, My day is going super bad. The game I''ve been playing recently, I''ve been stressed since I''ve been stuck on a level and can''t move up from it. It might seem a little silly to be so frustrated but I genuinely can''t help it.'), \
                        (date_sub(date(now()), interval 2 day), 2, 11, 3, 10, 7, 'Dear Diary, Today I''ve been super excited due to going to a movie with friends today. We watched The Super Mario Movie and it was amazing. I''m so lucky to have such good friends.'), \
                        (date_sub(date(now()), interval 1 day), 2, 3, 5, 9, 6, 'Dear Future Self, The last few days have been rough. Final Exams have been closing in and it''s been really stressful. I''m scared of letting down myself and it''s really getting to me.')";

                    con.query(sql4, function (err4, result4) {
                        if (err4) throw err4;
                    });
                    myCallback(res, mySess, user);
                });
            }
            else {
                if (result[0].email == userEmail) {
                    var message = "<script>\
                    wrapper.classList.add(\"active\");\
                    document.getElementById(\"r_error_message\").innerHTML = \"User by this email already exists!\";\
                    </script>";
                }
                else {
                    var message = "<script>\
                    wrapper.classList.add(\"active\");\
                    document.getElementById(\"r_error_message\").innerHTML = \"Username taken!\";\
                    </script>";
                }
                fs.readFile("login-page.html", function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end(message);
                });
            }
        });
    });
};

exports.preAuthentication = function (res, mySess, body) {
    if (body.userid != -1 && body.userid != "" && body.userid !== undefined) {
        mySess.setMySession(body.userid, body.email, body.username);
        s = mySess.getMySession();
        if (s.email != "" && s.email !== undefined) {
            res.write("<script>window.location.href=\"dashboard\"</script>");
        }
    }
}

exports.navigateToDashboard1 = function (res, mySess) {
    fs.readFile("dashboard.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>document.getElementById('nav_username').innerHTML = '" + mySess.username + "';</script>");
        return res.end();
    });
};

exports.navigateToDashboard2 = function (res, mySess) {
    fs.readFile("dashboard.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>document.getElementById('nav_username').innerHTML = '" + mySess.username + "';window.scrollBy(0, 500);</script>");
        return res.end();
    });
};

exports.addEntry = function (res, body, mySess, myCallback) {
    var mood = body.mood;
    var water = body.water;
    var screen = body.screen;
    var stress = body.stress;
    var sleep = body.sleep;
    var journal = body.journal.replace(/[!@#$%^&*()+=\[\]{}|\\?<>\/'"]/g, "\\$&");
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql2 = "insert into records_u"+mySess.userid+" values(date(now()), "+mood+", "+water+", "+screen+", "+stress+", "+sleep+", \'"+journal+"\')";
        con.query(sql2, function (err2, result2) {
            if (err2) throw err2;
            console.log("record added");
            myCallback(res,mySess);
        });
    });
}

exports.fetchRecords = function (mySess) {
    return new Promise((resolve, reject) => {
        con = this.connectToDB();
        con.connect(function (err) {
            if (err) {
                reject(err);
                return;
            }
            var sql = "SELECT concat(day(rDate),' ',substring(monthname(rDate),1,3)) as rDate, mood, water, screen, stress, sleep, journal FROM allevare.records_u" + mySess.userid;
            con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
}

exports.checkRecords = function (mySess) {
    return new Promise((resolve, reject) => {
        con = this.connectToDB();
        con.connect(function (err) {
            if (err) {
                reject(err);
                return;
            }
            var sql = "SELECT date(now()) as now,rDate FROM records_u" + mySess.userid;
            con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
}

exports.login = function (res) {
    fs.readFile("login-page.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.logout = function (res) {
    fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>window.scrollBy(0, 100);</script>");
        if (con != undefined && con != "") {
            con.destroy();
        }
        return res.end();
    });
};