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
            if (!node.children[char]){
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._getAllWordsFromNode(node, prefix);
    }

    _getAllWordsFromNode(node, prefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }

        for (const char in node.children) {
            words = words.concat(
                this._getAllWordsFromNode(node.children[char], prefix + char)
            );
        }

        return words;
    }
}

const dictionary = new Trie();
dictionary.insert("apple");
dictionary.insert("app");
dictionary.insert("application");
dictionary.insert("banana");

console.log(dictionary.search("app"));
console.log(dictionary.search("apple"));
console.log(dictionary.search("appl"));
console.log(dictionary.startsWith("app"));


