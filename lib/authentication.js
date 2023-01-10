var db = require('./db');
var qs= require('querystring');

function authIsOwner(request, response) {
    if(request.session.is_logined) {
        return true;
    }
    else {
        return false;
    }
}
module.exports = {  
    register : function(request,response) {
        var titleofcreate = 'Create';
        var context = { doc: `./register.ejs`,
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
    register_process : function(request,response) {
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

    login : function(request, response){
        var subdoc;
        if(authIsOwner(request, response) === true) {
            subdoc = '/book/book.ejs';
        }
        else {
            subdoc = 'login.ejs';
        }
        var context = {doc: subdoc,
                    loggined : authIsOwner(request, response),
                    id : request.session.login_id,
                    cls : request.session.class 
                };
        request.app.render('index', context, function(err, html) {
            response.end(html); 
        })
    },
    login_process : function(request, response) {
            var body = '';
            request.on('data', function(data){
                body = body + data;
            });
            request.on('end', function() {
                var post = qs.parse(body);
                db.query(`SELECT loginid, password, class FROM person WHERE loginid = ? and password = ?`,
                    [post.id, post.pw], function(error, result) {
                        if(error) {
                            throw error;
                        }
                        if(result[0] === undefined)
                            response.end('Who ?');
                        else
                        {
                            request.session.is_logined = true;
                            request.session.login_id = result[0].loginid;
                            request.session.class = result[0].class;
                            response.redirect('/');
                        }
                    });
            });
        //디비에서 확인, 세션 저장 후 리다이렉션 코드 작성
    },
    logout : function(request, response) {
        request.session.destroy(function(err) {
            response.redirect('/');
        });
    },
}