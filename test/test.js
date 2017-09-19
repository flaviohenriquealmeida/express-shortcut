'use strict';

const assert = require('assert')
    , express = require('express')
    , app = express()
    , request = require('supertest')(app)
    , shortcut = require('../index')(app);

describe('shortcut use', () => {

    shortcut
        .use(
            (req, res, next) => {

                req.firstMiddleware = 'FIRST';
                next();
            },
            (req, res, next) => {
                req.secondMiddleware = 'SECOND';
                next();
            },
            ['/test', (req, res, next) => {
                req.pathLessMiddleware  = 'PATHLESS';
                next();
            }]
        );

    app.get('/', (req, res) => 
        res.status(200)
            .end(`${req.firstMiddleware}-${req.secondMiddleware}`));
     
    app.get('/test', (req, res) => 
         res.status(200)
            .end(`${req.pathLessMiddleware}`));
          
    it('should use two path less middlewares', () => 
        request
        .get('/')
        .expect(200)
        .then(response => 
            assert.equal(response.text, 'FIRST-SECOND'))); 
 
    it('should use a full path middleware', () => 
        request
        .get('/test')
        .expect(200)
        .then(response => 
            assert.equal(response.text, 'PATHLESS')));                 
});

describe('shortcut set', () => {

    const setValue1 = new Date();
    const setValue2 = { name: 'shortcut'};
    
    shortcut.set(
        'variable1', setValue1,
        'variable2', setValue2
    );

    it('shout set two variables', done => {
        assert.equal(app.get('variable1'), setValue1);
        assert.equal(app.get('variable2'), setValue2);
        done();
    });
});
