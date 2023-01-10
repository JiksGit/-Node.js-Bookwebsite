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

function dateOfEightDigit(){
    var today = new Date();
    var nowdate = String(today.getFullYear());
    var month ;
    var day ;
    if (today.getMonth() < 9)
        month = "0" + String(today.getMonth()+1);
    else
        month = String(today.getMonth()+1);
    if (today.getDate() < 10)
        day = "0" + String(today.getDate());
    else
        day = String(today.getDate());
    
    return nowdate + month + day;
}


module.exports = {
    calendarHome: function(request, response){ 
        db.query(`SELECT * FROM calendar`, 
        function(error, result) {
            if(error){
                throw error;
            }
            var context = { doc : `./calendar/calendar.ejs`,
                            loggined : authIsOwner(request, response),
                            cls: request.session.class,
                            id : request.session.login_id,
                            results : result
                        };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    },
    calendarCreate : function(request,response) {
        var titleofcreate = 'Create';
        var context = { doc: `./calendar/calendarCreate.ejs`,
                        title: '',
                        description:'',
                        kindOfDoc : 'C',
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class 
                    };
        request.app.render('index',context, function(err, html){
            response.end(html);
        });
    },
    calendarCreate_process : function(request,response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var cal = qs.parse(body);
            db.query(`
                INSERT INTO calendar (title, description, created, author_id)
                    VALUES( ?, ?, ?, 2)`,
                        [cal.title, cal.description, dateOfEightDigit()], function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/calendar`});
                        response.end();
                }
            );
        });
    },
    calendarList : function(request, response){
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM calendar`,
            function(error, result) {
                if(error) {
                    throw error;
                }
                var context ={doc:`./calendar/calendarList.ejs`,
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
    calendarUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var planId = request.params.planId;

        db.query(`SELECT * FROM calendar where id = ${planId}`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./calendar/calendarCreate.ejs`,
                                title: result[0].title,
                                description: result[0].description,
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
    calendarUpdate_process: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var plan = qs.parse(body);
            planId = request.params.planId;
            db.query('UPDATE calendar SET title =?, description=?, author_id=? WHERE id=?',
                [plan.title, plan.description, 2, planId], function(error, result){
                    response.writeHead(302, {Location: `/calendar`});
                    response.end();
                });
        });
    },
    calendarDelete_process: function(request, response) {
        var planId = request.params.planId;
        db.query('DELETE FROM calendar WHERE id= ?', [planId], function(error, result){
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/calendar`});
            response.end();
        });
    },

    cart : function(request, response) {
        db.query(`SELECT * FROM cart`,
            function(error, result) {
                if(error) {
                    throw error;
                }
                var context ={doc:`./cart.ejs`,
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
    purchase : function(request, response) {
        db.query(`SELECT * FROM purchase`,
            function(error, result) {
                if(error) {
                    throw error;
                }
                var context ={doc:`./purchase.ejs`,
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
    purchase_delete: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var purchase = qs.parse(body);
            purchaseid = request.params.purchaseid;
            db.query('UPDATE purchase SET cancel=? WHERE purchaseid=?', 
                ['Y', purchaseid], 
                    function(error, result){
                    response.writeHead(302, {Location: `/purchase`});
                    response.end();
                });
        });
    },
    purchase_refund: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var purchase = qs.parse(body);
            purchaseid = request.params.purchaseid;
            db.query('UPDATE purchase SET refund=? WHERE purchaseid=?', 
                ['Y', purchaseid], 
                    function(error, result){
                    response.writeHead(302, {Location: `/purchase`});
                    response.end();
                });
        });
    },

    search: function(request, response) {
        var context = { doc:`./calendar/calendarsearch.ejs`,
                        loggined : authIsOwner(request, response),
                        kind: '캘린더 검색화면',
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
        db.query(`SELECT * FROM calendar where title like ?`,
                [`%${sear.keyword}%`], function(error, results){
                    if(error){
                        throw error;
                    }
                    var context = { doc:`./calendar/calendarsearch.ejs`,
                                    loggined : authIsOwner(request, response),
                                    kind: '캘린더 검색화면',
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