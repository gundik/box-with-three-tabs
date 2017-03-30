import {_} from 'vendor';
import {Module} from '../../../apis/Module';
import ajax from '../../../apis/ajax';
import LogFileParser from '../model/LogFileParser';
import FileInfoLoaderModel from '../model/FileInfoLoaderModel';
import templateFunction from './file-info-loader.tpl';
import './file-info-loader.less';

const FILE_URL = 'http://localhost:9090/varnish.log';

export default class FileInfoLoaderModule extends Module {

  constructor(element) {
    super(element);
    _.bindAll(this, ['parseFile', 'showError', 'renderParsedData']);
    this.initEmptyModel();
  }

  initEmptyModel() {
    this.model = new FileInfoLoaderModel();
  }

  loadModule() {
    this.loadFileData();
  }

  loadFileData() {
    this.initEmptyModel();

    ajax.get({
      url: FILE_URL,
      contentType: 'text/plain',
      crossDomain: true
    })
      .then(this.parseFile)
      .then(this.renderParsedData)
      .catch(this.showError);
  }

  parseFile(data) {
    let self = this;
    return new Promise(function(resolve, reject) {
      try {
        let logFileEntries = LogFileParser.parse(data);
        self.model = FileInfoLoaderModel.createFromResult(logFileEntries);
        resolve();
      } catch (e) {
        let errorMessage = e ? e.message : '';
        reject(errorMessage);
      }
    });
  }

  showError() {
    this.model.isError = true;
    this.renderModule();
  }

  renderParsedData() {
    this.renderModule();
  }

  renderModule() {
    this.render(templateFunction, this.model);
    this.loaded();
  }

}
