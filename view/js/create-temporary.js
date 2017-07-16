/**
 * Created by Damitha on 6/27/2017.
 */
var thisuser;
var targetgrp=[];
var alltargets=[];
var checkNum=0;


var socket=io('/create-temporary');
socket.on('connect',function(){
    console.log('Connected to server');
});

function finishTemp() {
    if(confirm('Do you want to finalize the notice?'))
    {
        location.href='main-notices.html';
        var newTitile = document.getElementById("inputTitle").value;
        var newContent = quill.getContents();

        socket.emit('createTempNotice',{
            title: newTitile,
            content: newContent,
            sender:thisuser.name,
            senderID: loggedID,
            receivers: targetgrp,
            approver:sessionStorage.getItem('approverID')
        });
    }
}

function genText(){
    document.getElementById("typeText").innerHTML="Make a General Notice";
}

function spcText(){
    document.getElementById("typeText").innerHTML="Make a Specific Notice";
}

function doType() {
    if (document.getElementById("cbType").checked)
    {
        spcText();
        showSpeci()
    }
    else
    {
        genText();
        hideSpeci()
    }

}

function getCreator() {
    socket.emit('getNoticeCreator',{
        index:sessionStorage.getItem('loggedID')
    }, function (err, user) {
        if(err){
            return console.log(err);
        }
        thisuser=user;
        if(user.type=="Student"){
            forceReturn();
        }
        var position = user.name+'\n'+user.type +' - '+user.batch.department +' '+ user.batch.year;
        quill.setText( 'Notice\nMain content of the intended notice.\n'+ position );
        quill.formatLine(1, 2, {'align': 'center', 'header':'h1' , 'bold':'bold'});
        quill.formatText(0, 6, {'underline': true,'bold':true});
        quill.formatLine(1, 2, 'underline',true);
        quill.formatText(11, 9, {'bold':true});
        quill.formatLine(8, 9, {'align': 'center'});
        quill.formatLine(quill.getLength()- position.length - 1, quill.getLength()-1-1, {'align': 'right'});

    });
}

function setTitle() {
    var position = thisuser.name + '\n' + thisuser.type + ' - ' + thisuser.batch.department + ' ' + thisuser.batch.year;
    if (((quill.getLength()-position.length) == 45)&&quill.getText().slice(0,6)=="Notice")
    {
        quill.setText(document.getElementById("inputTitle").value + '\nMain content of the intended notice.\n' + position);
        quill.formatLine(1, 0, {'align': 'center', 'header': 'h1'});
        quill.formatText(document.getElementById("inputTitle").value.length+5, 9, {'bold':true});
        quill.formatText(0, document.getElementById("inputTitle").value.length, {'underline': true, 'bold': true});
        quill.formatLine(1, document.getElementById("inputTitle").value.length + 1, {'align': 'center'});
        quill.formatLine(quill.getLength() - position.length - 1, quill.getLength() - 1 - 1, {'align': 'right'});
    }
}

function showSpeci() {
    document.getElementById("specificOptions").style.display='block';
}

function hideSpeci() {
    document.getElementById("specificOptions").style.display='none';
}

function sortSelecTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeSelectionTbl");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function onListChange() {
    document.getElementById("loaderBody").style.display = "block";
    document.getElementById("selectionBody").style.display = "none";
    var eD=document.getElementById("crtRegularDepartment");
    var eB=document.getElementById("crtRegularBatch");
    var eDval=eD.options[eD.selectedIndex].value;
    var eBval=eB.options[eB.selectedIndex].value
    if ((eBval=="All")&&(eDval=="All")){
        console.log("All");
        loadAll();
    }
    else if (eBval=="All") {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('getUsersDept',eDval,
            function (err, list) {
                if(err){
                    return console.log(err);
                }
                loadList(list);
            });
        setTimeout(sortTbl,500);
        socket.emit('getAuthorizer',eDval
            , function (err, list) {
                if(err){
                    return console.log(err);
                }
                sessionStorage.setItem('approverID',list.authorizer);
                //console.log(list.authorizer)
            });
    }
    else if(eDval=="All") {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('getUsersBatch',eBval,
            function (err, list) {
                if(err){
                    return console.log(err);
                }
                loadList(list);
            });
        setTimeout(sortTbl,500);
        socket.emit('getAuthorizer',"All"
            , function (err, list) {
                if(err){
                    return console.log(err);
                }
                sessionStorage.setItem('approverID',list.authorizer);
                //console.log(list.authorizer)
            });
    }
    else {
        document.getElementById('checkGrp').innerHTML="";
        targetgrp=[];
        alltargets=[];
        checkNum=0;
        socket.emit('getUsersDept&Batch',{dept:eDval,yar:eBval},
            function (err, list) {
                if(err){
                    return console.log(err);
                }
                loadList(list);
            });
        setTimeout(sortTbl,500);
        socket.emit('getAuthorizer',eDval
            , function (err, list) {
                if(err){
                    return console.log(err);
                }
                sessionStorage.setItem('approverID',list.authorizer);
                //console.log(list.authorizer)
            });
        //console.log(eD.options[eD.selectedIndex].value+" "+eB.options[eB.selectedIndex].value);
    }
    setTimeout(showChoice,600);
}

