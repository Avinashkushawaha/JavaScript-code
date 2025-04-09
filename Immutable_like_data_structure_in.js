class ImmutableList {
    constructor(items = []) {

        this.items = [...items];
        Object.freeze(this.items);
        Object.freeze(this);
    }

    push(item) {
        return new ImmutableList([...this.items, item]);
    }

    pop() {
        return new ImmutableList(this.items.slice(0, -1));
    }

    map(fn) {
        return new ImmutableList(this.items.map(fn));
    }

    filter(fn) {
        return new ImmutableList(this.items.filter(fn));
    }

    get(index) {
        return this.items[index];
    }

    get size() {
        return this.items.length;
    }

    toArray() {
        return [...this.items];
    }
}

const list1 = new ImmutableList([1, 2, 3]);
const list2 = list1.push(4);
console.log(list1.toArray());
console.log(list2.toArray());
