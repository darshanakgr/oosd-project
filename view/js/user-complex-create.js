/**
 * Created by Damitha on 7/16/2017.
 *
 */

var socket = io('/user-complex-create');

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$('#create-new-form').on('submit', function (e) {
    e.preventDefault();
    alert('Creating new user');
    socket.emit('createCompleteUser', {
        iD:document.getElementById('ucc-index').value,
        name:document.getElementById('ucc-name').value,
        email:document.getElementById('ucc-email').value,
        password: document.getElementById('ucc-password').value,
        type:document.getElementById('ucc-type').value,
        batch:{department:document.getElementById('ucc-department').value,year:'Staff'}
    }, function (err, res) {
        if(err){
            console.log(err);
            return alert(err);
        }
        console.log(res);
    });
});

function checkPWisMatch() {
    var iniPW = document.getElementById('ucc-password');
    var rePW= document.getElementById('ucc-repassword');
    if(iniPW.value!=rePW.value){
        rePW.setCustomValidity("Password must mach");
    }
    else {
        rePW.setCustomValidity("");
    }
}

function doSetPassword() {
    var pwInput=document.getElementById('ucc-password');
    var pwConfirm=document.getElementById('ucc-repassword');
    var imgEye=document.getElementById('dispEye');
    if (pwInput.type=="password"){
        pwInput.type='text';
        pwConfirm.type='text';
        imgEye.className='fa fa-eye fa-2x';
    }
    else {
        pwInput.type='password';
        pwConfirm.type='password';
        imgEye.className='fa fa-eye-slash fa-2x';
    }
}