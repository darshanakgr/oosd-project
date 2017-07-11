/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-result');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.emit('getModuleCodes', function (moduleCodes) {
    if (moduleCodes) {
        moduleCodes.forEach(function (data) {
            $("[name=uf-module-code]").append($('<option>', {
                val: data._id,
                text: data.moduleCode + ":" + data.batch
            }));
            var id = $("[name=uf-module-code]").val();
            socket.emit('searchModule', id, function (module) {
                if (module) {
                    $('[name=uf-module-name]').val(module.moduleName);
                    $('[name=uf-credits]').val(module.credits);
                    $('[name=uf-batch]').val(module.batch);
                    $('[name=uf-semester]').val('Semester ' + module.semester);
                }
            });
        });
    }
});

$('[name=uf-module-code]').on('change', function () {
    var moduleCode = $("[name=uf-module-code]").val();
    socket.emit('searchModule', moduleCode, function (module) {
        if (module) {
            $('[name=uf-module-name]').val(module.moduleName);
            $('[name=uf-credits]').val(module.credits);
            $('[name=uf-batch]').val(module.batch);
            $('[name=uf-semester]').val('Semester ' + module.semester);
        }
    });
});

$(document).ready(function () {
    if (!window.File && !window.FileReader && !window.FileList && !window.Blob) {
        alert('The File APIs are not fully supported in this browser. Please use another browser');
    }
});

$('[name=uf-file-path]').on('change', function (e) {
    var file = e.target.files[0];
    var table = document.getElementById('preview-table');
    while(table.rows.length > 1){
        table.deleteRow(-1);
    }
    if (!file.name.endsWith('.xlsx')) {
        alert("Please select valid document format");
        $('[name=uf-file-path]').val("");
        $('#result-preview').hide();
    }else{
        var file = $('[name=uf-file-path]')[0].files[0];
        var reader = new FileReader();
        var name = file.name;
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            var sheetName = workbook.Workbook.Sheets[0].name;
            var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if(data.length > 0){
                if(data[0].Index && data[0].Grade){
                    $('#result-preview').show();
                    data.forEach(function (res) {
                        var row = table.insertRow(-1);
                        row.insertCell(0).innerHTML = res.Index;
                        row.insertCell(1).innerHTML = res.Grade;
                    });
                }else{
                    $('[name=uf-file-path]').val("");
                    alert('Not a Valid Format')
                }

            }else{
                alert("This file doesn't contain any data. Please check your file.");
            }
        };
        reader.readAsBinaryString(file);
    }
});

$('#upoload-file').on('submit', function (e) {
    e.preventDefault();

    socket.emit('checkExistence', {
        moduleCode:$('[name=uf-module-code]').val(),
        batch:$('[name=uf-batch]').val()
    }, function (err, res) {
        if(err){
            return alert(err);
        }
        if(!res){
           alert('No previous records');
        }else{
            alert('Previous records available');
        }
    });
    // var file = $('[name=uf-file-path]')[0].files[0];
    // var reader = new FileReader();
    // var name = file.name;
    // reader.onload = function(e) {
    //     var data = e.target.result;
    //     var workbook = XLSX.read(data, {type: 'binary'});
    //     var sheetName = workbook.Workbook.Sheets[0].name;
    //     var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    //     socket.emit('uploadResult', {
    //         moduleCode:$('[name=uf-module-code]').val(),
    //         batch:$('[name=uf-batch]').val(),
    //         date:new Date(),
    //         user:"Admin"
    //     }, data, function (err, res) {
    //         if(err){
    //             return alert("Unable to save result");
    //         }
    //         alert("Result saved")
    //     });
    // };
    // reader.readAsBinaryString(file);
});