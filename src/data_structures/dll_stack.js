import DoublyLinkedList from './doubly_linked_list';

/**
 * Implementation of the Stack interface using a doubly-linked list
 */
class DLLStack {
  /**
   * Create an empty stack
   */
  constructor() {
    this.storage = new DoublyLinkedList();
  }

  /**
   * Add an element to the top of the stack
   *
   * @param {any} element Data to track
   * @returns {ticket} Cancellation ticket
   */
  push(element) {
    const ticket = this.storage.insertHead(element);
    return ticket;
  }

  /**
   * Remove an element from the stack
   *
   * @param {ticket} ticket Cancellation ticket, as returned by `push`
   * @returns Stored element
   */
  cancel(ticket) {
    return this.storage.remove(ticket);
  }

  /**
   * Remove the element at the top of the stack
   *
   * @returns Stored element
   */
  pop() {
    return this.storage.removeHead()
  }

  /**
   * How many elements are currently in the stack?
   *
   * @returns {number} Current count
   */
  count() {
    return this.storage.count();
  }

  /**
   * @callback forEachCallback
   * @param element The element stored at this position
   * @param {number} index The index of this element
   * @param {DLLStack} stack This stack
   */

  /**
   * Invoke a callback on each element in the stack, from top to bottom
   *
   *
   * @param {forEachCallback} callback Function to invoke
   */
  forEach(callback) {
    this.storage.forEach((element, index) => {callback(element, index, this)})
  }
}

export default DLLStack;
