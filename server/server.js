/**
 * Created by drox2014 on 7/9/2017.
 */

//library-imports
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

//user-imports
const socketFactory = require('./../socketfactory/socket-factory');

var publicPath = path.join(__dirname, "./../view");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('/lecturer', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-main.html')));
app.get('/lecturer-create-event', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-create-event.html')));
app.get('/lecturer-create-regular', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-create-regular.html')));
app.get('/lecturer-create-temporary', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-create-temporary.html')));
app.get('/lecturer-edit-event', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-edit-event.html')));
app.get('/lecturer-edit-regular', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-edit-regular.html')));
app.get('/lecturer-module', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-module.html')));
app.get('/lecturer-result', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-result.html')));
app.get('/lecturer-statistics', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-statistics.html')));
app.get('/lecturer-contact', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-contact.html')));
app.get('/lecturer-timetable', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-timetable.html')));
app.get('/reception', (req, res) => res.sendFile(path.join(publicPath, '/reception-main.html')));
app.get('/reception-create-advertisement', (req, res) => res.sendFile(path.join(publicPath, '/reception-create-advertisement.html')));
app.get('/reception-create-event', (req, res) => res.sendFile(path.join(publicPath, '/reception-create-event.html')));
app.get('/reception-create-regular', (req, res) => res.sendFile(path.join(publicPath, '/reception-create-regular.html')));
app.get('/reception-create-temporary', (req, res) => res.sendFile(path.join(publicPath, '/reception-create-temporary.html')));
app.get('/reception-edit-advertisement', (req, res) => res.sendFile(path.join(publicPath, '/reception-edit-advertisement.html')));
app.get('/reception-edit-event', (req, res) => res.sendFile(path.join(publicPath, '/reception-edit-event.html')));
app.get('/reception-edit-regular', (req, res) => res.sendFile(path.join(publicPath, '/reception-edit-regular.html')));
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
app.get('/main-notices', (req, res) => {res.sendFile(path.join(publicPath, 'main-notices.html'))});
app.get('/create-regular', (req, res) => {res.sendFile(path.join(publicPath, 'create-regular.html'))});
app.get('/create-temporary', (req, res) => {res.sendFile(path.join(publicPath, 'create-temporary.html'))});
app.get('/create-advertisement', (req, res) => {res.sendFile(path.join(publicPath, 'create-advertisement.html'))});
app.get('/create-event', (req, res) => {res.sendFile(path.join(publicPath, 'create-event.html'))});
app.get('/edit-regular', (req, res) => {res.sendFile(path.join(publicPath, 'edit-regular.html'))});
app.get('/edit-advertisement', (req, res) => {res.sendFile(path.join(publicPath, 'edit-advertisement.html'))});
app.get('/edit-event', (req, res) => {res.sendFile(path.join(publicPath, 'edit-event.html'))});
app.get('/user-complex-create', (req, res) => {res.sendFile(path.join(publicPath, 'user-complex-create.html'))});

io.of('/lecturer-module').on('connection', (socket) => socketFactory.getLecturerModuleSocket(io, socket));
io.of('/lecturer-result').on('connection', (socket) => socketFactory.getLecturerResultSocket(io, socket));
io.of('/lecturer-statistics').on('connection', (socket) => socketFactory.getLecturerStatisticsSocket(io, socket));
io.of('/lecturer').on('connection', (socket) => socketFactory.getLecturerMainSocket(io, socket));
io.of('/lecturer-create-event').on('connection', (socket) => socketFactory.getLecturerCreateEventSocket(io, socket));
io.of('/lecturer-create-regular').on('connection', (socket) => socketFactory.getLecturerCreateRegularSocket(io, socket));
io.of('/lecturer-create-temporary').on('connection', (socket) => socketFactory.getLecturerCreateTemporarySocket(io, socket));
io.of('/lecturer-edit-event').on('connection', (socket) => socketFactory.getLecturerEditEventSocket(io, socket));
io.of('/lecturer-edit-regular').on('connection', (socket) => socketFactory.getLecturerEditRegularSocket(io, socket));
io.of('/student-result').on('connection', (socket) => socketFactory.getStudentSocket(io, socket));
io.of('/student').on('connection', (socket) => socketFactory.getStudentMainSocket(io, socket));
io.of('/reception-student').on('connection', (socket) => socketFactory.getReceptionStudentSocket(io, socket));
io.of('/reception-lecturer').on('connection', (socket) => socketFactory.getReceptionLecturerSocket(io, socket));
io.of('/reception-timetable').on('connection', (socket) => socketFactory.getReceptionTimetableSocket(io, socket));
io.of('/reception-module').on('connection', (socket) => socketFactory.getReceptionModuleSocket(io, socket));
io.of('/reception').on('connection', (socket) => socketFactory.getReceptionMainSocket(io, socket));
io.of('/reception-create-advertisement').on('connection', (socket) => socketFactory.getReceptionCreateAdvertisementSocket(io, socket));
io.of('/reception-create-event').on('connection', (socket) => socketFactory.getReceptionCreateEventSocket(io, socket));
io.of('/reception-create-regular').on('connection', (socket) => socketFactory.getReceptionCreateRegularSocket(io, socket));
io.of('/reception-create-temporary').on('connection', (socket) => socketFactory.getReceptionCreateTemporarySocket(io, socket));
io.of('/reception-edit-advertisement').on('connection', (socket) => socketFactory.getReceptionEditAdvertisementSocket(io, socket));
io.of('/reception-edit-event').on('connection', (socket) => socketFactory.getReceptionEditEventSocket(io, socket));
io.of('/reception-edit-regular').on('connection', (socket) => socketFactory.getReceptionEditRegularSocket(io, socket));
io.of('/contact-detail').on('connection', (socket) => socketFactory.getContactDetailSocket(io, socket));
io.of('/view-timetable').on('connection', (socket) => socketFactory.getViewTimetableSocket(io, socket));
io.of('/main-notices', (socket) => {socketFactory.getMainNoticeSocket(io, socket)});
io.of('/create-regular', (socket) => {socketFactory.getCreateRegularSocket(io, socket)});
io.of('/create-temporary', (socket) => {socketFactory.getCreateTemporarySocket(io, socket)});
io.of('/create-advertisement', (socket) => {socketFactory.getCreateAdvertisementSocket(io, socket)});
io.of('/create-event', (socket) => {socketFactory.getCreateEventSocket(io, socket)});
io.of('/edit-regular', (socket) => {socketFactory.getEditRegularSocket(io, socket)});
io.of('/edit-advertisement', (socket) => {socketFactory.getEditAdvertisementSocket(io, socket)});
io.of('/edit-event', (socket) => {socketFactory.getEditEventSocket(io, socket)});
io.of('/user-complex-create', (socket) => {socketFactory.getUserCreateSocket(io, socket)});


server.listen(port, () => console.log('Server is up on ' + port));




