class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function isValidBST(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return isValidBST(node.left, min, node.value) && isValidBST(node.right, node.value, max);
}

const tree = new Node(5, 
    new Node(3, new Node(2), new Node(4)), 
    new Node(7, new Node(6), new Node(8))
);
console.log(isValidBST(tree));