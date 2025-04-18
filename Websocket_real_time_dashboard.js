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

    initSocket() {
        this.socket.onopen = () =>{
            console.log('Websocket connected');
            this.socket.send(JSON.stringify({ type: 'subscribe'}));
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.procesUpdate(data);

        };

        this.socket.onclose = () =>{
            console.log('Websocket disconnected');
            setTimeout(() => this.reconnect(), 5000);
        };
    }

    reconnect() {
        this.socket = new WebSocket(this.socketUrl);
        this.initSocket();
    }

    initUI() {
        this.container.innerHTML = `<div class="dashboard-header>
          <h2>Real-Time Dashboard</h2>
          <div class="connection-status">Connected </div>
          </div>
          <div class="charts-container"></div> `;
    }

    procesUpdate(update) {
        if (!this.dataBuffers.has(update.metric)){
            this.createChart(update.metric);
            this.dataBuffers.set(update.metric, []);
        }

        const buffer = this.dataBuffers.get(update.metric);
        buffer.push({
            timestamp: new Date(update.timestamp),
            value: update.value
        });

        if (buffer.length> this.maxDataPoints){
            
        }
    }
}