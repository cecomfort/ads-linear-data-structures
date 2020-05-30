import DoublyLinkedList from './doubly_linked_list';

/**
 * Implementation of the Queue interface using a doubly-linked list
 */
class DLLQueue {
  /**
   * Create an empty queue
   */
  constructor() {
    this.storage = new DoublyLinkedList();
  }

  /**
   * Add an element to the back of the queue
   *
   * @param {any} element Data to track
   * @returns {ticket} Cancellation ticket
   */
  enqueue(element) {
    const ticket =  this.storage.insertTail(element);
    return ticket;
  }

  /**
   * Remove an element from the queue
   *
   * @param {ticket} ticket Cancellation ticket, as returned by `enqueue`
   * @returns Stored element
   */
  cancel(ticket) {
    return this.storage.remove(ticket);
  }

  /**
   * Remove the element at the front of the queue
   *
   * @returns Stored element
   */
  dequeue() {
    return this.storage.removeHead();
  }

  /**
   * How many elements are currently in the queue?
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
   * @param {DLLQueue} queue This queue
   */

  /**
   * Invoke a callback on each element in the queue, in insertion order
   *
   * @param {forEachCallback} callback Function to invoke
   */
  forEach(callback) {
    // let that = this;
    // this.storage.forEach(function(element, index){
    //   callback(element, index, that);
    // })

    this.storage.forEach((element, index) => {
      callback(element, index, this);
    })

  }

  /**
   * Turn the queue into a string of chars that could be saved to a file or sent over the network
   *
   * @returns string of serialized queue
   */
  serialize() {
    let queueElements = [];
    this.forEach(el => queueElements.push(el));
    return JSON.stringify(queueElements);
  }

  /**
   * Turn a string of chars into a queue
   *
   * @param {json} json The sting of chars we need to deserialize
   * @returns list of tickets of elements added to our queue
   */

  deserialize(json) {
    if (typeof json != 'string') {
      return;
    }
    let tickets = [];
    const stackElements = JSON.parse(json);
    if (typeof stackElements.forEach === "function") {
      stackElements.forEach(el => tickets.push(this.enqueue(el)));
      return tickets;
    }
  }
}

export default DLLQueue;
