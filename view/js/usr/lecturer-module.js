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

    socket.emit('createNewModule', {
        moduleCode:$('[name=cn-moduleCode]').val(),
        moduleName:$('[name=cn-moduleName]').val(),
        credits:parseFloat($('[name=cn-credits]').val())
    }, function (err, res) {
        if(err){
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
    socket.emit('searchModule', moduleCode, function(err, res){
        if(err){
            return alert('Unable to find module');
        }
        console.log(res);
        if(res){
            $('[name=up-moduleName]').val(res.moduleName);
            $('[name=up-credits]').val(res.credits);
        }else{
            alert('No result found...')
        }
    });
});

$('#update-module').on('submit', function (e) {
    var moduleCode = $('[name=up-moduleCode]').val();
    e.preventDefault();
    socket.emit('updateModule', moduleCode, {
        moduleName:$('[name=up-moduleName]').val(),
        credits:parseFloat($('[name=up-credits]').val())
    }, function(err, res){
        if(err){
            return alert('Failed to update module details');
        }
        alert("Updated module successfully");
    });

});

function fillTable() {
    socket.emit('getAllModules', function(err, res){
        var table = document.getElementById("module-table");
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
        if(res){
            res.forEach(function (module, index) {
                var rowData = table.insertRow(-1);
                rowData.insertCell(0).innerHTML = module.moduleCode;
                rowData.insertCell(1).innerHTML = module.moduleName;
                rowData.insertCell(2).innerHTML = module.credits;
            });
        }
    });
}
//
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


