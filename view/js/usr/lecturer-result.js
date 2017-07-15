/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-result');

var lecturerId = "596841d175487a521b3d2a46";
// var lecturerId = "5966fcbd96fcbd01bbcb1450";

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$(document).ready(function () {
    if (!window.File && !window.FileReader && !window.FileList && !window.Blob) {
        document.write('The File APIs are not fully supported in this browser. Please use another browser');
    }
});

$('[name=uf-module-code]').on('change', function () {
    var id = $("[name=uf-module-code]").val();
    socket.emit('searchModuleDetailById', id, function (err, res) {
        if (err) {
            return console.log(err);
        }
        if (res) {
            socket.emit('searchModule', res.moduleCode, function (error, module) {
                if (err) {
                    return console.log(error);
                }
                $('[name=uf-module-name]').val(module.moduleName);
                $('[name=uf-credits]').val(module.credits);
                $('[name=uf-batch]').val(res.batch);
                $('[name=uf-semester]').val('Semester ' + res.semester);
            });
        }
    });
});

$('[name=um-module-code]').on('change', function () {
    var id = $("[name=um-module-code]").val();
    socket.emit('searchModuleDetailById', id, function (err, res) {
        if (err) {
            return console.log(err);
        }
        if (res) {
            socket.emit('searchModule', res.moduleCode, function (error, module) {
                if (error) {
                    return console.log(error);
                }
                $('[name=um-module-name]').val(module.moduleName);
                $('[name=um-credits]').val(module.credits);
                $('[name=um-batch]').val(res.batch);
                $('[name=um-semester]').val('Semester ' + res.semester);
            });
        }
    });
});

$('[name=uf-file-path]').on('change', function (e) {
    var file = e.target.files[0];
    var table = document.getElementById('preview-table');
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    if (!file.name.endsWith('.xlsx')) {
        alert("Please select valid document format");
        $('[name=uf-file-path]').val("");
        $('#result-preview').hide();
    } else {
        var file = $('[name=uf-file-path]')[0].files[0];
        var reader = new FileReader();
        var name = file.name;
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            var sheetName = workbook.Workbook.Sheets[0].name;
            var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (data.length > 0) {
                if (data[0].Index && data[0].Grade) {
                    $('#result-preview').show();
                    data.forEach(function (res) {
                        var row = table.insertRow(-1);
                        row.insertCell(0).innerHTML = res.Index;
                        row.insertCell(1).innerHTML = res.Grade;
                    });
                } else {
                    $('[name=uf-file-path]').val("");
                    alert('Not a Valid Format')
                }

            } else {
                alert("This file doesn't contain any data. Please check your file.");
            }
        };
        reader.readAsBinaryString(file);
    }
});

$('#upoload-file').on('submit', function (e) {
    var moduleDetailId = $('[name=uf-module-code]').val();
    e.preventDefault();
    socket.emit('searchModuleDetailById', moduleDetailId, function (err, res) {
        if (err) {
            return alert('Unable to connect to server')
        }
        var moduleCode = res.moduleCode;
        socket.emit('checkExistence', {
            moduleDetailId:moduleDetailId
        }, function (err, res) {
            if (err) {
                return alert(err);
            }
            if (res.length) {
                if (confirm('Previous records available. Do you want to replace existing results?')) {
                    var file = $('[name=uf-file-path]')[0].files[0];
                    var reader = new FileReader();
                    var name = file.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {type: 'binary'});
                        var sheetName = workbook.Workbook.Sheets[0].name;
                        var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                        console.log(data);
                        socket.emit('updateResult', res[0]._id, {
                            moduleDetailId: moduleDetailId,
                            date: new Date(),
                            user: lecturerId
                        }, data, function (err, res) {
                            if (err) {
                                console.log(err);
                                return alert("Unable to save result");
                            }
                            alert(res.insertedCount + " results saved")
                        });
                    };
                    reader.readAsBinaryString(file);
                } else {
                    alert('Process aborted')
                }
            } else {
                var file = $('[name=uf-file-path]')[0].files[0];
                var reader = new FileReader();
                var name = file.name;
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {type: 'binary'});
                    var sheetName = workbook.Workbook.Sheets[0].name;
                    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    socket.emit('uploadResult', {
                        moduleCode: moduleCode,
                        moduleDetailId: moduleDetailId,
                        date: new Date(),
                        user: lecturerId
                    }, data, function (err, res) {
                        if (err) {
                            console.log(err);
                            return alert("Unable to save result");
                        }
                        alert(res.insertedCount + " results saved")
                    });
                };
                reader.readAsBinaryString(file);
            }
        });
    });
});

