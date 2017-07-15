/**
 * Created by drox2014 on 7/15/2017.
 */

var socket = io('/reception-timetable');

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$(document).ready(function () {
    $('#cn-sem-time-table').hide();
    $('#cn-lec-time-table').hide();
    $('#cn-lab-time-table').hide();
    $('[name=cn-time-table-type]').trigger('change');
    $('#up-sem-time-table').hide();
    $('#up-lec-time-table').hide();
    $('#up-lab-time-table').hide();
    $('[name=up-time-table-type]').trigger('change');
    $('#sc-sem-time-table').hide();
    $('#sc-lec-time-table').hide();
    $('#sc-lab-time-table').hide();
    $('[name=sc-time-table-type]').trigger('change');
});

$('[name=cn-time-table-type]').on('change', function () {
    var timetableType = $('[name=cn-time-table-type]').val();
    if (timetableType == "SEM") {
        $('#cn-sem-time-table').show();
        $('#cn-lec-time-table').hide();
        $('#cn-lab-time-table').hide();
    } else if (timetableType == "LEC") {
        $('#cn-sem-time-table').hide();
        $('#cn-lec-time-table').show();
        $('#cn-lab-time-table').hide();
    } else {
        $('#cn-sem-time-table').hide();
        $('#cn-lec-time-table').hide();
        $('#cn-lab-time-table').show();
    }
});

$('[name=up-time-table-type]').on('change', function () {
    var timetableType = $('[name=up-time-table-type]').val();
    if (timetableType == "SEM") {
        $('#up-sem-time-table').show();
        $('#up-lec-time-table').hide();
        $('#up-lab-time-table').hide();
    } else if (timetableType == "LEC") {
        $('#up-sem-time-table').hide();
        $('#up-lec-time-table').show();
        $('#up-lab-time-table').hide();
    } else {
        $('#up-sem-time-table').hide();
        $('#up-lec-time-table').hide();
        $('#up-lab-time-table').show();
    }
    clearUpdateTable();
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

$('[name=up-batch]').on('change', function () {
    clearUpdateTable();
});

$('[name=up-semester]').on('change', function () {
    clearUpdateTable();
});

$('[name=up-lecturer]').on('change', function () {
    clearUpdateTable();
});

$('[name=up-location]').on('keydown', function () {
    clearUpdateTable();
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

$('#create-new-timetabele-form').on('submit', function (e) {
    e.preventDefault();
    var rows = traverseCNTimeTable();
    if (Object.keys(rows).length != 0) {
        var data = {};
        var timetableType = $('[name=cn-time-table-type]').val();
        if (timetableType == "SEM") {
            data.batch = $('[name=cn-batch]').val();
            data.semester = $('[name=cn-semester]').val();
        } else if (timetableType == "LEC") {
            data.lecturer = $('[name=cn-lecturer]').val();
        } else {
            data.location = $('[name=cn-location]').val();
        }
        socket.emit('createSemTimeTable', {
            timetableType: timetableType,
            data: data,
            rows: rows
        }, function (err, res) {
            if (err) {
                console.log(err);
                return alert(err);
            }
            alert("Timetable saved successfully")
        });
    } else {
        alert('Please insert at least one record to create a timetable.')
    }

});

$('[name=cn-add-btn]').on('click', function () {
    var timetable = document.getElementById('cn-timetable');
    var rowData = timetable.insertRow(-1);
    var cell = rowData.insertCell(0);
    cell.setAttribute('contentEditable', 'true');
    //cell.innerHTML = "XX:XX:AM<br />-<br />XX:XX:AM"
    for (var i = 1; i < 8; i++) {
        rowData.insertCell(i).setAttribute('contentEditable', 'true');
    }
});

$('[name=up-add-btn]').on('click', function () {
    var timetable = document.getElementById('up-timetable');
    var rowData = timetable.insertRow(-1);
    var cell = rowData.insertCell(0);
    cell.setAttribute('contentEditable', 'true');
    //cell.innerHTML = "XX:XX:AM<br />-<br />XX:XX:AM"
    for (var i = 1; i < 8; i++) {
        rowData.insertCell(i).setAttribute('contentEditable', 'true');
    }
});

$('[name=up-find-btn]').on('click', function () {
    var table = clearUpdateTable();
    var timetableType = $('[name=up-time-table-type]').val();
    var data = {};
    if (timetableType == "SEM") {
        data.semester = $('[name=up-semester]').val();
        data.batch = $('[name=up-batch]').val();
    } else if (timetableType == "LEC") {
        data.lecturer = $('[name=up-lecturer]').val();
    } else {
        data.location = $('[name=up-location]').val();
    }
    socket.emit('findTimetable', {
        timetableType: timetableType,
        data: data
    }, function (err, res) {
        if (err) {
            console.log(err);
            return alert(err);
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
                }
            }
        }
    });
});

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
            return alert(err);
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
                }
            }
        }
    });
});

