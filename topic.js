var db= require('./lib/db.js');
var template = require('./lib/template.js');
var urlm = require('url');
var qs = require('querystring');

module.exports = {
    home: function(response){ 
        db.query(`SELECT * FROM topic`, function(error, topic) {
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.List(topic);
            var html = template.HTML(title, list, 
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
            );
        response.writeHead(200);
        response.end(html);
        });
    },

    page: function(request, response) {
        var _url = request.url;
        var id = request.params.pageId;
        db.query(`SELECT * FROM topic`, function(error, topics) {
            if(error) {
                throw error;
            }
            db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[id], function(error2,topic) {  //topics, topic 의미 구별
                if(error2){
                    throw error2;
                }
                var title = topic[0].title;
                var description = topic[0].description;
                var list = template.List(topics);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2>
                    ${description}
                    <p>by ${topic[0].name}</p>`,
                    `<a href="/create">create</a> <a href="/update/${id}">update</a>
                    <form action="/delete_process" method="post">
                        <input type="hidden" name="id" value="${id}">
                        <input type="submit" value="delete">
                    </form>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    },

    create : function(request, response) {
        db.query(`SELECT * FROM topic`, function(error, topics) {
            db.query(`SELECT * FROM author`, function(error2, authors){
                var title = 'Create';
                var list = template.List(topics);
                var html = template.HTML(title, list, `
                    <form action="http://localhost:3000/create_process" method="post">  
                        <p><input type="text" name="title" placeholder="title"></p>
                        <p>
                            <textarea name="description" placeholder="description"></textarea>
                        </p>
                        <p>
                            ${template.authorSelect(authors, '')}
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                `,`<p>글생성</p>`);
                response.writeHead(200);
                response.end(html);
            });
        });
    },

    create_process : function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });                                          //data를 다 받으면 end message 생성 -> 따라서 두 개의 함수 구현
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`
                INSERT INTO topic (title, description, created, author_id)
                    VALUES(?,?, NOW(), ?)`,
                [post.title, post.description, post.author], function(error, result) {  //result에는 INSERT일떄 레코드의 ID값이 저장이됨
                    if(error) {
                        throw error;
                    }
                response.writeHead(302, {Location: `/page/${result.insertId}`});
                response.end();
            }
            );
        });
    },

    update : function(request, response) {
        var url = request.url;
            //var queryData = urlm.parse(url, true).query;
            id = request.params.pageId;
        db.query(`SELECT * FROM topic`, function(error,topics) {
            if(error) {
                throw error;
            }
            db.query(`SELECT * FROM topic WHERE id=?`, [id], function(error2, topic) {
                if(error2) {
                    throw error2;
                }
                db.query(`SELECT * FROM author`, function(error3, authors){
                    var list = template.List(topics);
                    var html = template.HTML(topic[0].title, list,
                        `
                        <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${topic[0].id}">
                        <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">${topic[0].description}}</textarea>
                        </p>
                        <p>
                            ${template.authorSelect(authors, topic[0].author_id)}
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `,
                    `<a href="/create">create</a> <a href="/update/${topic[0].id}">update</a>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }); 
    },

    update_process : function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
                [post.title, post.description, post.author, post.id], function(error, result) {
                response.writeHead(302, {Location: `/page/${post.id}`});
                response.end();
            });
        });
    },

    delete_process : function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body= body + data;  
        });  
        request.on('end', function(){  
            var post = qs.parse(body);
            db.query('DELETE FROM topic WHERE id= ?', [post.id], function(error, result){
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: encodeURI(`/`)});  
                response.end();  
            })
        });
    }
}

