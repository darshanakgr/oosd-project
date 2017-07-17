/**
 * Created by Damitha on 7/5/2017.
 */
/**
 * Created by Damitha on 6/27/2017.
 */

var thiseidtuser;
var noticeID = sessionStorage.getItem('editID');
var thisState;

var socket=io('/lecturer-edit-event');
socket.on('connect',function(){
    console.log('Connected to server');
});

function finishEditEvent() {
    if(confirm('Do you want to finalize the Event?'))
    {
        var newTitile = document.getElementById("inputTitleEditEvent").value;
        var newContent = quillEditEvent.getContents();
        var newExpDate= document.getElementById("expDateEditEvent").value;

        socket.emit('editEvent',{
            title: newTitile,
            content: newContent,
            iD:noticeID,
            exDate:newExpDate,
            state:thisState
        });
        location.href='index.html';
    }
}


function  getCreator() {
    socket.emit('getNoticeCreator',{
        index:sessionStorage.getItem('loggedID')
    }, function (err, user) {
        if(err){
            return console.log(err);
        }
        if((user.type=="Student")||(user.type=="Rep")||(user.type=="Lecturer")){
            forceReturn();
        }
        thiseidtuser=user;

    });
}

function  getEdtEvent() {
    socket.emit('getEditEvent',{
        iD: noticeID
    }, function (err, notice) {
        if(err){
            return console.log(err);
        }
        var editTitle = notice.title;
        if(editTitle!=null) {
            document.getElementById('inputTitleEditEvent').value = editTitle;
        }
        quillEditEvent.setContents(notice.content);
        if(notice.exDate!=null) {
            document.getElementById('expDateEditEvent').value = notice.exDate.substr(0, 10);
            //console.log(notice.exDate);
        }
        thisState=notice.state;
    });
}

function forceReturn(){
    alert("Restricted Access!");
    location.href='index.html';
}


