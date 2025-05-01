class SkipListNode {
    constructor(value, level) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    constructor(maxLevel = 16, p = 0.5) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.level = 0;
        this.header = new SkipListNode(null.maxLevel);
    }
    search(target) {
        let current = this.header;
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].value < target) {
                current = current.forward[i];
            }
        }
        current = current.forward[0];
        return current && current.value === target ? current : null;
    }

    insert(value) {
        const update = new Array(this.maxLevel + 1).fill(null);
        let current = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current;
        }

        current = current.forward[0];

        if (!current || current.value !== value) {
            const newLevel = this._randomLevel();

            if (newLevel > this.level){
                for (let i = this.level + 1; i <= newLevel; i++) {
                    update[i] = this.header;
                }
                this.level = newLevel;
            }

            const newNode = new SkipListNode(value, newLevel);

            for (let i = 0; i <= newLevel; i++) {
                newNode.forward[i] = update[i].forward[i];
                update[i].forward[i] = newNode;
            }

            return true;
        }
        return false;
    }

}