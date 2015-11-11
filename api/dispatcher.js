import Promise from 'bluebird';
import assign from 'object-assign';

const _callbacks = [];

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
     // Generate promises array to watch
     _callbacks.map((func, i) => {
       return new Promise((res, rej) => {
         if(data)
           res(func(data);
         else
           rej('No data passed to callbacks');
       })
       .catch((error) => {
         throw new Error(error)
       });
     });
   },
});

export default Dispatcher;
