var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');


//routes
var routes = require('./routes/index.js');

//express instance
var app = express();

//view engine
var swig = new swig.Swig();
//we will be serving html files
app.engine('html', swig.renderFile);

//set view engine in express to host html files
app.set('view engine', 'html');

//config middleware -- order is important
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
//express.static determines what will be static. in this case, will be all the client facing html
//__dirname and to ../client points the server to serve up stuff in that directory
// path.join() joins the stuff in the () to the current path
//stuff inside app.use() points to what the server will actually serve up and show.
app.use(express.static(path.join(__dirname, '../client')));

//main routes
app.use('/', routes);
    //if you were building an api
    //app.use('/api/v1', api);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handlers
//development error handler
//stack traces included
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


//production error handler
//no stack traces leaked to user
app.use(function (err, req, res, next) {
    res.status( err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
