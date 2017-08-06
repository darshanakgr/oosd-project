// /**
//  * Created by Damitha on 6/27/2017.
//  */
// // Get the modal

var socket=io('/main-notices');
socket.on('connect',function(){
    console.log('Connected to server');
});

var loggedID;

var indNum=0;
var indSent=0;
var indAuth=0;
var indAD=0;
var indADSent=0;
var indADAuth=0;
var indEvent=0;
var indEventSent=0;
var indEventAuth=0;
var indGenView=0;
var isgenView=false;
var intervalScope;

var arrayDetailNotices=[];
var arraySentNotices=[];
var arrayAuthNotices=[];
var arrayADNotices=[];
var arraySentADs=[];
var arrayAuthADs=[];
var arrayDetailEvents=[];
var arraySentEvents=[];
var arrayAuthEvents=[];
var arrayGenView=[];


var modal = document.getElementById('newTypeModal');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

//Assign user privileges
// socket.emit('getNoticeUser', {
//     index:sessionStorage.getItem('loggedID')
// }, function (err, res) {
//     if(err){
//         return console.log(err);
//     }
// });

//Refresh Notices
function  refresh() {
    clearLists();
    noInbox();
    if(loggedID!=null) {
        socket.emit('getNoticeUser', {
            index: loggedID,
        }, function (err, res) {
            if (err) {
                return console.log(err);
            }
            if (res != null) {
                loadNoticesList(res);
            }
        });
    }

    setTimeout(loadADs,500);
    setTimeout(sortBoth,500);
    setTimeout(sortGenView,500);
    setTimeout(showPage,600);
}

//Search for new notices

function searchNotice() {
    clearLists();
    noInbox();

    if(loggedID!=null) {
        socket.emit('getNoticeUser', {
            index: loggedID,
        }, function (err, res) {
            if (err) {
                return console.log(err);
            }
            //console.log(res);
            if (res != null) {
                if (document.getElementById("searchInput").value != "") {
                    searchNoticesList(res, document.getElementById("searchInput").value);
                }
                else {
                    loadNoticesList(res);
                }
            }
        });
    }

    //search: document.getElementById("searchInput").value

    setTimeout(loadADs, 500);
    setTimeout(sortBoth, 500);
    setTimeout(sortGenView,500);
    setTimeout(showSearchPage, 600);

}

function clearLists(){
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    document.getElementById("searchDiv").style.display="none";

    arrayDetailNotices = [];
    indNum = 0;
    document.getElementById("noticeDetailTable").innerHTML = "";

    arrayADNotices = [];
    indAD = 0;

    arraySentADs = [];
    indADSent = 0;

    arrayAuthADs = [];
    indADAuth = 0;

    arrayDetailEvents = [];
    indEvent = 0;

    arraySentEvents = [];
    indEventSent = 0;

    arrayAuthEvents = [];
    indEventAuth = 0;

    arrayGenView=[];
}

