/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-module');

var lecturerId = "59675c9396fcbd01bbcb3271";
// var lecturerId = "5966fcbd96fcbd01bbcb1450";

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$('#create-new-module').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createNewModule', {
        moduleCode: $('[name=cn-moduleCode]').val(),
        moduleName: $('[name=cn-moduleName]').val(),
        credits: parseFloat($('[name=cn-credits]').val())
    }, function (err, res) {
        if (err) {
            return alert('Unable to create new module');
        }

        alert("New module is created successfully");
        clearCreateNewModule();
        fillTable();
    });
});

$('[name=up-moduleCode]').keydown(function () {
    clearUpdateModule();
})

$('#search-btn').on('click', function () {
    var moduleCode = $('[name=up-moduleCode]').val();
    clearUpdateModule();
    socket.emit('searchModule', moduleCode, function (err, res) {
        if (err) {
            return alert('Unable to find module');
        }
        if (res) {
            $('[name=up-moduleName]').val(res.moduleName);
            $('[name=up-credits]').val(res.credits);
        } else {
            alert('No result found...')
        }
    });
});

$('#update-module').on('submit', function (e) {
    var moduleCode = $('[name=up-moduleCode]').val();
    e.preventDefault();
    socket.emit('updateModule', moduleCode, {
        moduleName: $('[name=up-moduleName]').val(),
        credits: parseFloat($('[name=up-credits]').val())
    }, function (err, res) {
        if (err) {
            return alert('Failed to update module details');
        }
        alert("Updated module successfully");
    });

});

$('[name=me-module-code]').on('change', function () {
    var moduleCode = $('[name=me-module-code]').val();
    socket.emit('searchModule', moduleCode, function (err, res) {
        if (err) {
            return alert('Unable to find module');
        }
        if (res) {
            $('[name=me-module-name]').val(res.moduleName);
        } else {
            alert('No result found...')
        }
    });
});

$('#new-enrollment-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createNewModuleDetail', {
        moduleCode: $('[name=me-module-code]').val(),
        lecturerId: lecturerId,
        batch: $('[name=me-batch]').val(),
        semester: $('[name=me-semester]').val()
    }, function (err, res) {
        if (err) {
            return alert('Failed to complete enrollment');
        }
        alert("Module enrollment completed");
        fillEnrollmentTable();
    });
});

function fillModuleCombo() {
    $('[name=me-module-code]').find('option').remove();
    socket.emit('getModuleCodes', function (err, res) {
        if (err) {
            return alert('Unable to connect to server')
        }
        res.forEach(function (moduleCode) {
            $('[name=me-module-code]').append($('<option>', {
                val: moduleCode.moduleCode,
                text: moduleCode.moduleCode
            }));
        });
        var moduleCode = $('[name=me-module-code]').val();
        socket.emit('searchModule', moduleCode, function (err, res) {
            if (err) {
                return alert('Unable to find module');
            }
            if (res) {
                $('[name=me-module-name]').val(res.moduleName);
            }
        });
    });
}

function fillEnrollmentTable() {
    var table = document.getElementById('current-enrollment-table');
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    socket.emit('searchByLectureId', lecturerId, function (err, res) {
        if (err) {
            return console.log(err);
            ;
        }
        res.forEach(function (module) {
            var row = table.insertRow(-1);
            socket.emit('searchModule', module.moduleCode, function (err, res) {
                if (res) {
                    row.insertCell(0).innerHTML = module.moduleCode;
                    row.insertCell(1).innerHTML = res.moduleName;
                    row.insertCell(2).innerHTML = res.credits;
                    row.insertCell(3).innerHTML = module.batch;
                    row.insertCell(4).innerHTML = module.semester;
                    var btn = document.createElement('input');
                    checkExitancOfHistory(module._id, btn);
                    btn.type = "button";
                    btn.className = "btn btn-fill btn-danger";
                    btn.value = "un-enroll";
                    btn.onclick = function () {
                        if (confirm('Do you want to continue?')) {
                            socket.emit('removeModuleDetail', {
                                moduleCode: module.moduleCode,
                                lecturerId: module.lecturerId
                            }, function (err, res) {
                                if (err) {
                                    return console.log(err);
                                }
                                fillEnrollmentTable();
                            });
                        }

                    };
                    btn.setAttribute('data-id', module.moduleCode);
                    row.insertCell(5).appendChild(btn);
                }
            });
        });
    });
}

function checkExitancOfHistory(moduleDetailId, btn) {
    socket.emit('searchResultHistoryByModuleDetailId', moduleDetailId, function (err, res) {
        if (err) {
            console.log(err);
            return true;
        }
        if (res) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

function fillTable() {
    socket.emit('getAllModules', function (err, res) {
        var table = document.getElementById("module-table");
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
        if (res) {
            res.forEach(function (module, index) {
                var rowData = table.insertRow(-1);
                rowData.insertCell(0).innerHTML = module.moduleCode;
                rowData.insertCell(1).innerHTML = module.moduleName;
                rowData.insertCell(2).innerHTML = module.credits;
            });
        }
    });
}

function fillBatchCombo() {
    $('[name=me-batch]').find('option').remove();
    socket.emit('getAllBatches', function (err, res) {
        if (err) {
            return console.log(err);
        }
        res.forEach(function (batch) {
            $('[name=me-batch]').append($('<option>', {
                val: batch.batchName,
                text: batch.batchName
            }))
        });
    });
}

function clearUpdateModule() {
    $('[name=up-moduleName]').val("");
    $('[name=up-credits]').val("");
}

function clearCreateNewModule() {
    $('[name=cn-moduleCode]').val("");
    $('[name=cn-moduleName]').val("");
    $('[name=cn-credits]').val("");
}

fillTable();
fillModuleCombo();
fillBatchCombo();
fillEnrollmentTable();
