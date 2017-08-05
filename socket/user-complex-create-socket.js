/**
 * Created by Damitha on 7/17/2017.
 */
const lecturerController = require('./../controller/lecturer-controller');
const userController=require('./../controller/user-controller');

class UserCreateSocket {
    constructor(io, socket) {
        console.log('New connection established on /user-complex-create @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /user-complex-create @", new Date().getTime());
        });

        socket.on('createCompleteUser', (user,callback) => {
            userController.createCompleteUser(user).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });
    }
}

module.exports = {UserCreateSocket};