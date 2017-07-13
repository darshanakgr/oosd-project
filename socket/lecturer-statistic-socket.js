/**
 * Created by drox2014 on 7/13/2017.
 */

class LecturerStatisticSocket{
    constructor(io, socket){
        console.log('New connection established on /lecturer-statistics @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-statistics @", new Date().getTime());
        });


    }
}

module.exports = {LecturerStatisticSocket};