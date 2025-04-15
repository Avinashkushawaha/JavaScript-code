class Videochat {
    constructor (localVideoE1, remoteVideoE1, socket) {
        this.localVideo = localVideoE1;
        this.remoteVideo = remoteVideo;
        this.socket = socket;
        this.peerConnection = null;
        this.localStrem = null;
        this.roomId = null;

        this.socket.on('offer', this.handleOffer.bind(this));
        this.socket.on('answer', this.handleAnswer.bind(this));
        this.socket

    }
}