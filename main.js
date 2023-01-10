var express = require('express');
var app = express();
var urlm = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var topic = require('./lib/topic');
var db = require('./lib/db.js');
var author = require('./lib/author');
app.set('views',__dirname+ '/views');
app.set('view engine','ejs');

app.get('/', function(request,response){
    topic.home(request, response);
});
app.get('/page/:pageId', function(request,response){
    topic.page(request,response);
});
app.get('/create', function(request,response){
    topic.create(request,response);
});
app.post('/create_process', function(request,response){
    topic.create_process(request,response);
});
app.get('/update/:pageId', function(request,response){
    topic.update(request,response);
});
app.post('/update_process', function(request,response){
    topic.update_process(request,response);
});
app.post('/delete_process', function(request,response){
    topic.delete_process(request,response);
});
app.get('/author', function(request,response){
    author.home(request,response);
});
app.post('/author/create_process', function(request,response){
    author.create_process(request, response);
});

app.get('/author/update/:authorId', function(request,response){
    author.update(request, response);
});
app.post('/author/update_process', function(request,response){
    author.update_process(request, response);
});
app.post('/author/delete_process', function(request,response){
    author.delete_process(request, response);
});

app.listen(3000,()=> console.log('Example'));

// var app = http.createServer( function(request,response) {
//     var url = request.url;
//     var queryData = urlm.parse(url, true).query; //parse 메소드의 두번째 인자 :  true - object(객체형)으로 반환, false - string(문자형) 반환
//     //console.log(urlm.parse(url, true)); //url은 parse가 반환하는 객체이다.
//     var pathname = urlm.parse(url, true).pathname

//     if(pathname === '/'){
//         if(queryData.id === undefined){
//             topic.home(response);
//         }else {
//                 topic.page(request, response);
//             }
//         }
//     else if(pathname === '/create'){
//             topic.create(request, response);
//     }
//     else if(pathname === '/create_process'){
//         topic.create_process(request, response);
//     }  
//     else if(pathname === '/update') {
//         topic.update(request, response);
//     }  
//     else if(pathname === '/update_process') {
//         topic.update_process(request, response);
//     }   
//     else if(pathname === '/delete_process'){
//         topic.delete_process(request, response);
//     }

//     else if(pathname === '/author'){
//         author.home(request, response);
//     }
//     else if(pathname === '/author/create_process'){
//         author.create_process(request, response);
//     }
//     else if(pathname === '/author/update'){
//         author.update(request, response);
//     }
//     else if(pathname === '/author/update_process'){
//         author.update_process(request, response);
//     }
//     else if(pathname === '/author/delete'){
//         author.delete(request, response);
//     }
//     else if(pathname === '/author/delete_process'){
//         author.delete_process(request, response);
//     }
//     else{
//         response.writeHead(404);
//         response.end('Not found');
//     }
// });

// app.listen(3000);