import Promise from 'bluebird';
import assign from 'object-assign';

const _callbacks = [];
let _promises    = [];

const Dispatcher = function() {};
Dispatcher.prototype = assign({}, Dispatcher.protoype, {
  /**
   * Register a callback
   * @param {function} callback : the callback to be registered
   * @return {number} index of the callback with the array
   */
  register: (callback) => {
    _callbacks.push(callback);
    return _callbacks.length - 1;
  },
  /**
   * Dispatch that event yo
   * @param {object} data : data from action
   */
   dispatch: (data) => {
     const resolves = [];
     const rejects  = [];
     // Generate promises array to watch
     _promises = _callbacks.map((func, i) => {
       return new Promise((res, rej) => {
         resolves[i] = res;
         rejects[i]  = rej;
       });
     });
     // Loop through callbacks and resolve their promises
     _callbacks.forEach((func, i) => {
       Promise.resolve(func(data))
         .then(() => {
           resolves[i](data);
         })
         .catch(() => {
           rejects[i](new Error('Dispatcher callback unsuccessful'));
         });
     });
     _promises = [];
   },
});

export default Dispatcher;
