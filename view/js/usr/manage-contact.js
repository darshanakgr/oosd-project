/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/contact-detail');

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});


$('#create-new-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createNewContactDetail', {
        res: $('[name=cn-res]').val(),
        name: $('[name=cn-name]').val(),
        designation: $('[name=cn-designation]').val(),
        email: $('[name=cn-email]').val(),
        contact: $('[name=cn-contact]').val()
    }, function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
            //return alert('Unable to save contact detail');
        }
        alert('Contact detail saved successfully');
        fillNameCombos();
        fillTable();
    });
});

$('[name=up-submit]').on('click', function () {
    socket.emit('updateContactDetail', $('[name=up-name]').val(), {
        designation: $('[name=up-designation]').val(),
        email: $('[name=up-email]').val(),
        contact: $('[name=up-contact]').val()
    }, function (err, res) {
        if (err) {
            console.log(err);
            return alert('Unable to save contact detail');
        }
        fillTable();
        alert('Contact detail saved successfully');
    });
});

$('[name=up-remove]').on('click', function (e) {
    socket.emit('removeContactDetail', $('[name=up-name]').val(), function (err, res) {
        if (err) {
            console.log(err);
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        fillNameCombos();
        fillTable();
        alert('Contact detail remove successfully');
    });
});

function fillNameCombos() {
    $('[name=up-name]').find('option').remove();
    $('[name=sc-name]').find('option').remove();
    socket.emit('getContactDetail', function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        res.forEach(function (contactDetail) {
            $('[name=up-name]').append($('<option>', {
                val: contactDetail._id,
                text: contactDetail.res + ". " + contactDetail.name
            }));
            $('[name=sc-name]').append($('<option>', {
                val: contactDetail._id,
                text: contactDetail.res + ". " + contactDetail.name
            }));
        });
        $('[name=up-name]').trigger('change');
        $('[name=sc-name]').trigger('change');
    });
}

function fillTable() {
    var table = document.getElementById('contact-detail-table');
    while(table.rows.length > 1){
        table.deleteRow(-1);
    }
    socket.emit('getContactDetail', function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        res.forEach(function (contactDetail) {
            var row = table.insertRow(-1);
            row.insertCell(0).innerHTML = contactDetail.res + ". " + contactDetail.name;
            row.insertCell(1).innerHTML = contactDetail.designation;
            row.insertCell(2).innerHTML = contactDetail.email;
            row.insertCell(3).innerHTML = contactDetail.contact;
        });
    });
}

$('[name=up-name]').on('change', function (e) {
    clearUpdateForm();
    socket.emit('searchContactDetail', $('[name=up-name]').val(), function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        $('[name=up-designation]').val(res.designation);
        $('[name=up-email]').val(res.email);
        $('[name=up-contact]').val(res.contact);
    });
});

$('[name=sc-name]').on('change', function (e) {
    clearUpdateForm();
    socket.emit('searchContactDetail', $('[name=sc-name]').val(), function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        $('[name=sc-designation]').val(res.designation);
        $('[name=sc-email]').val(res.email);
        $('[name=sc-contact]').val(res.contact);
    });
});


function clearUpdateForm() {
    $('[name=up-designation]').val('');
    $('[name=up-email]').val('');
    $('[name=up-contact]').val('');
}

fillNameCombos();
fillTable();
