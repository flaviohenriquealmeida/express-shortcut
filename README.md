# express-shortcut

Helper functions that avoids calling `app.use` for middlewares and `app.set` for environment variables. You can pass as many middlewares and variables you need passing Express instance only once. 

## Installation

```
npm install express-shortcut --save
```

## The problem

The following code is very common in Express applications. It registers many middlewares and sets environment variables:

```javascript
const express = require('express')
    , app = express()
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , passport = require('passport');

app.use(cookieParser());
app.use(session(
	{ secret: 'homem avestruz', 
	  resave: true, 
	  saveUninitialized: true 
	}
));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('token', 1234);
```

It's not too hard to figure out that we are calling `app.use` too many times. 

## express-shortcut usage 

Let's see the previous example with `express-use-shortcut`:

```javascript
const express = require('express')
    , app = express()
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , passport = require('passport')
    , shortcut  = require('express-shortcut')(app);

shortcut.use(
    cookieParser(),
    session(
        { secret: 'homem avestruz', 
          resave: true, 
          saveUninitialized: true 
        }
    ),
    passport.session(),
);

shortcut.set(
    'view engine', 'pug',
    'token', 123
);
```

If a path is necessary, you can pass the path and the middleware within an array:

```javascript
shortcut.use(
    ['/api', yourMiddleware],
    cookieParser(),
    session(
        { secret: 'homem avestruz', 
          resave: true, 
          saveUninitialized: true 
        }
    ),
    passport.session()
);
```



