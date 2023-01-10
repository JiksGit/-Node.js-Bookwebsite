var db= require('./db.js');
var qs = require('querystring');
const { response } = require('express');

function authIsOwner(request, response) {
    if(request.session.is_logined) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    userHome: function(request, response){ 
        db.query(`SELECT * FROM person`, 
        function(error, result) {
            if(error){
                throw error;
            }
            var context = { doc : `./user/user.ejs`,
                            loggined : authIsOwner(request, response),
                            id : request.session.login_id,
                            cls : request.session.class, 
                            results : result
                        };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    },
    userCreate : function(request,response) {
        var titleofcreate = 'Create';
        var context = { doc: `./user/userCreate.ejs`,
                        loginid:'',
                        password:'',
                        name:'',
                        address:'',
                        tel: '',
                        birth: '',
                        grade: '',
                        class2: '',
                        kindOfDoc : 'C',
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class 
                    };
        request.app.render('index',context, function(err, html){
            response.end(html);
        });
    },
    userCreate_process : function(request,response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var user = qs.parse(body);
            db.query(`
                INSERT INTO person (loginid, password, name, address, tel, birth, class, grade) VALUES(?,?,?,?,?,?,?,?)`,
                        [user.loginid, user.password, user.name, user.address, user.tel, user.birth, user.class2, user.grade], 
                        function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/user`});
                        response.end();
                }
            );
        });
    },
    userList: function(request, response) {
        db.query(`SELECT * FROM person`,
        function(error, result) {
            if(error) {
                throw error;
            }
            var context ={doc:`./user/userList.ejs`,
                        loggined : authIsOwner(request, response),
                        cls: request.session.class,
                        id: request.session.login_id,
                        results : result};
                        request.app.render('index',context, function(err,html){
                            response.end(html);
                        }
                    );
        });
    },
    userUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var planId = request.params.planId;
        db.query(`SELECT * FROM person where id = ${planId}`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./user/userCreate.ejs`,
                                loginid:result[0].loginid,
                                password:result[0].password,
                                name:result[0].name,
                                address:result[0].address,
                                tel: result[0].tel,
                                birth: result[0].birth,
                                class2: result[0].class,
                                grade: result[0].grade,
                                pId : planId,
                                kindOfDoc : 'U',
                                loggined : authIsOwner(request, response),
                                id : request.session.login_id,
                                cls : request.session.class 
                            };
                            request.app.render('index', context, function(err, html){
                                response.end(html);
                            });
                });
    },
    userUpdate_process: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var user = qs.parse(body);
            planId = request.params.planId;
            db.query('UPDATE person SET loginid=?, password=?, name=?, address=?, tel=?, birth=?, class=?, grade=? WHERE id=?', 
            [user.loginid, user.password, user.name, user.address, user.tel, user.birth, user.class2, user.grade, planId], 
                    function(error, result){
                    response.writeHead(302, {Location: `/user`});
                    response.end();
                });
        });
    },
    userDelete_process: function(request, response) {
        var planId = request.params.planId;
        db.query('DELETE FROM person WHERE id= ?', [planId], function(error, result){
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/user`});
            response.end();
        });
    },

    passwordUpdate: function(request, response) {
        var loginId = request.params.id;
        db.query(`SELECT * FROM person where loginid = "${loginId}"`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./user/pwUpdate.ejs`,
                                loginid:result[0].loginid,
                                password:result[0].password,
                                name:result[0].name,
                                address:result[0].address,
                                tel: result[0].tel,
                                birth: result[0].birth,
                                class2: result[0].class2,
                                grade: result[0].grade,
                                lId : loginId,
                                loggined : authIsOwner(request, response),
                                id : request.session.login_id,
                                cls : request.session.class 
                            };
                            request.app.render('index', context, function(err, html){
                                response.end(html);
                            });
                });
    },
    passwordUpdate_process: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var user = qs.parse(body);
            loginId = request.params.lId;
            db.query('UPDATE person SET password=? WHERE loginid=?', 
            [user.password, loginId], 
                    function(error, result){
                    response.writeHead(302, {Location: `/`});
                    response.end();
                });
        });
    }
}

