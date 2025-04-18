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
            buffer.shift();
        }
        this.updateChart(update.metric);
    }

    createChart(metric) {
        const chartId = `chart-${metric,replace(/\s+/g, '-').toLowerCase()}`;
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart';
        chartContainer.id = chartId;
        chartContainer.innerHTML = `<h3>${metric}</h3><canvas></canvas>`;

        document.querySelector(`.charts-container`).appendChild(chartContainer);

        const canvas = chartContainer.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: metric,
                    data: [],
                    borderColor:this.getRandomColor(),
                    borderWidth: 2,
                    fill: false
                }]
            },
            Options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'second'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
        this.charts.set(metric, chart);
    }
    updateChart(metric) {
        const buffer = this.dataBuffers.get(metric);
        const chart = this.charts.get(metric);

        chart.datalabels = buffer.map(item => item.timestamp);
        chart.data.datasets[0].data = buffer.map(item => item.value);
        chart.update();
    }

    getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    }
}

const dashboard = new RealTimeDashboard(
    'wss://api.example.com/realtime',
    'dashboard-container'
);