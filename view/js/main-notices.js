// /**
//  * Created by Damitha on 6/27/2017.
//  */
// // Get the modal

var socket=io('/main-notices');
socket.on('connect',function(){
    console.log('Connected to server');
});

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
socket.emit('getNoticeUser', {
    index:sessionStorage.getItem('loggedID')
}, function (err, res) {
    if(err){
        return console.log(err);
    }
    if(res.type!="Student"){
        document.getElementById("createNewButton").setAttribute("style","display:block");
        if(res.type=="Dean"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(res.type=="HoD"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(res.type=="Reception"){
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(res.type=="Lecturer"){
            document.getElementById("nTRBAD").setAttribute("style","display:none");
            document.getElementById("nTRBReg").setAttribute("checked","checked");
        }
        else if(res.type=="Rep"){
            document.getElementById("nTRBTemp").setAttribute("checked","checked");
            document.getElementById("nTRBReg").setAttribute("style","display:block");
            document.getElementById("nTRBAD").setAttribute("style","display:none");
            document.getElementById("nTRBEvent").setAttribute("style","display:none");
        }
    }
    else{
        document.getElementById("sentTab").setAttribute("style","visibility: hidden");
    }
});

//Refresh Notices
function  refresh() {
    clearLists();
    noInbox();
    noSent();
    noAuth();

    socket.emit('getNoticeUser', {
        index: loggedID,
    }, function (err, res) {
        if(err){
            return console.log(err);
        }

        var notis = 0;
        var auths = 0;
        if (res.intended_ID.length > 0) {
            // console.log(res.intended_ID);
            for (var indx = 0; indx < res.intended_ID.length; ++indx) {
                if (res.intended_ID[indx].read == true) {
                    socket.emit('noticeisApproved', {
                        iD: res.intended_ID[indx].iD,
                    }, function (err, resp) {
                        if(err){
                            return console.log(err);
                        }
                        if(resp){
                            notis += 1;
                        }
                    });
                }
            }
        }

        if (res.event_ID.length > 0) {
            for (var indx2 = 0; indx2 < res.event_ID.length; ++indx2) {
                if (res.event_ID[indx2].read == true) {
                    socket.emit('eventisApproved', {
                        iD: res.event_ID[indx2].iD,
                    }, function (err, resp) {
                        if(err){
                            return console.log(err);
                        }
                        if(resp){
                            notis += 1;
                        }
                    });
                }
            }
        }

        if (res.w8nApproval.length > 0) {
            for (var indx3 = 0; indx3 < res.w8nApproval.length; ++indx3) {
                if (res.w8nApproval[indx3].read == true) {
                    socket.emit('noticeisNew', {
                        iD: res.w8nApproval[indx3].iD,
                    }, function (err, resp) {
                        if(err){
                            return console.log(err);
                        }
                        if(resp){
                            auths += 1;
                        }
                    });
                }
            }
        }

        if (res.w8nApproval_Event.length > 0) {
            // console.log(res.w8nApproval_Event);
            for (var indx4 = 0; indx4 < res.w8nApproval_Event.length; ++indx4) {
                if (res.w8nApproval_Event[indx4].read == true) {
                    socket.emit('eventisNew', {
                        iD: res.w8nApproval_Event[indx4].iD,
                    }, function (err, resp) {
                        if(err){
                            return console.log(err);
                        }
                        if(resp){
                            auths += 1;
                        }
                    });
                }
            }
        }

        if (res.w8nApproval_AD.length > 0) {
            // console.log(res.w8nApproval_AD);
            for (var indx5 = 0; indx5 < res.w8nApproval_AD.length; ++indx5) {
                if (res.w8nApproval_AD[indx5].read == true) {
                    socket.emit('aDisNew', {
                        iD: res.w8nApproval_AD[indx5].iD,
                    }, function (err, resp) {
                        if(err){
                            return console.log(err);
                        }
                        if(resp){
                            auths += 1;
                        }
                    });
                }
            }
        }

        // function giveNotifics() {
        //     //console.log(notis, auths);
        //     var cnt=notis+auths;
        //     document.getElementById("globalNotifications").innerHTML = "";
        //
        //     if(notis!=0) {
        //         var notiNot = '<li><a href="index.html">' + notis + ' New Notices in Inbox</a></li>';
        //         $("#globalNotifications").append(notiNot);
        //     }
        //     if(auths!=0) {
        //         var authNot = '<li><a href="index.html">' + auths + ' New Notices to be Approved</a></li>';
        //         $("#globalNotifications").append(authNot);
        //     }
        //     document.getElementById("notificationsNumber").innerHTML = cnt;
        //     document.getElementById("notificationsNumber").style.visibility = 'visible';
        // }
        //
        // setTimeout(giveNotifics, 500);


        if((res.type=="Dean")||(res.type=="HoD")){
            loadAuthNoticesList(res);
            loadSentNoticesList(res);
            }
        else if((res.type=="Reception")||(res.type=="Lecturer")||(res.type=="Rep")){
            loadSentNoticesList(res);
        }
        loadNoticesList(res);
    });

    setTimeout(loadADs,500);
    setTimeout(sortBoth,500);
    setTimeout(sortGenView,500);
    setTimeout(showPage,600);
}

//Search for new notices
function searchNotice() {
    clearLists();
    noInbox();
    noSent();
    noAuth();

    socket.emit('getNoticeUser', {
        index: loggedID,
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        //console.log(res);

        if (document.getElementById("searchInput").value != "") {
            if((res.type=="Dean")||(res.type=="HoD")){
                searchAuthNoticesList(res,document.getElementById("searchInput").value);
                searchSentNoticesList(res,document.getElementById("searchInput").value);
            }
            else if((res.type=="Reception")||(res.type=="Lecturer")||(res.type=="Rep")){
                searchSentNoticesList(res,document.getElementById("searchInput").value);
            }
            searchNoticesList(res,document.getElementById("searchInput").value);
        }
        else {
            if((res.type=="Dean")||(res.type=="HoD")){
                loadAuthNoticesList(res);
                loadSentNoticesList(res);
            }
            else if((res.type=="Reception")||(res.type=="Lecturer")||(res.type=="Rep")){
                loadSentNoticesList(res);
            }
            loadNoticesList(res);
        }
    });

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

    arraySentNotices = [];
    indSent = 0;
    document.getElementById("sentDetailTable").innerHTML = "";

    arrayAuthNotices = [];
    indAuth = 0;
    document.getElementById("authDetailTable").innerHTML = "";

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

function loadSentNoticesList(user) {
    if((user.sent!=undefined)&&(user.sent.length>0)) {
        for (var indx2 = 0; indx2 < user.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getBriefNotice', {
                iD: user.sent[indx2]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if ((res.state =="new")||(res.state =="approved")) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indSent += 1;
                    arraySentNotices.push(res._id);
                }

            });
        }
    }

    if((user.sent_AD!=undefined)&&(user.sent_AD.length>0)) {
        yesSent();
        for (var indx5 = 0; indx5 < user.sent_AD.length; ++indx5) {
            //console.log(noticeList.sent[indx]);
            socket.emit('getBriefAdvertisement', {
                iD: user.sent_AD[indx5]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if ((res.state =="new")||(res.state =="approved")) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indADSent += 1;
                    arraySentADs.push(res._id);
                    //console.log(arraySentADs);
                }
            });
        }
    }

    if((user.sent_Event!=undefined)&&(user.sent_Event.length>0)) {
        yesSent();
        for (var indx8 = 0; indx8 < user.sent_Event.length; ++indx8) {
            socket.emit('getBriefEvent', {
                iD: user.sent_Event[indx8]
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                if ((res.state =="new")||(res.state =="approved")) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.title + "</td><td>" + res.type + "</td> <td>" + dateFromObjectId(res._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indEventSent += 1;
                    arraySentEvents.push(res._id);
                }

            });
        }
    }

}

