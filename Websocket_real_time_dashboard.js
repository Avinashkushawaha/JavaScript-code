class RealTimeDashboard {
    constructor(socketUrl, containerTd) {
        this.socket = new WebSocket(socketUrl);
        this.container = document.getElementById(containerTd);
        this.charts = new Map();
        this.dataBuffers = new Map();
        this.maxDataPoints = 100;

        this.initSocket();
        this.initUI();
    }
}