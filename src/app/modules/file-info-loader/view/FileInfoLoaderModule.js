import {_} from 'vendor';
import {Module} from '../../../Module';
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
  }

  load() {
    this.loadFileData();
  }

  loadFileData() {
    ajax.get({
      url: FILE_URL,
      contentType : 'text/plain',
      crossDomain: true
    })
      .then(this.parseFile)
      .then(this.renderParsedData)
      .catch(this.showError);
  }

  parseFile(data) {
    return new Promise(function(resolve, reject) {
      try {
        let logFileEntries = LogFileParser.parse(data);
        let model = FileInfoLoaderModel.createFromResult(logFileEntries);
        resolve(model);
      } catch (e) {
        let errorMessage = e ? e.message : '';
        reject(errorMessage);
      }
    });
  }

  showError() {
    this.render(templateFunction, {isError: true});
  }

  renderParsedData(model: FileInfoLoaderModel) {
    this.render(templateFunction, model);
  }

}
