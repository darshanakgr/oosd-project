/**
 * Created by Damitha on 7/5/2017.
 */

var thiseidtuser;
var noticeID = sessionStorage.getItem('editID');
var thisState;
var thisAuth;

var socket=io('/lecturer-edit-regular');
socket.on('connect',function(){
    console.log('Connected to server');
});

function finishEdit() {
    if(confirm('Do you want to finalize the notice?'))
    {
        var newTitile = document.getElementById("inputEditTitle").value;
        var newContent = quilledt.getContents();

        socket.emit('editNotice',{
            title: newTitile,
            content: newContent,
            iD:noticeID,
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
        if((user.type=="Student")||(user.type=="Rep")){
            forceReturn();
        }
        thiseidtuser=user;

    });
}

function  getEdtNotice() {
    socket.emit('getEditNotice',{
        iD: noticeID
    }, function (err, notice) {
        if(err){
            return console.log(err);
        }
        var editTitle = notice.title;
        if(editTitle!=null) {
            document.getElementById('inputEditTitle').value = editTitle;
        }
        quilledt.setContents(notice.content);
        thisState=notice.state;
        thisAuth=notice.approver;
    });
}

function forceReturn(){
    alert("Restricted Access!");
    location.href='index.html';
}