function loadNoticesList(user){
    if((user.intended_ID!=undefined)&&(user.intended_ID.length>0)) {
        for (var indx = 0; indx < user.intended_ID.length; ++indx) {
            socket.emit('getBriefNoticeWithRead', {
                iD: user.intended_ID[indx].iD,
                read: user.intended_ID[indx].read
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                if (res.notice.state =="approved"){
                    yesInbox();
                    var noticeDetailItem;
                    if(res.read) {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer;font-weight:bolder' onclick='clickDetail(this," + indNum + ")'><td>" + res.notice.sender + "</td><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td> </tr>";
                    }
                    else{
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickDetail(this," + indNum + ")'><td>" + res.notice.sender + "</td><td>" +res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td> </tr>";
                    }
                    $("#noticeDetailTable").append(noticeDetailItem);
                    indNum+=1;
                    arrayDetailNotices.push(res.notice._id);
                    arrayGenView.push([dateFromObjectId(res.notice._id).toLocaleString(),res.notice._id,res.notice.type]);
                }

            });
        }
    }

    if((user.aD_ID!=undefined)&&(user.aD_ID.length>0)) {
        for (var indx4 = 0; indx4 < user.aD_ID.length; ++indx4) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getBriefAdvertisement', {
                iD: user.aD_ID[indx4]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                // if ((res.state =="approved")||(res.state =="new")) {
                if ((res.state =="approved")) {
                    arrayADNotices.push([res._id,"AD"]);
                    arrayGenView.push([dateFromObjectId(res._id).toLocaleString(),res._id,res.type]);
                    if ((Date.parse(res.exDate)-(new Date()))<604800000){
                        arrayADNotices.push([res._id,"AD"]);
                    }
                }
            });
        }
    }

    if((user.event_ID!=undefined)&&(user.event_ID.length>0)) {
        for (var indx7 = 0; indx7 < user.event_ID.length; ++indx7) {
            //console.log(noticeList.intended[indx]);
            socket.emit('getBriefEventWithRead', {
                iD: user.event_ID[indx7].iD,
                read: user.event_ID[indx7].read
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.event);
                // if ((res.event.state =="approved")||(res.event.state =="new")){
                if ((res.event.state =="approved")){
                    yesInbox();
                    var noticeDetailItem;
                    if(res.read) {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer; font-weight:bolder' onclick='clickEventDetail(this," + indEvent + ")'><td>" + res.event.sender + "</td><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td> </tr>";
                    }else {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickEventDetail(this," + indEvent + ")'><td>" + res.event.sender + "</td><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td> </tr>";
                    }
                    $("#noticeDetailTable").append(noticeDetailItem);
                    indEvent+=1;
                    arrayDetailEvents.push(res.event._id);
                    arrayADNotices.push([res.event._id,"Event"]);
                    arrayGenView.push([dateFromObjectId(res.event._id).toLocaleString(),res.event._id,res.event.type]);
                    if ((Date.parse(res.event.exDate)-(new Date()))<604800000){
                        arrayADNotices.push([res.event._id,"Event"]);
                    }
                }
            });
        }
    }

}

function searchNoticesList(user,searchedby){
    if((user.intended_ID!=undefined)&&(user.intended_ID.length>0)) {
        for (var indx = 0; indx < user.intended_ID.length; ++indx) {
            //console.log(noticeList.intended[indx]);
            socket.emit('searchBriefNoticeWithRead', {
                iD: user.intended_ID[indx].iD,
                read: user.intended_ID[indx].read,
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res);
                if ((res.isIn)&&(res.notice.state =="approved")){
                    yesInbox();
                    var noticeDetailItem;
                    if(res.read) {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer;font-weight:bolder' onclick='clickDetail(this," + indNum + ")'><td>" + res.notice.sender + "</td><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td> </tr>";
                    }
                    else{
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickDetail(this," + indNum + ")'><td>" + res.notice.sender + "</td><td>" +res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td> </tr>";
                    }
                    $("#noticeDetailTable").append(noticeDetailItem);
                    indNum+=1;
                    arrayDetailNotices.push(res.notice._id);
                    arrayGenView.push([dateFromObjectId(res.notice._id).toLocaleString(),res.notice._id,res.notice.type]);
                }
            });
        }
    }

    if((user.event_ID!=undefined)&&(user.event_ID.length>0)) {
        for (var indx7 = 0; indx7 < user.event_ID.length; ++indx7) {
            socket.emit('searchBriefEventWithRead', {
                iD: user.event_ID[indx7].iD,
                read: user.event_ID[indx7].read,
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if (((res.event.state =="approved"))&&(res.isIn)){
                    yesInbox();
                    var noticeDetailItem;
                    if(res.read) {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer; font-weight:bolder' onclick='clickEventDetail(this," + indEvent + ")'><td>" + res.event.sender + "</td><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td> </tr>";
                    }else {
                        noticeDetailItem = "<tr data-toggle='modal' data-target='#displayModal' style='cursor: pointer' onclick='clickEventDetail(this," + indEvent + ")'><td>" + res.event.sender + "</td><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td> </tr>";
                    }
                    $("#noticeDetailTable").append(noticeDetailItem);
                    indEvent+=1;
                    arrayDetailEvents.push(res.event._id);
                    arrayADNotices.push([res.event._id,"Event"]);
                    arrayGenView.push([dateFromObjectId(res.event._id).toLocaleString(),res.event._id,res.event.type]);
                    if ((Date.parse(res.event.exDate)-(new Date()))<604800000){
                        arrayADNotices.push([res.event._id,"Event"]);
                    }
                }
            });
        }
    }

}


