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
    namecardHome: function(request, response){ 
        db.query(`SELECT * FROM namecard`, 
        function(error, result) {
            if(error){
                throw error;
            }
            var context = { doc : `./namecard/namecard.ejs`,
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
    namecardCreate : function(request,response) {
        var titleofcreate = 'Create';
        var context = { doc: `./namecard/namecardCreate.ejs`,
                        name: '',
                        gender:'',
                        age:'',
                        address:'',
                        kindOfDoc : 'C',
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class 
                    };
        request.app.render('index',context, function(err, html){
            response.end(html);
        });
    },
    namecardCreate_process : function(request,response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var nameb = qs.parse(body);
            db.query(`
                INSERT INTO namecard (name, gender, age, address)
                    VALUES(?,?,?,?)`,
                        [nameb.name, nameb.gender, nameb.age, nameb.address], function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/namecard`});
                        response.end();
                }
            );
        });
    },
    namecardList : function(request, response){
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM namecard`,
            function(error, result) {
                if(error) {
                    throw error;
                }
                var context ={doc:`./namecard/namecardList.ejs`,
                            loggined : authIsOwner(request, response),
                            id : request.session.login_id,
                            cls : request.session.class, 
                            results : result};
                            request.app.render('index',context, function(err,html){
                                response.end(html);
                            }
                        );
            });
    },
    namecardUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var planId = request.params.planId;

        db.query(`SELECT * FROM namecard where id = ${planId}`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./namecard/namecardCreate.ejs`,
                                name: result[0].name,
                                gender: result[0].gender,
                                age: result[0].age,
                                address: result[0].address,
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
    namecardUpdate_process: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var plan = qs.parse(body);
            planId = request.params.planId;
            db.query('UPDATE namecard SET name =?, gender=?, age=?, address=? WHERE id=?',
                [plan.name, plan.gender, plan.age, plan.address, planId], function(error, result){
                    response.writeHead(302, {Location: `/namecard`});
                    response.end();
                });
        });
    },
    namecardDelete_process: function(request, response) {
        var planId = request.params.planId;
        db.query('DELETE FROM namecard WHERE id= ?', [planId], function(error, result){
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/namecard`});
            response.end();
        });
    },
    search: function(request, response) {
        var context = { doc:`./namecard/namecardsearch.ejs`,
                        loggined : authIsOwner(request, response),
                        kind: '네임카드 검색화면',
                        listyn : 'N',
                        keyword : '',
                        id : request.session.login_id,
                        cls : request.session.class
                    };
        request.app.render('index', context, function(err, html){
            response.end(html);
        });
    },
    search_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var sear = qs.parse(body);
        db.query(`SELECT * FROM namecard where name like ?`,
                [`%${sear.keyword}%`], function(error, results){
                    if(error){
                        throw error;
                    }
                    var context = { doc:`./namecard/namecardsearch.ejs`,
                                    loggined : authIsOwner(request, response),
                                    kind: '검색화면',
                                    listyn : 'Y',
                                    id : request.session.login_id,
                                    cls : request.session.class, 
                                    bs : results
                                };
                    request.app.render('index', context, function(err, html){
                        response.end(html);
                    });
                }) 
        })
    },
}