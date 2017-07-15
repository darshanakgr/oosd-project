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
app.get('/lecturer-module', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-module.html')));
app.get('/lecturer-result', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-result.html')));
app.get('/lecturer-statistics', (req, res) => res.sendFile(path.join(publicPath, '/lecturer-statistics.html')));
app.get('/reception', (req, res) => res.sendFile(path.join(publicPath, '/reception-main.html')));
app.get('/reception-student', (req, res) => res.sendFile(path.join(publicPath, '/reception-student.html')));
app.get('/reception-lecturer', (req, res) => res.sendFile(path.join(publicPath, '/reception-lecturer.html')));
app.get('/reception-timetable', (req, res) => res.sendFile(path.join(publicPath, '/reception-timetable.html')));
app.get('/student', (req, res) => res.sendFile(path.join(publicPath, '/student-main.html')));
app.get('/student-result', (req, res) => res.sendFile(path.join(publicPath, '/student-result.html')));
app.get('/contact-detail', (req, res) => res.sendFile(path.join(publicPath, '/manage-contact.html')));

io.of('/lecturer-module').on('connection', (socket) => socketFactory.getLecturerModuleSocket(io, socket));
io.of('/lecturer-result').on('connection', (socket) => socketFactory.getLecturerResultSocket(io, socket));
io.of('/lecturer-statistics').on('connection', (socket) => socketFactory.getLecturerStatisticsSocket(io, socket));
io.of('/student-result').on('connection', (socket) => socketFactory.getStudentSocket(io, socket));
io.of('/reception-student').on('connection', (socket) => socketFactory.getReceptionStudentSocket(io, socket));
io.of('/reception-lecturer').on('connection', (socket) => socketFactory.getReceptionLecturerSocket(io, socket));
io.of('/reception-timetable').on('connection', (socket) => socketFactory.getReceptionTimetableSocket(io, socket));
io.of('/contact-detail').on('connection', (socket) => socketFactory.getContactDetailSocket(io, socket));

server.listen(port, () => console.log('Server is up on ' + port));




