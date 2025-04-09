class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    addEdge(node1, node2) {
        this.adjacencyList.get(node1).push(node2);
        this.adjacencyList.get(node2).push(node1);
    }

    bfs(start) {
        const visited = new Set();
        const queue = [start];
        const result = [];

        while (queue.length) {
            const node = queue.shift();
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                for (const neighbor of this.adjacencyList.get(node)) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        return result;
    }
    
}