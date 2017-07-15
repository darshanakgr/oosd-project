/**
 * Created by drox2014 on 7/9/2017.
 */
var socket = io('/student-result');

var studentId = "150501A";

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

function fillResultTable() {
    var totalGPA = 0;
    var totalCredits = 0;
    var table = document.getElementById('result-table');
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    while(table.rows.length > 1){
        table.deleteRow(-1);
    }
    socket.emit('getAllResultById', studentId, function (err, res) {
        if(err){
            return console.log(err);
        }
        res.forEach(function (result) {
            socket.emit('searchModule', result.moduleCode, function (err, module) {
                var row = table.insertRow(-1);
                row.insertCell(0).innerHTML = result.moduleCode;
                row.insertCell(1).innerHTML = module.moduleName;
                row.insertCell(2).innerHTML = module.credits;
                row.insertCell(3).innerHTML = result.grade;
                totalCredits += module.credits;
                totalGPA += getCredit(result.grade, arr) * module.credits;
                $('[name=total-gpa]').val(totalGPA/totalCredits);
            });
        });
        setTimeout(function(){
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
        },1000);
    });

}

function getCredit(grade, arr) {
    switch (grade){
        case "A+":
            arr[0]++;
            return 4.2;
        case "A":
            arr[1]++;
            return 4.0;
        case "A-":
            arr[2]++;
            return 3.7;
        case "B+":
            arr[3]++;
            return 3.3;
        case "B":
            arr[4]++;
            return 3.0;
        case "B-":
            arr[5]++;
            return 2.7;
        case "C+":
            arr[6]++;
            return 2.3;
        case "C":
            arr[7]++;
            return 2.0;
        case "C-":
            arr[8]++;
            return 1.5;
        case "D":
            arr[9]++;
            return 1.0;
        case "F":
            arr[10]++;
            return 0.0;
        default:
            arr[11]++;
            return 0.0;
    }
}

fillResultTable();