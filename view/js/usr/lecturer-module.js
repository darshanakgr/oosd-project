/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-module');

socket.on('connect', function () {
    console.log('Connected to server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

$('#create-new-module').on('submit', function (e) {
    e.preventDefault();
    var module = {
        moduleCode:$('[name=cn-moduleCode]').val(),
        moduleName:$('[name=cn-moduleName]').val(),
        credits:parseFloat($('[name=cn-credits]').val()),
        batch:$('[name=cn-batch]').val(),
        semester:parseFloat($('[name=cn-semester]').val())
    };

    socket.emit('createNewModule', module, function (message) {
        alert(message);
    });
});

$('[name=up-moduleCode]').keydown(function () {
    clearUpdateModule();
})

$('#search-btn').on('click', function () {
    var moduleCode = $('[name=up-moduleCode]').val();
    clearUpdateModule();
    socket.emit('searchModule', moduleCode, function(module){
        if(module){
            $('[name=up-moduleName]').val(module.moduleName);
            $('[name=up-credits]').val(module.credits);
            $('[name=up-batch]').val(module.batch);
            $('[name=up-semester]').val(module.semester);
        }else{
            alert('Unable to find module...')
        }
    });
});

$('#update-module').on('submit', function (e) {
    var moduleCode = $('[name=up-moduleCode]').val();
    e.preventDefault();
    var module = {
        moduleName:$('[name=up-moduleName]').val(),
        credits:parseFloat($('[name=up-credits]').val()),
        batch:$('[name=up-batch]').val(),
        semester:parseFloat($('[name=up-semester]').val())
    };

    socket.emit('updateModule', moduleCode, module, function(message){
        if(module){
            return alert("Updated module successfully");
        }
        return alert('Failed to update module details');
    });

});

function fillTable() {
    socket.emit('getAllModules', function(modules){
        var table = document.getElementById("module-table");
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
        if(modules){
            modules.forEach(function (module, index) {
                var rowData = table.insertRow(-1);
                rowData.insertCell(0).innerHTML = module.moduleCode;
                rowData.insertCell(1).innerHTML = module.moduleName;
                rowData.insertCell(2).innerHTML = module.credits;
                rowData.insertCell(3).innerHTML = module.batch;
                rowData.insertCell(4).innerHTML = module.semester;
            });
        }
    });
}

function clearUpdateModule() {
    $('[name=up-moduleName]').val("");
    $('[name=up-credits]').val("");
    $('[name=up-batch]').val("");
    $('[name=up-semester]').val("");
}

function clearCreateNewModule() {
    $('[name=cn-moduleCode]').val("");
    $('[name=cn-moduleName]').val("");
    $('[name=cn-credits]').val("");
    $('[name=cn-batch]').val("");
    $('[name=cn-semester]').val("");
}

fillTable();


