class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const node = new this.Node({ element: element, prev: this._sentinel, next: this._head()});
    this._head().prev = node;
    this._sentinel.next = node;  // reassign head
    return node;
  }

  insertTail(element) {
    let node = new this.Node({ element: element, prev: this._tail(), next: this._sentinel});
    this._tail().next = node;
    this._sentinel.prev = node; // reassign tail
    return node;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node instanceof DLLNode) {
      return node.remove();
    }
  }

  forEach(callback) {
    let index = 0;
    let node = this._head();
    while (node != this._sentinel) {
      callback(node.element, index, this);
      index += 1;
      node = node.next;
    }
  }

  count() {
    let count = 0;
    this.forEach((elem) => {
      count += 1;
    })
    return count;
  }
}

export default DoublyLinkedList;
