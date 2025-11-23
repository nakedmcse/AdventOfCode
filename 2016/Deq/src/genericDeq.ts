// Generic Double Ended Queue
class ListNode<T> {
    public next: ListNode<T> | null = null;
    public prev: ListNode<T> | null = null;
    public constructor(public value: T) {}
}

class Deq<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    public size: number = 0;

    public constructor(init: T[]) {
        if (init.length === 0) {
            return;
        }
        for (let i = 0, l = init.length; i < l; ++i) {
            this.push(init[i]);
        }
    }

    public push(item: T) {
        const newNode = new ListNode(item);
        if (!this.head) {
            this.head = newNode;
            this.size = 1;
            this.tail = newNode;
        }
        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            this.size++;
        }
    }

    public pop(): T | null {
        if (!this.tail) return null;
        const retval = this.tail.value;
        this.tail = this.tail.prev;
        this.size--;
        return retval;
    }

    public unshift(item: T) {
        const newNode = new ListNode(item);
        if (!this.head) {
            this.head = newNode;
            this.size = 1;
            this.tail = newNode;
        }
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    public shift(): T | null {
        if (!this.head) return null;
        const retval = this.head.value;
        this.head = this.head.next;
        this.size--;
        return retval;
    }

}

async function main() {
    const PushTestArray:number[] = [];
    const PushTestDeq:Deq<number> = new Deq<number>([]);

    // Push
    console.time('PushArray');
    for (let i = 0; i < 100_000; i++) {
        PushTestArray.push(i);
    }
    console.timeEnd('PushArray');
    console.time('PushDeq');
    for (let i = 0; i < 100_000; i++) {
        PushTestDeq.push(i);
    }
    console.timeEnd('PushDeq');

    // Pop
    console.time('PopArray');
    for (let i = 0; i < 100_000; i++) {
        PushTestArray.pop();
    }
    console.timeEnd('PopArray');
    console.time('PopDeq');
    for (let i = 0; i < 100_000; i++) {
        PushTestDeq.pop();
    }
    console.timeEnd('PopDeq');

    // Unshift 3M
    console.time('UnshiftArray');
    for (let i = 0; i < 100_000; i++) {
        PushTestArray.unshift(i);
    }
    console.timeEnd('UnshiftArray');
    console.time('UnshiftDeq');
    for (let i = 0; i < 100_000; i++) {
        PushTestDeq.unshift(i);
    }
    console.timeEnd('UnshiftDeq');

    // Shift
    console.time('ShiftArray');
    for (let i = 0; i < 100_000; i++) {
        PushTestArray.shift();
    }
    console.timeEnd('ShiftArray');
    console.time('ShiftDeq');
    for (let i = 0; i < 100_000; i++) {
        PushTestDeq.shift();
    }
    console.timeEnd('ShiftDeq');
}

main();