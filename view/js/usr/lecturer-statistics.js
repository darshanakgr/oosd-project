/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/lecturer-statistics');

var lecturerId = "59675c9396fcbd01bbcb3271";
// var lecturerId = "5966fcbd96fcbd01bbcb1450";

socket.on('connect', function () {
    console.log('Connected to server');
    $('#chartActivity').empty();
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$('[name=module-code]').on('change', function () {
    var id = $("[name=module-code]").val();
    var table = document.getElementById('module-detail-table');
    while(table.rows.length > 0){
        table.deleteRow(-1);
    }
    var resultTable = document.getElementById('result-table');
    while(resultTable.rows.length > 1){
        resultTable.deleteRow(-1);
    }
    socket.emit('searchModuleDetailById', id, function (err, res) {
        if (err) {
            return alert(err.errors[Object.keys(err.errors)[0]].message);
        }
        if (res) {
            socket.emit('searchModule', res.moduleCode, function (error, module) {
                if (err) {
                    return console.log(error);
                }
                var moduleCode = table.insertRow(-1);
                moduleCode.insertCell(0).innerHTML = "Module Code";
                moduleCode.insertCell(1).innerHTML = module.moduleCode;
                var moduleName= table.insertRow(-1);
                moduleName.insertCell(0).innerHTML = "Module Name";
                moduleName.insertCell(1).innerHTML = module.moduleName;
                var credits= table.insertRow(-1);
                credits.insertCell(0).innerHTML = "Credits";
                credits.insertCell(1).innerHTML = module.credits;
                var batch = table.insertRow(-1);
                batch.insertCell(0).innerHTML = "Batch";
                batch.insertCell(1).innerHTML = res.batch;
                var semester= table.insertRow(-1);
                semester.insertCell(0).innerHTML = "Semester";
                semester.insertCell(1).innerHTML = res.semester;
            });
            socket.emit('getResultId', id, function (error, resultHistory) {
                if (err) {
                    return console.log(error);
                }
                if(resultHistory){
                    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    socket.emit('getResultsByResultId', resultHistory._id, function (error, res) {
                        if (err) {
                            return console.log(error);
                        }
                        res.forEach(function (result) {
                            var row = resultTable.insertRow(-1);
                            row.insertCell(0).innerHTML = result.index;
                            row.insertCell(1).innerHTML = "dadsa";
                            row.insertCell(2).innerHTML = result.grade;
                            fillArray(result.grade, arr);
                            plotGraph(arr);
                        });
                    });
                }
            });

        }
    });
});

function fillModuleCodeCombo() {
    socket.emit('getAllModules', function (err, res) {
        if (err) {
            return alert('Unable to load all Modules')
        }
        if (res) {
            res.forEach(function (module) {
                socket.emit('searchModuleDetailById', module.moduleDetailId, function (err, moduleDetail) {
                    $("[name=module-code]").append($('<option>', {
                        val: module.moduleDetailId,
                        text: module.moduleCode + " : " + moduleDetail.batch
                    }));

                });
            });
        }
        setTimeout(function () {
            $('[name=module-code]').trigger('change');
        }, 1000);
    });
}

function plotGraph(arr) {
    $('#chartActivity').empty();
    var data = {
        labels: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'I-WE'],
        series: [arr]
    };

    var options = {
        seriesBarDistance: 5,
        axisX: {
            showGrid: false
        },
        height: "245px"
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];
    Chartist.Bar('#chartActivity', data, options, responsiveOptions);
}
//
// function findDuplicate(indexNo) {
//     var table = document.getElementById('result-entry-table');
//     for (var i = 1; i < table.rows.length; i++) {
//         if (table.rows[i].cells[0].innerHTML == indexNo) {
//             return i;
//         }
//     }
//     return -1;
// }
//
// function traverseResultTable() {
//     var arr = [];
//     var table = document.getElementById('result-entry-table');
//     for (var i = 1; i < table.rows.length; i++) {
//         arr.push({
//             Index: table.rows[i].cells[0].innerHTML,
//             Grade: table.rows[i].cells[1].innerHTML
//         });
//     }
//     return arr;
// }
//
// function fillResultHistoryTable() {
//     var table = document.getElementById('history-table');
//     while(table.rows.length > 1){
//         table.deleteRow(-1);
//     }
//
//     socket.emit('getResultHistoryById', lecturerId, function (err, res) {
//         if(err){
//             return console.log(err);;
//         }
//         res.forEach(function (resultHistory) {
//             socket.emit('searchModule', resultHistory.moduleCode, function (error, module) {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 socket.emit('searchModuleDetailById', resultHistory.moduleDetailId, function (error, moduleDetail) {
//                     if (error) {
//                         return console.log(error);
//                     }
//                     var row = table.insertRow(-1);
//                     row.insertCell(0).innerHTML = resultHistory.date.split('T')[0];
//                     row.insertCell(1).innerHTML = module.moduleCode;
//                     row.insertCell(2).innerHTML = module.moduleName;
//                     row.insertCell(3).innerHTML = module.credits;
//                     row.insertCell(4).innerHTML = moduleDetail.batch;
//                     row.insertCell(5).innerHTML = moduleDetail.semester;
//                 });
//             });
//         });
//
//     });
//
// }
//

function fillArray(grade, arr) {
    switch (grade){
        case "A+":
            arr[0]++;
            break;
        case "A":
            arr[1]++;
            break;
        case "A-":
            arr[2]++;
            break;
        case "B+":
            arr[3]++;
            break;
        case "B":
            arr[4]++;
            break;
        case "B-":
            arr[5]++;
            break;
        case "C+":
            arr[6]++;
            break;
        case "C":
            arr[7]++;
            break;
        case "C-":
            arr[8]++;
            break;
        case "D":
            arr[9]++;
            break;
        case "F":
            arr[10]++;
            break;
        default:
            arr[11]++;
            break;
    }
}

fillModuleCodeCombo();
// fillResultHistoryTable();