function loadAuthNoticesList(user){

    if((user.w8nApproval!=undefined)&&(user.w8nApproval.length>0)) {
        for (var indx = 0; indx < user.w8nApproval.length; ++indx) {
            //console.log( user.intended_ID[indx].iD,"A");
            socket.emit('getBriefNoticeWithRead', {
                iD: user.w8nApproval[indx].iD,
                read: user.w8nApproval[indx].read
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if ((res.notice.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthDetail(this," + indAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveNotice(" + indAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveNotice(" + indAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthDetail(this," + indAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveNotice(" + indAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveNotice(" + indAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    $("#authDetailTable").append(noticeDetailItem);
                    indAuth += 1;
                    arrayAuthNotices.push(res.notice._id);
                }
            });
        }
    }

    if((user.w8nApproval_AD!=undefined)&&(user.w8nApproval_AD.length>0)) {
        for (var indx6 = 0; indx6 < user.w8nApproval_AD.length; ++indx6) {
            socket.emit('getBriefAdvertisementWithRead', {
                iD: user.w8nApproval_AD[indx6].iD,
                read: user.w8nApproval_AD[indx6].read
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if ((res.aD.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.aD.title + "</td> <td>" + res.aD.type + "</td><td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthADDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveAD(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveAD(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    } else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.aD.title + "</td> <td>" + res.aD.type + "</td><td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthADDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveAD(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveAD(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    indADAuth += 1;
                    $("#authDetailTable").append(noticeDetailItem);
                    arrayAuthADs.push(res.aD._id);
                }
            });
        }
    }

    if((user.w8nApproval_Event!=undefined)&&(user.w8nApproval_Event.length>0)) {
        for (var indx9 = 0; indx9 < user.w8nApproval_Event.length; ++indx9) {
            socket.emit('getBriefEventWithRead', {
                iD: user.w8nApproval_Event[indx9].iD,
                read: user.w8nApproval_Event[indx9].read
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if ((res.event.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthEventDetail(this," + indEventAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveEvent(" + indEventAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveEvent(" + indEventAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    } else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthEventDetail(this," +indEventAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveEvent(" + indEventAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveEvent(" + indEventAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    indEventAuth += 1;
                    $("#authDetailTable").append(noticeDetailItem);
                    arrayAuthEvents.push(res.event._id);
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

function searchSentNoticesList(user,searchedby){

    if((user.sent!=undefined)&&(user.sent.length>0)) {
        for (var indx2 = 0; indx2 < user.sent.length; ++indx2) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchBriefNotice', {
                iD: user.sent[indx2],
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if (((res.notice.state =="new")||(res.notice.state =="approved"))&&(res.isIn)) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.notice.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.notice.title + "</td><td>" + res.notice.type + "</td> <td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.notice.title + "</td><td>" + res.notice.type + "</td> <td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentDetail(" + indSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEdit(" + indSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='noticeRemove(" + indSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indSent += 1;
                    arraySentNotices.push(res.notice._id);
                }

            });
        }
    }

    if((user.sent_AD!=undefined)&&(user.sent_AD.length>0)) {
        for (var indx5 = 0; indx5 < user.sent_AD.length; ++indx5) {
            socket.emit('searchBriefAdvertisement', {
                iD: user.sent_AD[indx5],
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if (((res.aD.state =="new")||(res.aD.state =="approved"))&&(res.isIn)) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.aD.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.aD.title + "</td><td>" + res.aD.type + "</td> <td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" +res.aD.title + "</td><td>" + res.aD.type + "</td> <td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentADDetail(" + indADSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditAD(" + indADSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='aDRemove(" + indADSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indADSent += 1;
                    arraySentADs.push(res.aD._id);
                    //console.log(arraySentADs);
                }
            });
        }
    }

    if((user.sent_Event!=undefined)&&(user.sent_Event.length>0)) {
        for (var indx8 = 0; indx8 < user.sent_Event.length; ++indx8) {
            //console.log(noticeList.sent[indx]);
            socket.emit('searchBriefEvent', {
                iD: user.sent_Event[indx8],
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                if (((res.event.state =="new")||(res.event.state =="approved"))&&(res.isIn)) {
                    yesSent();
                    var noticeDetailItem;
                    if (res.event.state =="approved") {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.event.title + "</td><td>" + res.event.type + "</td> <td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td>Approved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer'><td>" + res.event.title + "</td><td>" + res.event.type + "</td> <td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td>Unapproved</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickSentEventDetail(" + indEventSent + ")'>View</button></td><td><button class='btn btn-warning pull-right' onclick='gotoEditEvent(" + indEventSent + ")' >Edit</button></td><td><button class='btn btn-danger pull-right' onclick='eventRemove(" + indEventSent + ")'>Remove</button></td></tr>";
                    }
                    $("#sentDetailTable").append(noticeDetailItem);
                    indEventSent += 1;
                    arraySentEvents.push(res.event._id);
                }

            });
        }
    }

}

function searchAuthNoticesList(user,searchedby){

    if((user.w8nApproval!=undefined)&&(user.w8nApproval.length>0)) {
        for (var indx3 = 0; indx3 < user.w8nApproval.length; ++indx3) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchBriefNoticeWithRead', {
                iD: user.w8nApproval[indx3].iD,
                read: user.w8nApproval[indx3].read,
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if((res.isIn)&&(res.notice.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthDetail(this," + indAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveNotice(" + indAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveNotice(" + indAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.notice.title + "</td> <td>" + res.notice.type + "</td><td>" + dateFromObjectId(res.notice._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthDetail(this," + indAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveNotice(" + indAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveNotice(" + indAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    $("#authDetailTable").append(noticeDetailItem);
                    indAuth += 1;
                    arrayAuthNotices.push(res.notice._id);
                }
            });
        }
    }

    if((user.w8nApproval_AD!=undefined)&&(user.w8nApproval_AD.length>0)) {
        for (var indx6 = 0; indx6 < user.w8nApproval_AD.length; ++indx6) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchBriefAdvertisementWithRead', {
                iD: user.w8nApproval_AD[indx6].iD,
                read: user.w8nApproval_AD[indx6].read,
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if((res.isIn)&&(res.aD.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.aD.title + "</td> <td>" + res.aD.type + "</td><td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthADDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveAD(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveAD(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    } else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.aD.title + "</td> <td>" + res.aD.type + "</td><td>" + dateFromObjectId(res.aD._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthADDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveAD(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveAD(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    indADAuth += 1;
                    $("#authDetailTable").append(noticeDetailItem);
                    arrayAuthADs.push(res.aD._id);
                }
            });
        }
    }

    if((user.w8nApproval_Event!=undefined)&&(user.w8nApproval_Event.length>0))  {
        for (var indx9 = 0; indx9 < user.w8nApproval_Event.length; ++indx9) {
            //console.log(noticeList.toApprove[indx3]);
            socket.emit('searchBriefEventWithRead', {
                iD: user.w8nApproval_Event[indx9].iD,
                read: user.w8nApproval_Event[indx9].read,
                search: searchedby
            }, function (err, res) {
                if(err){
                    return console.log(err);
                }
                //console.log(res.notice);
                if((res.isIn)&&(res.event.state =="new")) {
                    yesAuth();
                    var noticeDetailItem;
                    if (res.read) {
                        noticeDetailItem = "<tr style='cursor: pointer; font-weight:bolder' ><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthEventDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveEvent(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveEvent(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    } else {
                        noticeDetailItem = "<tr style='cursor: pointer' ><td>" + res.event.title + "</td> <td>" + res.event.type + "</td><td>" + dateFromObjectId(res.event._id).toLocaleString() + "</td><td><button class='btn btn-success pull-right' data-toggle='modal' data-target='#displayModal' onclick='clickAuthEventDetail(this," + indADAuth + ")'>View</button></td><td><button class='btn btn-info pull-right' onclick='approveEvent(" + indADAuth + ")'><i class='material-icons'>thumb_up</i> Approve</button></td><td><button class='btn btn-danger pull-right' onclick='diapproveEvent(" + indADAuth + ")' ><i class='material-icons'>thumb_down</i> Disapprove</button></td></tr>";
                    }
                    indEventAuth += 1;
                    $("#authDetailTable").append(noticeDetailItem);
                    arrayAuthEvents.push(res.event._id);
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

function clickSentDetail(ind) {
    socket.emit('getFullNotice',{
        iD:arraySentNotices[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedSentNotice(res);
    });
}

function clickSentADDetail(ind) {
    socket.emit('getFullAdvertisement',{
        iD:arraySentADs[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedSentNotice(res);
    });
}

function clickSentEventDetail(ind) {
    //console.log(arraySentADs[ind]);
    socket.emit('getFullEvent',{
        iD:arraySentEvents[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedSentNotice(res);
    });
}

function clickAuthDetail(row,ind) {
    var rowp = row.closest('tr');
    rowp.style.fontWeight='normal';

    socket.emit('getFullNotice',{
        iD:arrayAuthNotices[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedNotice(res);
    });

    socket.emit('readAuthNotice',{
        iD:arrayAuthNotices[ind],
        user:loggedID
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
    });
}

function clickAuthADDetail(row,ind) {
    var rowp = row.closest('tr');
    rowp.style.fontWeight='normal';

    socket.emit('getFullAdvertisement',{
        iD:arrayAuthADs[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedNotice(res);
    });

    socket.emit('readAuthAdvertisement',{
        iD:arrayAuthADs[ind],
        user:loggedID
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
    });
}

function clickAuthEventDetail(row,ind) {
    console.log(arrayAuthEvents[ind]);
    var rowp = row.closest('tr');
    rowp.style.fontWeight='normal';

    socket.emit('getFullEvent',{
        iD:arrayAuthEvents[ind]
    }, function (err, res) {
        if(err){
            return console.log(err);
        }
        showDetailedNotice(res);
    });

    socket.emit('readAuthEvent',{
        iD:arrayAuthEvents[ind],
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

function showDetailedSentNotice(noticeDetails){
    document.getElementById('noticeTitle').innerHTML="Title : ";
    document.getElementById('noticeSender').innerHTML="Receivers : ";
    document.getElementById('noticeDate').innerHTML="Date : ";
    document.getElementById('noticeType').innerHTML="Type : ";
    //console.log(noticeDetails);
    quillD.setContents(noticeDetails.content);
    notTitle=noticeDetails.title;
    $("#noticeTitle").append(notTitle);
    notReceviers=noticeDetails.receivers.join(' , ');
    $("#noticeSender").append(notReceviers);
    notDate=dateFromObjectId(noticeDetails._id).toLocaleString();
    $("#noticeDate").append(notDate);
    notType=noticeDetails.type;
    $("#noticeType").append(notType);[]
}

function gotoEdit(ind) {
    if(confirm('Do you want to edit the notice?'))
    {
        sessionStorage.setItem('editID',arraySentNotices[ind]);
        location.href='edit-regular.html';
    }
}

function gotoEditAD(ind) {
    if(confirm('Do you want to edit the Advertisement?'))
    {
        sessionStorage.setItem('editID',arraySentADs[ind]);
        location.href='edit-advertisement.html';

    }
}

function gotoEditEvent(ind) {
    if(confirm('Do you want to edit the Event?'))
    {
        sessionStorage.setItem('editID',arraySentEvents[ind]);
        location.href='edit-event.html';
    }
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

function diapproveAD(ind){
    if(confirm("Confirm disapproval of this Advertisement?")) {
        socket.emit('disapproveAD', {
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

function diapproveEvent(ind){
    if(confirm("Confirm disapproval of this Event?")) {
        socket.emit('disapproveEvent', {
            iD: arrayAuthEvents[ind]
        });
        removeFromApproval(ind);
    }
}

function noticeRemove(ind) {
    if(confirm('Do you want to remove the notice?')) {
        socket.emit('removeNotice', {
            iD: arraySentNotices[ind]
        });
        refresh();
    }
}

function aDRemove(ind) {
    if(confirm('Do you want to remove the Advertisement?')) {
        socket.emit('removeAD', {
            iD: arraySentADs[ind]
        });
        refresh();
    }
}

function eventRemove(ind) {
    if(confirm('Do you want to remove the Event?')) {
        socket.emit('removeEvent', {
            iD: arraySentEvents[ind]
        });
        refresh();
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

function sortSTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
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

function sortSDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
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

function sortFSDateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sentTable");
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

function sortATable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
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

function sortADateTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("authTable");
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

function noSent() {
    document.getElementById('noSent').style.display="block";
    document.getElementById('yesSent').style.display="none";
}

function yesSent() {
    document.getElementById('noSent').style.display="none";
    document.getElementById('yesSent').style.display="block";
}

function noAuth() {
    document.getElementById('noAuth').style.display="block";
    document.getElementById('yesAuth').style.display="none";
}

function yesAuth() {
    document.getElementById('noAuth').style.display="none";
    document.getElementById('yesAuth').style.display="block";
}
