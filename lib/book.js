const { response } = require('express');
var db= require('./db.js');
var qs = require('querystring');

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
    if (today.getMonth < 9)
        month = "0" + String(today.getMonth()+1);
    else
        month = String(today.getMonth()+1);

    if (today.getDate < 10)
        day = "0" + String(today.getDate());
    else
        day = String(today.getDate());

    return nowdate + month + day;
}

module.exports = {
    Home: function(request, response) {
        var context = { doc: `./home.ejs`,
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class 
                    };
        request.app.render('index',context, function(err, html){
            response.end(html);
        });
    },
    list: function(request, response){ 
        db.query(`SELECT count(*) as total FROM book`,function(error, nums){
            var numPerPage = 2;
            var pageNum = request.params.pNum;
            var offs = (pageNum-1)*numPerPage;
            var totalPages = Math.ceil(nums[0].total / numPerPage);

            db.query(`SELECT * FROM book ORDER BY pubdate desc, Id LIMIT ? OFFSET ?`, [numPerPage, offs],
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./book/book.ejs`,
                                cls : request.session.class,
                                loggined : authIsOwner(request, response),
                                id : request.session.login_id,
                                kind : 'Book',
                                results : result,
                                pageNum : pageNum,
                                totalpages : totalPages
                                };
                request.app.render('index', context, function(err, html){
                    response.end(html);
                });
            })
        })
    },
    ebook: function(request, response){
        db.query(`SELECT * FROM book WHERE ebook='Y'`,
        function(error, result) {
            if(error){
                throw error;
            }
            
            var context = { doc:`./book/books.ejs`,
                            loggined : authIsOwner(request, response),
                            kind: 'E-Book',
                            id : request.session.login_id,
                            cls : request.session.class, 
                            results : result
                        };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        })
    },

    month: function(request, response) {
        db.query(`SELECT * FROM book B join(SELECT * 
                        FROM(
                            SELECT bookid, count(bookid) as numOfSeller
                            FROM purchase
                            WHERE left(purchasedate,6) =?
                            group by bookid
                            order by count(bookid) desc ) A
                        LIMIT 3) S on B.id = S.bookid`, [dateOfEightDigit().substring(0,6)],
                function(error, books){
                    if(error){
                        throw error;
                    }
                    
                    var context = { doc:`./book/books.ejs`,
                                    loggined : authIsOwner(request, response),
                                    kind: '이달의 책',
                                    id : request.session.login_id,
                                    cls : request.session.class, 
                                    results : books
                                };
                    request.app.render('index', context, function(err, html){
                        response.end(html);
                    });
                })
    },
    
    best: function(request, response){
        db.query(`SELECT * FROM book B join(SELECT *
                        FROM (
                            SELECT bookid, count(bookid) as numOfSeller
                            FROM purchase
                            group by bookid
                            order by count(bookid) desc ) A
                        LIMIT 3) S on B.id = S.bookid`, function(error, books){
                            if(error){
                                throw error;
                            }
                            
                            var context = { doc:`./book/books.ejs`,
                                            loggined : authIsOwner(request, response),
                                            kind: 'Best Seller',
                                            id : request.session.login_id,
                                            cls : request.session.class, 
                                            results : books
                                        };
                            request.app.render('index', context, function(err, html){
                                response.end(html);
                            });
                        })
    },

    search: function(request, response) {
            var context = { doc:`./book/search.ejs`,
                            loggined : authIsOwner(request, response),
                            kind: '검색화면',
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
        db.query(`SELECT * FROM book where name like ?`,
                [`%${sear.keyword}%`], function(error, results){
                    if(error){
                        throw error;
                    }
                    var context = { doc:`./book/search.ejs`,
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


    detail : function(request, response) {
        var titleofcreate = 'Detail';
        var bookId = request.params.bId;

        db.query(`SELECT * FROM book where Id = ${bookId}`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./book/bookdetail.ejs`,
                                Id : result[0].Id,
                                stock : result[0].stock,
                                name: result[0].name,
                                img: result[0].img,
                                author: result[0].author,
                                price: result[0].price,
                                logY : authIsOwner(request, response),
                                loggined : authIsOwner(request, response),
                                id : request.session.login_id,
                                cls : request.session.class 
                            };
                            request.app.render('index', context, function(err, html){
                                response.end(html);
                            });
                });
    },

    cart: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var book = qs.parse(body);
            db.query(`
                INSERT INTO cart (custid, bookid, cartdate, qty)
                    VALUES(?,?,?,?)`,
                        [request.session.login_id, book.bookId, dateOfEightDigit(), book.qty], function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/cart`});
                        response.end();
                }
            );
        });
    },
    cart_purchase: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body= body+ data;
        });
        request.on('end', function() {
            var cart = qs.parse(body);
            db.query(`
                INSERT INTO purchase (custid, bookid, purchasedate, qty)
                    VALUES(?,?,?,?)`,
                        [request.session.login_id, cart.bid, dateOfEightDigit(), cart.qty], function(error, result) {
                        if(error) {
                            throw error;
                        }
                            db.query('DELETE FROM cart WHERE cartid = ?', [cart.cartid], function(error, result) {
                                if(error) {
                                        throw error;
                                }
                        response.writeHead(302, {Location: `/purchase`});
                        response.end();
                    }
                );
            });
        })
    },

    purchase: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var purchase = qs.parse(body);
            db.query(`
                INSERT INTO purchase (custid, bookid, purchasedate, price, point, qty)
                    VALUES(?,?,?,?,?,?)`,
                        [request.session.login_id, purchase.bookId, dateOfEightDigit(), purchase.price, (purchase.price)/100, purchase.qty], function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/purchase`});
                        response.end();
                }
            );
        });
    },

    bookCreate : function(request,response) {
        var titleofcreate = 'Create';
        var context = { doc: `./book/bookCreate.ejs`,
                        name:'',
                        publisher:'',
                        author: '',
                        stock: '',
                        pubdate: '',
                        pagenum: '',
                        ISBN: '',
                        ebook: '',
                        kdc: '',
                        img: '',
                        price: '',
                        nation: '',
                        description: '',
                        kindOfDoc: 'C',
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class 
                    };
        request.app.render('index',context, function(err, html){
            response.end(html);
        });
    },
    bookCreate_process : function(request,response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var book = qs.parse(body);
            db.query(`
                INSERT INTO book (name, publisher, author, stock, pubdate, pagenum, ISBN , ebook, kdc, img, price, nation, description) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [book.name, book.publisher, book.author, book.stock, book.pubdate, book.pagenum, book.ISBN , book.ebook, book.kdc, book.img, book.price, book.nation, book.description], 
                        function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.writeHead(302, {Location: `/`});
                        response.end();
                }
            );
        });
    },
    bookUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var bId = request.params.bId;
        db.query(`SELECT * FROM book where id = ${bId}`,
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    var context = {doc : `./book/bookCreate.ejs`,
                                name: result[0].name,
                                publisher: result[0].publisher,
                                author: result[0].author,
                                stock: result[0].stock,
                                pubdate: result[0].pubdate,
                                pagenum: result[0].pagenum,
                                ISBN: result[0].ISBN,
                                ebook: result[0].ebook,
                                kdc: result[0].kdc,
                                img: result[0].img,
                                price: result[0].price,
                                nation: result[0].nation,
                                description: result[0].description,
                                bId : bId,
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
    bookUpdate_process: function(request, response) {
        var body ='';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var book = qs.parse(body);
            bId = request.params.bId;
            db.query('UPDATE book SET name=?, publisher=?, author=?, stock=?, pubdate=?, pagenum=?, ISBN =?, ebook=?, kdc=?, img=?, price=?, nation=?, description=? WHERE id=?', 
                [book.name, book.publisher, book.author, book.stock, book.pubdate, book.pagenum, book.ISBN , book.ebook, book.kdc, book.img, book.price, book.nation, book.description, bId], 
                    function(error, result){
                    response.writeHead(302, {Location: `/`});
                    response.end();
                });
        });
    },
    bookDelete_process: function(request, response) {
        var bId = request.params.bId;
        db.query('DELETE FROM book WHERE id= ?', [bId], function(error, result){
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
        });
    }
}