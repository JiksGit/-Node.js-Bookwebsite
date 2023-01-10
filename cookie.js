var express = require('express');
var app = express();

app.get('/',function(request, response) {
        response.writeHead(200, {
            'Set-Cookie': ['yummy_cookie=choco',
                        'tasty_cookie=strawberry',
                        `Permanent=cookies;Max-Age=${60*60*24*30}`
                    ]
        });
        response.end('Cookie!!');
        console.log(request.headers.cookie);
});
app.listen(3000, () => console.log('CookieText'));