var express = require('express');
var app = express();

app.set('views',__dirname+ '/views');
app.set('view engine','ejs');

var db= require('./lib/db.js');
var auth= require('./lib/authentication');
var etc= require('./lib/etc.js');
var name= require('./lib/name.js');
var user= require('./lib/user.js');
var book= require('./lib/book.js');
var session = require('express-session');
const board = require('./lib/board.js');
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host    :'localhost',
    user    :'nodejs',
    password:'nodejs',
    database:'webdb2022'
};
var sessionStore = new MySqlStore(options);
app.use(express.static('public'));

app.use(session({
    secret : 'asdfsed@%^$%dgse',
    resave : false,
    saveUnintialized : true,
    store : sessionStore
}));
// home 관련
app.get('/', function(request, response){
    book.Home(request,response);
})

// calendar 관련
app.get('/calendar', function(request,response){
    etc.calendarHome(request, response);
});
app.get('/calendar/create', function(request,response){
    etc.calendarCreate(request, response);
});
app.post('/calendar/create_process', function(request,response){
    etc.calendarCreate_process(request, response);
});
app.get('/calendar/list', function(request,response){
    etc.calendarList(request, response);
});
app.get('/calendar/update/:planId', function(request,response){
    etc.calendarUpdate(request, response);
});
app.post('/calendar/update_process/:planId', function(request,response){
    etc.calendarUpdate_process(request, response);
});
app.get('/calendar/delete_process/:planId', function(request,response){
    etc.calendarDelete_process(request, response);
});
app.get('/calendar/calendarsearch', function(request,response){
    etc.search(request, response);
});
app.post('/calendar/calendarsearch', function(request,response){
    etc.search_process(request, response);
}); 

// namecard 관련
app.get('/namecard', function(request,response){
    name.namecardHome(request, response);
});
app.get('/namecard/create', function(request,response){
    name.namecardCreate(request, response);
});
app.post('/namecard/create_process', function(request,response){
    name.namecardCreate_process(request, response);
});
app.get('/namecard/list', function(request,response){
    name.namecardList(request, response);
});
app.get('/namecard/update/:planId', function(request,response){
    name.namecardUpdate(request, response);
});
app.post('/namecard/update_process/:planId', function(request,response){
    name.namecardUpdate_process(request, response);
});
app.get('/namecard/delete_process/:planId', function(request,response){
    name.namecardDelete_process(request, response);
});
app.get('/namecard/namecardsearch', function(request,response){
    name.search(request, response);
});
app.post('/namecard/namecardsearch', function(request,response){
    name.search_process(request, response);
});

// user 관련
app.get('/user', function(request,response){
    user.userHome(request, response);
});
app.get('/user/create', function(request,response){
    user.userCreate(request, response);
});
app.post('/user/create_process', function(request,response){
    user.userCreate_process(request, response);
});
app.get('/user/list', function(request,response){
    user.userList(request, response);
});
app.get('/user/update/:planId', function(request,response){
    user.userUpdate(request, response);
});
app.post('/user/update_process/:planId', function(request,response){
    user.userUpdate_process(request, response);
});
app.get('/user/delete_process/:planId', function(request,response){
    user.userDelete_process(request, response);
});

// book 관련
app.get('/booklist/:pNum', function(request,response){
    book.list(request, response);
});
app.post('/book/cart', function(request, response) {
    book.cart(request, response);
});
app.post('/book/purchase', function(request, response) {
    book.purchase(request, response);
});
app.get('/book_detail/:bId', function(request,response){
    book.detail(request, response);
});
app.get('/book/create', function(request,response){
    book.bookCreate(request, response);
});
app.post('/book/create_process', function(request,response){
    book.bookCreate_process(request, response);
});
app.get('/book/update/:bId', function(request,response){
    book.bookUpdate(request, response);
});
app.post('/book/update_process/:bId', function(request,response){
    book.bookUpdate_process(request, response);
});
app.get('/book/delete_process/:bId', function(request,response){
    book.bookDelete_process(request, response);
});
app.get('/book/month', function(request,response){
    book.month(request, response);
});
app.get('/book/best', function(request,response){
    book.best(request, response);
});
app.get('/book/ebook', function(request,response){
    book.ebook(request, response);
});
app.get('/book/search', function(request,response){
    book.search(request, response);
});
app.post('/book/search', function(request,response){
    book.search_process(request, response);
});

// board 관련
app.get('/board/list/:pNum', function(request, response){
    board.list(request, response);
});
app.get('/board/view/:bNum/:pNum', function(request, response){
    board.view(request,response);
});
app.get('/board/create', function(request,response){
    board.create(request,response);
});
app.post('/board/create_process', function(request, response){
    board.create_process(request, response);
});
app.get('/board/update/:bNum/:pNum', function(request,response){
    board.update(request, response);
});
app.post('/board/update_process', function(request, response){
    board.update_process(request, response);
});
app.get('/board/delete/:bNum/:pNum', function(request, response){
    board.delete(request, response);
});

// cart, purchase 관련
app.get('/cart', function(request,response){
    etc.cart(request, response);
});
app.get('/purchase', function(request,response){
    etc.purchase(request, response);
});
app.get('/purchase_delete/:purchaseid', function(request,response){
    etc.purchase_delete(request, response);
});
app.get('/purchase_refund/:purchaseid', function(request,response){
    etc.purchase_refund(request, response);
});
app.post('/cart_purchase/:bookid', function(request,response){
    book.cart_purchase(request, response);
});

// login 관련
app.get('/register', function(request,response){
    auth.register(request, response);
});
app.post('/register_process', function(request,response){
    auth.register_process(request, response);
});
app.get('/login',function(request, response) {
    auth.login(request, response);
});
app.post('/login_process',function(request, response){
    auth.login_process(request, response);
});
app.get('/logout', function(request, response) {
    auth.logout(request, response);
});
app.get('/password/update/:id', function(request,response){
    user.passwordUpdate(request, response);
});
app.post('/password/update_process/:lId', function(request,response){
    user.passwordUpdate_process(request, response);
});

app.listen(3000, ()=>console.log("listening 3000"))