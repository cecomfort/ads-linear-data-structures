import DLLQueue from '../dll_queue';

// Ideally add in queue.test.js
describe(DLLQueue, () => {
  let queue;
  beforeEach(() => {
    queue = new DLLQueue();
  });

  describe('serialize', () => {
    it('yields a json array in insertion order', () => {
      const elements = ['various', 'strings', 'to', 'serialize'];
      elements.forEach(el => queue.enqueue(el));

      const json = queue.serialize();
      expect(json).toBe(JSON.stringify(elements));
    });

    it('yields an empty json array if the queue is empty', () => {
      expect(queue.serialize()).toBe('[]')
    });

    it('does not modify the queue data structure', () => {
      const elements = ['various', 'strings', 'to', 'serialize'];
      elements.forEach(el => queue.enqueue(el));

      expect(queue.count()).toBe(4);

      queue.serialize();

      expect(queue.count()).toBe(4);
      queue.forEach((el, index) => {
        expect(el).toBe(elements[index]);
      })
    });

    it('skips canceled elements during iteration', () => {
      const elements = ['various', 'strings', 'to', 'serialize'];
      const tickets = [];
      elements.forEach(el => tickets.push(queue.enqueue(el)));

      queue.cancel(tickets[1]);
      const json = queue.serialize()
      const cb = jest.fn();
      queue.forEach(cb);

      expect(cb.mock.calls.length).toBe(elements.length - 1);
      expect(cb.mock.calls[0][0]).toBe('various');
      expect(cb.mock.calls[1][0]).toBe('to');
      expect(cb.mock.calls[2][0]).toBe('serialize');
    });
  })

  describe('deserialize', () => {
    it('yeilds a queue in insertion order given a json array', () => {
      const elements = ['various', 'strings', 'to', 'serialize'];
      const json = JSON.stringify(elements);
      queue.deserialize(json)

      expect(queue.count()).toBe(4);

      queue.forEach((el, index) => {
        expect(el).toBe(elements[index]);
      })
    });

    it('yeilds a queue with equivalent elements when serialized & deserialized', () => {
      const elements = ['various', 'strings', 'to', 'serialize'];
      elements.forEach(el => queue.enqueue(el));
      expect(queue.count()).toBe(4);

      const json = queue.serialize()

      let deserializedQueue = new DLLQueue();
      deserializedQueue.deserialize(json);
      expect(deserializedQueue.count()).toBe(4);

      queue.forEach((el, index) => {
        expect(el).toBe(elements[index]);
      })

      deserializedQueue.forEach((el, index) => {
        expect(el).toBe(elements[index]);
      })
    });

    it('does nothing if the input is invalid', () => {
      expect(queue.deserialize(undefined)).toBe(undefined);
    });

    it('yeilds an empty queue if given an empty json array', () => {
      const json = JSON.stringify('[]');
      queue.deserialize(json);
      expect(queue.count()).toBe(0);
    });
  })
});
