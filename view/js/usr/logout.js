/**
 * Created by drox on 7/17/2017.
 */
$('#logout').on('click', function (e) {
    e.preventDefault();
    $.get("http://localhost:3000/logout");
    window.location.href = "/";
})