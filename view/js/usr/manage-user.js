/**
 * Created by drox2014 on 7/15/2017.
 */

var socket = io('/manage-user');

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$(document).ready(function () {
    $('#stu-session').hide();
    $('#lec-session').hide();
    $('[name=user-type]').trigger('change');
});

$('[name=user-type]').on('change', function () {
    var userType = $('[name=user-type]').val();
    if (userType == "HOD" || userType == "LEC") {
        $('#stu-session').hide();
        $('#lec-session').show();
        $('[name=cn-lecturer]').trigger('change');
    } else if (userType == "STU" || userType == "REP") {
        $('#stu-session').show();
        $('#lec-session').hide();
        $('[name=cn-student]').trigger('change');
    } else {
        $('#stu-session').hide();
        $('#lec-session').hide();
    }
});

$('[name=cn-lecturer]').on('change', function () {
    socket.emit('findLecturerById', $('[name=cn-lecturer]').val(), function (err, res) {
        if(err){
            return console.log(err);
        }
        if(res){
            $('[name=cn-email]').val(res.email);
        }
    });
});

$('[name=cn-student]').on('change', function () {
    socket.emit('findStudentByIndex', $('[name=cn-student]').val(), function (err, res) {
        if(err){
            return console.log(err);
        }
        console.log(res);
        if(res){
            $('[name=cn-email]').val(res.email);
        }
    });
});

$('#create-user').on('submit', function (e) {
    e.preventDefault();
    var userType = $('[name=user-type]').val();
    var user = {
        email:$('[name=cn-email]').val(),
        password:$('[name=cn-password]').val(),
        access:userType
    };
    if (userType == "HOD" || userType == "LEC") {
        user.data = $('[name=cn-lecturer]').val();
    } else if (userType == "STU" || userType == "REP") {
        user.data = $('[name=cn-student]').val();
    } else if (userType == "REC") {
        user.data = "RECEPTION";
    }
    socket.emit('createUser', user, function (err, res) {
        if(err){
            return console.log(err);
        }
        alert('User saved successfully');
    })
});

function locaStudentCombo() {
    socket.emit('getAllStudent', function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        res.forEach(function (student) {
            $('[name=cn-student]').append($('<option>', {
                val: student.index,
                text: student.index
            }));
        });
    });
}

function loadLecturersCombo() {
    socket.emit('getAllLecturers', function (err, res) {
        if (err) {
            return console.log(err);
        }
        res.forEach(function (lecturer) {
            $('[name=cn-lecturer]').append($('<option>', {
                val: lecturer._id,
                text: lecturer.res + ". " + lecturer.name
            }));
        });
    });
}

loadLecturersCombo();
locaStudentCombo();