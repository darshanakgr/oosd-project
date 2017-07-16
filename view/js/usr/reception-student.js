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
            return alert(err.errors[Object.keys(err.errors)[0]].message);
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
        name: $('[name=st-name]').val(),
        address: $('[name=st-address]').val(),
        contact: $('[name=st-contact]').val()
    }, function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        alert('New student registered successfully');
        clearStudentForm();
    });
});

$('#search-student-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('searchStudentByIndex', $('[name=sc-index-no]').val(), function (err, res) {
        if(err){
            return console.log(err);
        }
        if(res){
            $('[name=sc-name]').val(res.name);
            $('[name=sc-batch]').val(res.batch);
            $('[name=sc-address]').val(res.address);
            $('[name=sc-contact]').val(res.contact);
        }else{
            clearSearchForm();
            alert('Incorrect Index Number. PLease check again')
        }
    });
});

function clearSearchForm() {
    $('[name=sc-name]').val("");
    $('[name=sc-batch]').val("");
    $('[name=sc-address]').val("");
    $('[name=sc-contact]').val("");
}

function fillBatchComobo() {
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
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
            //return alert('Unable to register new batch');
            return alert(err.errors[Object.keys(err.errors)[0]].message);
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