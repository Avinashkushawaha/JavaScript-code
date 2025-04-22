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
}

   
    