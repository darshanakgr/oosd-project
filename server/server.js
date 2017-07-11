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
app.get('/reception', (req, res) => res.sendFile(path.join(publicPath, '/reception-main.html')));
app.get('/reception-student', (req, res) => res.sendFile(path.join(publicPath, '/reception-student.html')));

io.of('/lecturer-module').on('connection', (socket) => socketFactory.getLecturerModuleSocket(io, socket));
io.of('/lecturer-result').on('connection', (socket) => socketFactory.getLecturerResultSocket(io, socket));
io.of('/reception-student').on('connection', (socket) => socketFactory.getReceptionStudentSocket(io, socket));

server.listen(port, () => console.log('Server is up on ' + port));




