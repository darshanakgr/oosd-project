/**
 * Created by drox2014 on 7/15/2017.
 */

var socket = io('/view-timetable');

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$(document).ready(function () {
    $('#sc-sem-time-table').hide();
    $('#sc-lec-time-table').hide();
    $('#sc-lab-time-table').hide();
    $('[name=sc-time-table-type]').trigger('change');
});

$('[name=sc-time-table-type]').on('change', function () {
    var timetableType = $('[name=sc-time-table-type]').val();
    if (timetableType == "SEM") {
        $('#sc-sem-time-table').show();
        $('#sc-lec-time-table').hide();
        $('#sc-lab-time-table').hide();
    } else if (timetableType == "LEC") {
        $('#sc-sem-time-table').hide();
        $('#sc-lec-time-table').show();
        $('#sc-lab-time-table').hide();
    } else {
        $('#sc-sem-time-table').hide();
        $('#sc-lec-time-table').hide();
        $('#sc-lab-time-table').show();
    }
    clearSearchTable();
});

$('[name=sc-batch]').on('change', function () {
    clearSearchTable();
});

$('[name=sc-semester]').on('change', function () {
    clearSearchTable();
});

$('[name=sc-lecturer]').on('change', function () {
    clearSearchTable();
});

$('[name=sc-location]').on('keydown', function () {
    clearSearchTable});

$('[name=sc-find-btn]').on('click', function () {
    var table = clearSearchTable();
    var timetableType = $('[name=sc-time-table-type]').val();
    var data = {};
    if (timetableType == "SEM") {
        data.semester = $('[name=sc-semester]').val();
        data.batch = $('[name=sc-batch]').val();
    } else if (timetableType == "LEC") {
        data.lecturer = $('[name=sc-lecturer]').val();
    } else {
        data.location = $('[name=sc-location]').val();
    }
    socket.emit('findTimetable', {
        timetableType: timetableType,
        data: data
    }, function (err, res) {
        if (err) {
            console.log(err);
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        if (!res) {
            alert('Unable to find timetable')
        } else {
            console.log(res);
            for (var key in res.rows) {
                var rowData = table.insertRow(-1);
                for (var i = 0; i < res.rows[key].length; i++) {
                    var cell = rowData.insertCell(i);
                    cell.innerHTML = res.rows[key][i];
                    cell.setAttribute('contentEditable', 'true');
                    if(!res.rows[key][i]){
                        cell.setAttribute('style', "background-color:#2ecc71");
                    }
                }
            }
        }
    });
});

function loadbatchCombo() {
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return console.log(err);
        }
        res.forEach(function (batch) {
            $('[name=sc-batch]').append($('<option>', {
                val: batch.batchName,
                text: batch.batchName
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
            $('[name=sc-lecturer]').append($('<option>', {
                val: lecturer._id,
                text: lecturer.res + ". " + lecturer.name
            }));
        });
    });
}

function clearSearchTable() {
    var timetable = document.getElementById('sc-timetable');
    while (timetable.rows.length > 1) {
        timetable.deleteRow(-1);
    }
    return timetable;
}


loadLecturersCombo();
loadbatchCombo();