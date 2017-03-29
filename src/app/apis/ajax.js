import {jquery} from 'vendor';

export default {

  get: get

}

function get() {
  let args = arguments
  return new Promise(function(resolve, reject) {
    jquery.get(...args)
      .done((data) => {
        resolve(data)
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        reject(errorThrown)
      });
  });
}
