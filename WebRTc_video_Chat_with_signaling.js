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
        this.socket.on('ice-candidate', this.handleNewICECandidate.bind(this));
    }

    async start(roomId){
        this.roomId = roomId;
        this.socket.emit('join-room', roomId);
    
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
               video:true,
               audio: true
            });

        } catch (err) {
          console.error("Error accessing media devices:", err);
          throw err;
        }
    }
    async call () {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [
                {urls: 'stun:stun.l.google.com:19302'},
            ]
        });

        this.localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, this.localStream);
        });

        this.peerConnection.ontrack = (event) => {
            this.remoteVideo.srcObject = event.stream[0];
        };

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.emit('ice-candidate', {
                    candidate: event.candidate,
                    roomId: this.roomId 
                });
            }
        };

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.socket.emit('offer', {
            offer,
            roomId: this.roomId
        });
    }

    async handleOffer ({ offer }) {
        if (!this.peerConnection) {
            this.peerConnection = new RTCPeerConnection({
                iceServers :[
                    { ursl: 'stun:stun.l.google.com:19302'}
                ]
            });

            this.localStream.getAudioTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            this.peerConnection.ontrack = (event) => {
                this.remoteVideo.srcObject = event.streams[0];
            };

            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.socket.emit('ice-candidate', {
                        candidate: event.candidate,
                        roomId: this.roomId
                    });
                }
            };

            await this.peerConnection.setRemoteDescription(offer);
            const answer  = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            this.socket.emit('answer', {
                answer,
                roomId: this.roomId
            });
        }
    }

    async handleAnswer({ answer }) {
        if (!this.peerConnection) return;
        await this.peerConnection.setRemoteDescription(answer);
    }

    async handleNewICECandidate({ candidate }) {
        if (!this.peerConnection) return;
        await this.peerConnection.addIceCandidate(candidate);
    } catch (err) {
        console.log("Error adding ICE candidate: ", err);
    }

    hangUp() {
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.peerConnection = null;
        }
         this.remoteVideo.srcObject = null;
         this.localVideo.srcObject = null;
         this.socket.emit('leave-room', this.roomId);
        
    
    }
}


    
