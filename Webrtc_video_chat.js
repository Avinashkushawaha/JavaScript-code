class VideoChat {
    constructor(localVideo, remoteVideo) {
        this.localVideo = localVideo;
        this.remoteVideo = remoteVideo;
        this.peerConnection = null;
        this.localStream = null;
    }

    async start() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            this.localVideo.srcObject = this.localStream;
        } catch (err) {
            console.error('Error acccessing media devices:', err);
        }
        
    }
    createPeerConnection(){
        const configuration = {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302'}]
        };

        this.peerConnection.ontrack = (event)=> {
            this.remoteVideo.srcObject = event.streams[0];
        };
        this.peerConnection.onicecandiate = (event)=> {
            if (event.candiate){

                console.log('ICE candidate:', event.candiate);
            }
        };
    }

    async createOffer(){
        if(!this.peerConnection) this.createPeerConnection();

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        return offer;
    }
    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(answer);
    }

    async handleOffer(offer) {
        if (!this.peerConnection) this.createPeerConnection();

        await this.peerConnection.setRemoteDescription(offer);

        const answer = await this.peerConnection.createAnswer();

        await this.peerConnection.setLocalDescription(answer);

        return answer;

    }

    addIceCandidate(candiate) {
        if (this.peerConnection) {
            this.peerConnection.addIceCandidate(new RTCIceCandidate(candiate));
        }
    }

    stop() {
        if (this.peerConnection){
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.localStream) {
            this.localStream.getTracks().forEach(track =>track.stop());
        }
    }
}