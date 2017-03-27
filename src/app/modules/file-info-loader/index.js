import {_} from 'vendor';
import {Module} from '../../Module';

export default class FileInfoLoaderModule extends Module {

  load() {
    this.renderContent(`Hello World! timestamp: ${_.now()}`);
  }

}