$('[name=submit-btn]').on('click', function () {
    var indexNo = $('[name=index-no]').val();
    var grade = $('[name=grade]').val();
    var res = findDuplicate(indexNo);
    if (res == -1) {
        var table = document.getElementById('result-entry-table');
        var row = table.insertRow(-1);
        row.insertCell(0).innerHTML = indexNo;
        row.insertCell(1).innerHTML = grade;
    } else {
        if (confirm('Do you want to replace the previous result?')) {
            var table = document.getElementById('result-entry-table');
            table.rows[res].cells[1].innerHTML = grade;
        }
    }
});

$('#enter-manually-form').on('submit', function (e) {
    var moduleDetailId = $('[name=um-module-code]').val();
    e.preventDefault();
    var data = traveseResultTable();
    socket.emit('searchModuleDetailById', moduleDetailId, function (err, res) {
        if (err) {
            return alert('Unable to connect to server')
        }
        var moduleCode = res.moduleCode;
        socket.emit('checkExistence', {
            moduleDetailId: moduleDetailId,
        }, function (err, res) {
            if (err) {
                return alert(err);
            }
            if (res.length) {
                if (confirm('Previous records available. Do you want to replace existing results?')) {
                    socket.emit('updateResult', res[0]._id, {
                        moduleDetailId: moduleDetailId,
                        date: new Date(),
                        user: lecturerId
                    }, data, function (err, res) {
                        if (err) {
                            console.log(err);
                            return alert("Unable to save result");
                        }
                        alert(res.insertedCount + " results saved")
                    });
                } else {
                    alert('Process aborted')
                }
            } else {
                socket.emit('uploadResult', {
                    moduleCode: moduleCode,
                    moduleDetailId: moduleDetailId,
                    date: new Date(),
                    user: lecturerId
                }, data, function (err, res) {
                    if (err) {
                        console.log(err);
                        return alert("Unable to save result");
                    }
                    alert(res.insertedCount + " results saved")
                });
            }
        });
    });
});

function fillModuleCodeCombo() {
    socket.emit('searchByLectureId', lecturerId, function (err, res) {
        if (err) {
            return console.log(err);
        }
        if (res) {
            res.forEach(function (module) {
                $("[name=uf-module-code]").append($('<option>', {
                    val: module._id,
                    text: module.moduleCode + " : " + module.batch
                }));
                $("[name=um-module-code]").append($('<option>', {
                    val: module._id,
                    text: module.moduleCode + " : " + module.batch
                }));
                $('[name=uf-module-code]').trigger('change');
                $('[name=um-module-code]').trigger('change');
            });
        }
    });
}

function findDuplicate(indexNo) {
    var table = document.getElementById('result-entry-table');
    for (var i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerHTML == indexNo) {
            return i;
        }
    }
    return -1;
}

function traveseResultTable() {
    var arr = [];
    var table = document.getElementById('result-entry-table');
    for (var i = 1; i < table.rows.length; i++) {
        arr.push({
            Index: table.rows[i].cells[0].innerHTML,
            Grade: table.rows[i].cells[1].innerHTML
        });
    }
    return arr;
}

function fillResultHistoryTable() {
    var table = document.getElementById('history-table');
    while(table.rows.length > 1){
        table.deleteRow(-1);
    }

    socket.emit('getResultHistoryById', lecturerId, function (err, res) {
        if(err){
            return console.log(err);;
        }
        res.forEach(function (resultHistory) {
            socket.emit('searchModule', resultHistory.moduleCode, function (error, module) {
                if (error) {
                    return console.log(error);
                }
                socket.emit('searchModuleDetailById', resultHistory.moduleDetailId, function (error, moduleDetail) {
                    if (error) {
                        return console.log(error);
                    }
                    var row = table.insertRow(-1);
                    row.insertCell(0).innerHTML = resultHistory.date.split('T')[0];
                    row.insertCell(1).innerHTML = module.moduleCode;
                    row.insertCell(2).innerHTML = module.moduleName;
                    row.insertCell(3).innerHTML = module.credits;
                    row.insertCell(4).innerHTML = moduleDetail.batch;
                    row.insertCell(5).innerHTML = moduleDetail.semester;
                });
            });
        });

    });

}

fillModuleCodeCombo();
fillResultHistoryTable();
