/**
 * Created by Damitha on 7/5/2017.
 */
/**
 * Created by Damitha on 6/27/2017.
 */

var thiseidtuser;
var noticeID = sessionStorage.getItem('editID');
var thisState;

var socket=io('/edit-advertisement');
socket.on('connect',function(){
    console.log('Connected to server');
});

function finishEditAD() {
    if(confirm('Do you want to finalize the Advertisement?'))
    {
        var newTitile = document.getElementById("inputTitleEditAD").value;
        var newContent = quillEditAD.getContents();
        var newExpDate= document.getElementById("expDateEditAD").value;

        socket.emit('editAD',{
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

function  getEdtAD() {
    socket.emit('getEditAD',{
        iD: noticeID
    }, function (err, notice) {
        if(err){
            return console.log(err);
        }
        var editTitle = notice.title;
        if(editTitle!=null) {
            document.getElementById('inputTitleEditAD').value = editTitle;
        }
        quillEditAD.setContents(notice.content);
        if(notice.exDate!=null) {
            document.getElementById('expDateEditAD').value = notice.exDate.substr(0, 10);
        }
        thisState=notice.state;
    });
}

function forceReturn(){
    alert("Restricted Access!");
    location.href='index.html';
}


