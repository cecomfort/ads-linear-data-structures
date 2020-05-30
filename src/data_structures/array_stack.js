class ArrayStack {
  constructor() {
    this.storage = [];
    this.head = 0;
    this.tail = 0;

    // Number of cancelled elements between head and tail
    this.cancelCount = 0;
  }

  push(element) {
    this.storage[this.tail] = element;
    const ticket = this.tail;
    this.tail += 1;
    return ticket;
  }

  // still has memory leak
  cancel(ticket) {
    const element = this.storage[ticket];
    if (element != undefined) {  // already canceled
      this.storage[ticket] = undefined;
      this.cancelCount += 1;
      return element;
    }
  }

  // no memory leak BUT causes issues if someone repeats the cancel operation with
  // the same ticket since tickets are now reused. Any good solution for this??
  pop() {
    // skip cancelled elements at the top of the stack
    while (this.head < this.tail && this.storage[this.tail - 1] === undefined) {
      this.tail -= 1;
      this.cancelCount -= 1;
    }

    if (this.head < this.tail) {
      let element = this.storage[this.tail - 1];
      this.storage[this.tail - 1] = undefined;
      this.tail -= 1;
      return element;
    }
  }

  count() {
    return this.tail - this.head - this.cancelCount;
  }

  forEach(callback) {
    let index = 0;
    for (let i = this.tail; i > this.head; i--) {
      if (this.storage[i - 1] === undefined) {
        continue;
      }
      callback(this.storage[i - 1], index, this);
      index += 1;
    }
  }
}

export default ArrayStack;
