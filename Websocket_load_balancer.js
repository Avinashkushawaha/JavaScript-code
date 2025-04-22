class WebSocketLoadBalancer {
    constructor( serverUrls, options = {}) {
        this.serverUrls = serverUrls;
        this.options = options;
        this.sockets = options;
        this.currentIndex = 0;
        this.messagesQueue = [];
        this.connectionCallbacks = [];
        this.messageCallbacks = [];
        this.errorCallbacks = [];
        this.isConnected = false;

        this._connect();
    }

    _connect() {
        this._closeAll();
        this.socktes = this.serverUrls.map(url => {
            const socket = new WebSocket(url, this.options.protocols);

            socket.onopen = () => this._handleOpen();
            socket.onmessage = (event) => this._handleMessage(event);
            socket.onerror = (event) => this._handleError(event);
            socket.onclose = (event) => this._handleClose(event);
            return socket;

        });
    }

    _getNextSocket() {
        this.currentIndex = (this.currentIndex + 1) % this.sockets.length;
        return this.sockets[this.currentIndex];
    }
    _handleOpen() {
        const hasOpenConnection = this.sockets.some(socket => socket.readyState === WebSocket.OPEN);

        if (hasOpenConnection && !this.isConnected) {
            this.isConnected = true;
            this.connectionCallbacks.forEach(callback => callback(true));
            this._processQueue();
        }
    }
    _handleMessage(event) {
        this.messageCallbacks.forEach(callback => callback(event.data));
    }
    _handleError(event) {
        this.errorCallbacks.forEach(callback => callback(event));
    }
    _handleClose() {
        const allClosed = this.sockets.every(
            socket => socket.readyState === WebSocket.CLOSED 
        );
        if (allClosed && this.isConnected) {
            this.isConnected = false;
           
            setTimeout(() => this._connect(), 5000);
    }
}
_closeAll() {
    this.sockets.forEach(socket => {
        if (socket.readyState !== WebSocket.CLOSED) {
            socket.close();
        }
    });
}
_processQueue() {
    while (this.messagesQueue.length > 0 && this.isConnected) {
        const {message, resolve, reject} = this.messagesQueue.shift();
        this._send(message).then(resolve).catch(reject);
    }
}
_send(message) {
    return new Promise((resolve, reject) => {
        if(!this.isConnected) {
            this.messagesQueue.push({message, resolve, reject});
            return;
        }

        try {
            const socket = this._getNextSocket();
            if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            resolve();
            } else {
                throw new Error('Socket is not open');
            }
        } catch (error) {
            reject(error);

        }
    });
}

}