$('#update-timetable-form').on('submit', function (e) {
    e.preventDefault();
    var rows = traverseUPTimeTable();
    if (Object.keys(rows).length != 0) {
        var timetableType = $('[name=up-time-table-type]').val();
        var data = {};
        if (timetableType == "SEM") {
            data.semester = $('[name=up-semester]').val();
            data.batch = $('[name=up-batch]').val();
        } else if (timetableType == "LEC") {
            data.lecturer = $('[name=up-lecturer]').val();
        } else {
            data.location = $('[name=up-location]').val();
        }
        socket.emit('findTimetable', {
            timetableType: timetableType,
            data: data
        }, function (err, res) {
            if (err) {
                console.log(err);
                return alert(err);
            }
            if (res) {
                console.log(res._id);
                socket.emit('updateTimetable', res._id, {rows}, function (err, res) {
                    if (err) {
                        console.log(err);
                        return alert(err);
                    }
                    alert("Timetable saved successfully")
                });
            }
        });
    } else {
        alert('Please insert at least one record to create a timetable.')
    }

});

function traverseCNTimeTable() {
    var dataArr = {}
    var timetable = document.getElementById('cn-timetable');
    for (var i = 1; i < timetable.rows.length; i++) {
        var cellArr = [];
        for (var j = 0; j < timetable.rows[i].cells.length; j++) {
            cellArr.push(timetable.rows[i].cells[j].innerHTML);
        }
        dataArr[i] = cellArr;
    }
    return dataArr;
}

function traverseUPTimeTable() {
    var dataArr = {}
    var timetable = document.getElementById('up-timetable');
    for (var i = 1; i < timetable.rows.length; i++) {
        var cellArr = [];
        for (var j = 0; j < timetable.rows[i].cells.length; j++) {
            cellArr.push(timetable.rows[i].cells[j].innerHTML);
        }
        dataArr[i] = cellArr;
    }
    return dataArr;
}

function loadbatchCombo() {
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return console.log(err);
        }
        res.forEach(function (batch) {
            $('[name=cn-batch]').append($('<option>', {
                val: batch.batchName,
                text: batch.batchName
            }));
            $('[name=up-batch]').append($('<option>', {
                val: batch.batchName,
                text: batch.batchName
            }));
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
            $('[name=cn-lecturer]').append($('<option>', {
                val: lecturer._id,
                text: lecturer.res + ". " + lecturer.name
            }));
            $('[name=up-lecturer]').append($('<option>', {
                val: lecturer._id,
                text: lecturer.res + ". " + lecturer.name
            }));
            $('[name=sc-lecturer]').append($('<option>', {
                val: lecturer._id,
                text: lecturer.res + ". " + lecturer.name
            }));
        });
    });
}

function clearUpdateTable() {
    var timetable = document.getElementById('up-timetable');
    while (timetable.rows.length > 1) {
        timetable.deleteRow(-1);
    }
    return timetable;
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