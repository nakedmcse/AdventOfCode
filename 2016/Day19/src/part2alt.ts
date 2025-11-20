//2016 Day 19 Part 2 Alternate Approach
class Elf {
    public id: number;
    public next!: Elf;
    public prev!: Elf;
    public constructor(id: number) {
        this.id = id;
    }
}

function processRound(m: Elf) {
    let before = m.prev;
    let after = m.next;
    before.next = after;  // Remove middle node
    after.prev = before;
}

function buildCircularList(h: Elf, size: number) {
    let prev = h;
    for (let i = 2; i <= size; i++) {
        const node = new Elf(i);
        node.prev = prev;
        prev.next = node;
        prev = node;
    }
    prev.next = h;  // Make list circular
    h.prev = prev;
}

async function main() {
    const size = 3001330;
    const head = new Elf(1);
    buildCircularList(head, size);

    let current = head;
    // find middle pointer: floor(size / 2) ahead
    let mid = current;
    for (let i = 0; i < Math.floor(size / 2); i++) {
        mid = mid.next;
    }

    console.time('r');
    let remaining = size;
    while (remaining > 1) {
        const a = mid.next;
        processRound(mid);
        remaining--;
        current = current.next;   // Move to next elf
        mid = a;
        if (remaining % 2 === 0) {
            mid = mid.next;
        }
    }
    console.log(`Part 2 Winner: ${current.id}`);
    console.timeEnd('r');
}

main();