/**
 * Created by drox2014 on 7/11/2017.
 */
var socket = io('/reception-student');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$('#create-new-batch-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('registerNewBatch', {
        batchName: $('[name=cn-batch-id]').val()
    }, function (err, res) {
        if (err) {
            return alert('Unable to register new batch');
        }
        alert('New batch registered successfully');
    });
    fillBatchTable();
});

$('#register-new-student-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('registerNewStudent', {
        index: $('[name=st-index-no]').val(),
        batch: $('[name=st-batch]').val(),
        name: $('[name=st-name]').val()
    }, function (err, res) {
        if (err) {
            return alert('Unable to register new student');
        }
        alert('New student registered successfully');
        clearStudentForm();
    });
})

function fillBatchComobo() {
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return alert('Unable to register new batch');
        }
        $('[name=st-batch]').find('option').remove();

        res.forEach(function (batch) {
            $('[name=st-batch]').append($('<option>', {
                val: batch.batchName,
                text: batch.batchName
            }));
        });
    });
}

function fillBatchTable() {
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return alert('Unable to register new batch');
        }
        var table = document.getElementById('batch-table');
        while (table.rows.length > 0) {
            table.deleteRow(-1);
        }
        res.forEach(function (batch) {
            table.insertRow(-1).insertCell(0).innerHTML = batch.batchName;
        });
    });
}

function clearStudentForm() {
    $('[name=st-index-no]').val("")
    $('[name=st-name]').val("")
}

fillBatchTable();
fillBatchComobo();