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
    dfs(start){
        const visited = new Set();
        const result = [];
 
        const traverse = (node) =>{
            visited.add(node);
            result.push(node);
            for (const neighbor of this.adjacencyList.get(node)){
                if (!visited.has(neighbor)){
                    traverse(neighbor);
                }
            }
        };
        traverse(start);
        return result;
    }
    dfsIterative(start) {
        const visited = new Set();
        const stack = [start];
        const result = [];

        while (stack.length) {
            const node = stack.pop();
            if (!visited.has(node)){
                visited.add(node);
                result.push(node);

                const neighbors = this.adjacencyList.get(node);

                for (let i = neighbors.length - 1; i >= 0; i --){
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }
        return result;
    }
}

const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addEdge('D');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D')
graph.addEdge('C', 'D');

console.log('BFS:', graph.bfs('A'));
console.log('DFS:', graph.dfs('A'));
console.log('DFS Iterative:', graph.dfsIterative('A'));
