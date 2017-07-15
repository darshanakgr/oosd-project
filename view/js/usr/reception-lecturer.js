/**
 * Created by drox2014 on 7/11/2017.
 */
var socket = io('/reception-lecturer');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$('#register-new-lecturer-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('registerNewLecturer', {
        res:$('[name=cn-res]').val(),
        name:$('[name=cn-name]').val(),
        email:$('[name=cn-email]').val()
    }, function (err, res) {
        if(err){
            console.log(err);
            return alert(err);
        }
        fillLecturerTable();
        alert('Lecturer registered successfully');
    });
});

function fillLecturerTable() {
    var table = document.getElementById('lecturer-table');
    while(table.rows.length > 1){
        table.deleteRow(-1);
    }
    socket.emit('getAllLecturers', function (err, res) {
        res.forEach(function (lecturer) {
            var row = table.insertRow(-1);
            row.insertCell(0).innerHTML = lecturer.res + ". " + lecturer.name;
            row.insertCell(1).innerHTML = lecturer.email;
        });
    })
}

fillLecturerTable();