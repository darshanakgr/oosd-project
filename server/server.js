/**
 * Created by drox2014 on 7/9/2017.
 */

//library-imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');

//user-imports
const socketFactory = require('./../socketfactory/socket-factory');
const userController = require('./../controller/user-controller');

var publicPath = path.join(__dirname, "./../view");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.set('views', publicPath);
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'ssshhhhh', resave: false, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.post('/login/:email/:password', function (req, res) {
    sess = req.session;
    console.log('hi');
    userController.fundUser(req.params).then((user) => {
        if(user){
            sess.user = user;
            console.log(user);
            if(user.access == "LEC"){
                res.send({url:'/lecturer'});
            }else if(user.access == "STU"){
                res.send({url:'/student'});
            }else if(user.access == "REC"){
                res.send({url:'/reception'});
            }
        }else{
            sess.user = null;
            res.send({});
        }
    }, (err) =>{
        sess.user = null;
        res.send("Failed");
    });
});

app.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/login-detail', function (req, res) {
    res.send(sess);
});

app.get('/lecturer', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-main.html')));
app.get('/lecturer-module', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-module.html')));
app.get('/lecturer-result', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-result.html')));
app.get('/lecturer-statistics', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-statistics.html')));
app.get('/lecturer-contact', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-contact.html')));
app.get('/lecturer-timetable', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-timetable.html')));
app.get('/reception', (req, res) => res.sendFile(path.join(publicPath, '/reception-main.html')));
app.get('/reception-student', (req, res) => res.sendFile(path.join(publicPath, '/reception-student.html')));
app.get('/reception-lecturer', (req, res) => res.sendFile(path.join(publicPath, '/reception-lecturer.html')));
app.get('/reception-timetable', (req, res) => res.sendFile(path.join(publicPath, '/reception-timetable.html')));
app.get('/reception-module', (req, res) => res.sendFile(path.join(publicPath, '/reception-module.html')));
app.get('/reception-contact', (req, res) => res.sendFile(path.join(publicPath, '/reception-contact.html')));
app.get('/student', (req, res) => res.sendFile(path.join(publicPath, '/student-main.html')));
app.get('/student-result', (req, res) => res.sendFile(path.join(publicPath, '/student-result.html')));
app.get('/student-contact', (req, res) => res.sendFile(path.join(publicPath, '/student-contact.html')));
app.get('/student-timetable', (req, res) => res.sendFile(path.join(publicPath, '/student-timetable.html')));
app.get('/contact-detail', (req, res) => res.sendFile(path.join(publicPath, '/manage-contact.html')));
app.get('/manage-user', (req, res) => res.sendFile(path.join(publicPath, '/reception-user.html')));

io.of('/lecturer-module').on('connection', (socket) => socketFactory.getLecturerModuleSocket(io, socket));
io.of('/lecturer-result').on('connection', (socket) => socketFactory.getLecturerResultSocket(io, socket));
io.of('/lecturer-statistics').on('connection', (socket) => socketFactory.getLecturerStatisticsSocket(io, socket));
io.of('/student-result').on('connection', (socket) => socketFactory.getStudentSocket(io, socket));
io.of('/reception-student').on('connection', (socket) => socketFactory.getReceptionStudentSocket(io, socket));
io.of('/reception-lecturer').on('connection', (socket) => socketFactory.getReceptionLecturerSocket(io, socket));
io.of('/reception-timetable').on('connection', (socket) => socketFactory.getReceptionTimetableSocket(io, socket));
io.of('/reception-module').on('connection', (socket) => socketFactory.getReceptionModuleSocket(io, socket));
io.of('/contact-detail').on('connection', (socket) => socketFactory.getContactDetailSocket(io, socket));
io.of('/view-timetable').on('connection', (socket) => socketFactory.getViewTimetableSocket(io, socket));
io.of('/manage-user').on('connection', (socket) => socketFactory.getManageUserSocket(io, socket));

server.listen(port, () => console.log('Server is up on ' + port));




