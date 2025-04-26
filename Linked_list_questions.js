class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    coonstructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    append(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    prepend(value) {
        const newNode = new ListNode(value);
        newNode.next = this.head;
        this.head = newNode;
        if (!this.tail) this.tail = newNode;
        this.length++;
    }
    delete(value) {
        if (!this.head) return;

        while (this.head && this.head.value === value) {
            this.head = this.head.next;
            this.length--;
        }

        let current = this.head;
        while (current && current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.length--;
            } else {
                current = current.next;
            }
        }
        if (this.tail.value === value) {
            this.tail = current;
        }
    }

    }
