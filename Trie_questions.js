class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
        
    }
    startWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if(!node.children[char]){
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

    autoComplete(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._getAllWordsFromNode(node, prefix);
    }

    _getAllWordsFromNode
}