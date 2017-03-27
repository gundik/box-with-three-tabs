import {_} from 'vendor';

export class LogFileEntry {

  constructor(hostName = '', requestedFilePath = '') {
    this.hostName = hostName;
    this.requestedFilePath = requestedFilePath;
    this.requestedFileName = _.last(this.requestedFilePath.split('/'));
  }

  isResourceRequest() {
    return this.requestedFileName && this.requestedFilePath && this.requestedFilePath !== '/';
  }
}