function clickDetail(row,ind) {
    row.style.fontWeight='normal';

    socket.emit('getFullNotice',{
        iD:arrayDetailNotices[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedNotice(res);
    });

    socket.emit('readInboxNotice',{
        iD:arrayDetailNotices[ind],
        user:loggedID
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
    });
}

function clickEventDetail(row,ind) {
    row.style.fontWeight='normal';

    socket.emit('getFullEvent',{
        iD:arrayDetailEvents[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedNotice(res);
    });

    socket.emit('readInboxEvent',{
        iD:arrayDetailEvents[ind],
        user:loggedID
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
    });
}

function showDetailedNotice(noticeDetails){
    document.getElementById('noticeTitle').innerHTML="Title : ";
    document.getElementById('noticeSender').innerHTML="Sender : ";
    document.getElementById('noticeDate').innerHTML="Date : ";
    document.getElementById('noticeType').innerHTML="Type : ";
    quillD.setContents(noticeDetails.content);
    var notTitle=noticeDetails.title;
    $("#noticeTitle").append(notTitle);
    var notSender=noticeDetails.sender;
    $("#noticeSender").append(notSender);
    var notDate=dateFromObjectId(noticeDetails._id).toLocaleString();
    $("#noticeDate").append(notDate);
    var notType=noticeDetails.type;
    $("#noticeType").append(notType);
}

function loadADs() {
    if (arrayADNotices.length>5){
        for (var indx = 0; indx < 5; ++indx){
            var rand=Math.floor((Math.random() * (arrayADNotices.length)));
            //console.log(arrayADNotices[rand],'getADDis');
            if (arrayADNotices[rand][1]=="AD") {
                socket.emit('getFullAdvertisementwithIndex', {
                    iD: arrayADNotices[rand][0],
                    ind: indx
                }, function (err, res) {
                    if(err){
                        return console.log(err);
                    }
                    displayADs(res);
                });
            }
            else{
                socket.emit('getFullEventwithIndex', {
                    iD: arrayADNotices[rand][0],
                    ind: indx
                }, function (err, res) {
                    if(err){
                        return console.log(err);
                    }
                    displayADs(res);
                });
            }
            arrayADNotices.splice(rand,1);
        }
    }
    else if(arrayADNotices.length>0) {
        for (var indx = 0; indx < 5; ++indx){
            //console.log(arrayADNotices[(indx%arrayADNotices.length)],'getADDis');
            if (arrayADNotices[(indx%(arrayADNotices.length))][1]=="AD") {
                socket.emit('getFullAdvertisementwithIndex', {
                    iD: arrayADNotices[(indx % (arrayADNotices.length))][0],
                    ind: indx
                }, function (err, res) {
                    if(err){
                        return console.log(err);
                    }
                    displayADs(res);
                });
            }
            else{
                socket.emit('getFullEventwithIndex', {
                    iD: arrayADNotices[(indx % (arrayADNotices.length))][0],
                    ind: indx
                }, function (err, res) {
                    if(err){
                        return console.log(err);
                    }
                    displayADs(res);
                });
            }
        }
    }
}

function displayADs(noticeDetails){
    //console.log(noticeDetails.indxAD);
    if(noticeDetails.indxAD==0){
        quill0.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==1){
        quill1.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==2){
        quill2.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==3){
        quill3.setContents(noticeDetails.content);
    }
    else if(noticeDetails.indxAD==4){
        quill4.setContents(noticeDetails.content);
    }
}

//Regular Notice Approval
function approveNotice(ind) {
    if(confirm("Confirm approval of this Notice?")) {
        socket.emit('approveNotice', {
            iD: arrayAuthNotices[ind]
        });
        removeFromApproval(ind);
    }
}

function diapproveNotice(ind){
    if(confirm("Confirm disapproval of this Notice?")) {
        socket.emit('disapproveNotice', {
            iD: arrayAuthNotices[ind]
        });
        removeFromApproval(ind);
    }
}

//Advertisement Approval
function approveAD(ind) {
    if(confirm("Confirm approval of this Advertisement?")) {
        socket.emit('approveAD', {
            iD: arrayAuthADs[ind]
        });
        removeFromApproval(ind);
    }
}

//Event Approval
function approveEvent(ind) {
    if(confirm("Confirm approval of this Event?")) {
        socket.emit('approveEvent', {
            iD: arrayAuthEvents[ind]
        });
        removeFromApproval(ind);
    }
}

function sortGenView() {
    arrayGenView.sort(function(a,b){
        return new Date(a[0]) - new Date(b[0]);
    });
}

function genViewFunc() {
    indGenView=0;
    isgenView=true;
    getGenItem();
    intervalScope=setInterval(getGenItem, 15000);
    if (indGenView==arrayGenView.length){
        //indGenView=0;
        refresh();
    }

    function getGenItem() {
        if (indGenView==arrayGenView.length){
            indGenView=0;
            //refresh();
        }
        //console.log(indGenView);
        //console.log(arrayGenView);
        typeofNtc = arrayGenView[indGenView%arrayGenView.length][2];
        if((typeofNtc=="Notice")||(typeofNtc=="Temporary")) {
            socket.emit('getFullNotice', {
                iD: arrayGenView[indGenView % arrayGenView.length][1]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                quillGenView.setContents(res.content);
            });
        }
        else if(typeofNtc=="Advertisement") {
            socket.emit('getFullAdvertisement', {
                iD: arrayGenView[indGenView % arrayGenView.length][1]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                quillGenView.setContents(res.content);
            });
        }
        else if(typeofNtc=="Event") {
            socket.emit('getFullEvent', {
                iD: arrayGenView[indGenView % arrayGenView.length][1]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                quillGenView.setContents(res.content);
            });
        }
        indGenView+=1;

    }

}

function genViewReset() {
    clearInterval(intervalScope);
}

var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

function sortNTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
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

function sortNDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
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
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
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

function sortFNDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("noticeTable");
    switching = true;
    dir = "desc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
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

function sortFADateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
    switching = true;
    dir = "desc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if ((new Date(x.innerHTML)) > (new Date(y.innerHTML))) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if ((new Date(x.innerHTML)) < (new Date(y.innerHTML))) {
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

function searchView() {
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    setTimeout(showPage,500);
    setTimeout(()=>{document.getElementById("searchDiv").style.display="block";
    document.getElementById("caroselDiv").style.display="none";
    document.getElementById("buttonDiv").style.display="none";},500);
}

function normalView() {
    document.getElementById("searchDiv").style.display="none";
    document.getElementById("caroselDiv").style.display="block";
    document.getElementById("buttonDiv").style.display="block";
    refresh();
}

function showPage() {
    document.getElementById("loaderDiv").style.display = "none";
    document.getElementById("showDiv").style.display = "block";
}

function showSearchPage() {
    document.getElementById("loaderDiv").style.display = "none";
    document.getElementById("showDiv").style.display = "block";
    document.getElementById("searchDiv").style.display="block";
}

function doNew() {
    if (document.getElementById("nTRBReg").checked)
    {
        location.href='create-regular.html';
    }
    else if(document.getElementById("nTRBTemp").checked)
    {
        location.href='create-temporary.html';
    }
    else if(document.getElementById("nTRBEvent").checked)
    {
        location.href='create-event.html';
    }
    else if(document.getElementById("nTRBAD").checked)
    {
        location.href='create-advertisement.html';
    }
}

function removeFromApproval(ind){
    document.getElementById("loaderDiv").style.display = "block";
    document.getElementById("showDiv").style.display = "none";
    setTimeout(refresh,500);
}

function noInbox() {
    document.getElementById('noInbox').style.display="block";
    document.getElementById('yesInbox').style.display="none";
}

function yesInbox() {
    document.getElementById('noInbox').style.display="none";
    document.getElementById('yesInbox').style.display="block";
}

function sortBoth() {
    sortFNDateTable(3);
}