function loadList(list) {
    for (var indx = 0; indx < list.users.length; ++indx) {
        var userDetails=list.users[indx];
        alltargets.push(userDetails.iD);
        if (userDetails.iD==loggedID){
            var toADD = "<tr onclick='selectRow(this,"+checkNum+")' data-toggle='modal' data-target='#displayModal' style='cursor: pointer'><td><input onclick='flipCheckItself(this,"+checkNum+")' type='checkbox' name='optionsCheckboxes' class='checkbox'></td><td>"+userDetails.iD+"</td><td>"+userDetails.name+"</td> <td>"+userDetails.batch.department+"</td><td>"+userDetails.batch.year+"</td><td>"+userDetails.type+"</td></tr>";
        }
        else {
            targetgrp.push(userDetails.iD);
            var toADD = "<tr onclick='selectRow(this," + checkNum + ")' data-toggle='modal' data-target='#displayModal' style='cursor: pointer'><td><input onclick='flipCheckItself(this," + checkNum + ")' type='checkbox' name='optionsCheckboxes' class='checkbox' checked='checked'></td><td>" + userDetails.iD + "</td><td>" + userDetails.name + "</td> <td>" + userDetails.batch.department + "</td><td>" + userDetails.batch.year + "</td><td>" + userDetails.type + "</td></tr>";
        }
        checkNum+=1;
        $("#checkGrp").append(toADD);
    }
}

function loadAll() {
    document.getElementById('checkGrp').innerHTML="";
    targetgrp=[];
    alltargets=[];
    checkNum=0;
    socket.emit('getAllUsers',{
    }, function (err, list) {
        if(err){
            return console.log(err);
        }
        loadList(list);
    });

    socket.emit('getAuthorizer',"All"
        , function (err, list) {
            if(err){
                return console.log(err);
            }
            sessionStorage.setItem('approverID',list.authorizer);
            //console.log(list.authorizer)
        });
    setTimeout(sortTbl,500);
    setTimeout(showChoice,600);
}

function getSelectionList() {
    socket.emit('getList',{
        iD:"noticeSelection"
    }, function (err, listItems) {
        if(err){
            return console.log(err);
        }
        for (var indx = 0; indx < listItems.department.length; ++indx) {
            var deptListItem = '<option>'+listItems.department[indx]+'</option>';
            $("#crtRegularDepartment").append(deptListItem);
            //console.log(listItems.departments[indx]);
        }

        for (var indx2 = 0; indx2 < listItems.year.length; ++indx2) {
            var batchListItem = '<option>'+listItems.year[indx2]+'</option>';
            $("#crtRegularBatch").append(batchListItem);
            //console.log(listItems.years[indx2]);
        }
    });
}

function showChoice() {
    document.getElementById("loaderBody").style.display = "none";
    document.getElementById("selectionBody").style.display = "block";
}

function selectRow(row,id) {
    var firstInput = row.getElementsByTagName('input')[0];
    flipCheck(firstInput,id);
    //console.log(alltargets[id]);
}

function flipCheck(firstInput,id) {
    firstInput.checked = !firstInput.checked;
    doTarget(alltargets[id]);
}

function flipCheckItself(firstInput,id) {
    firstInput.checked = !firstInput.checked;
}

function doTarget(inex){
    if (targetgrp.indexOf(inex)==-1){
        targetgrp.push(inex);
    }
    else{
        targetgrp.splice(targetgrp.indexOf(inex),1);
    }
    console.log(targetgrp);
}

function forceReturn(){
    alert("Restricted Access!");
    location.href='main-notices.html';
}

