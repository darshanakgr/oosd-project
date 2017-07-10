/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-module');
socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$('#create-new-module').on('submit', function (e) {
    e.preventDefault();
    var module = {
        moduleCode:$('[name=cn-moduleCode]').val(),
        moduleName:$('[name=cn-moduleName]').val(),
        credits:parseFloat($('[name=cn-credits]').val()),
        batch:$('[name=cn-batch]').val(),
        semester:parseFloat($('[name=cn-semester]').val())
    };

    socket.emit('createNewModule', module, function (message) {
        alert(message);
    });
})