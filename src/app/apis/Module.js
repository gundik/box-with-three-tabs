import {_} from 'vendor';
import dom from './dom';

// used for very simple caching mechanism
const CACHE_TIME_INTERVAL_MILLIS = 1 * 60 * 1000; // 1 minute

export class Module {

  constructor(element) {
    this.$moduleLoaderPromiseResolveFunction = null;
    this.$element = element;
    this.$lastDataReadTime = null;
  }

  getElement() {
    return this.$element;
  }

  load() {
    let self = this;
    return new Promise(function(resolve) {
      self.$moduleLoaderPromiseResolveFunction = resolve;
      self.unloadModule();
      self.loadModuleIfRequired();
    });
  }

  loadModuleIfRequired() {
    let now = _.now();
    let isDataInvalid = this.$lastDataReadTime == null || (this.$lastDataReadTime + CACHE_TIME_INTERVAL_MILLIS) < now;
    if (isDataInvalid) {
      this.$lastDataReadTime = now;
      this.loadModule();
    } else {
      this.renderModule();
      this.loaded();
    }
  }

  loadModule() {
    throw new Error('loadModule() should be implemented in child class');
  }

  loaded() {
    if (_.isFunction(this.$moduleLoaderPromiseResolveFunction)) {
      this.$moduleLoaderPromiseResolveFunction();
    }
  }

  unloadModule() {
    dom.setHtmlContent(this.$element, '');
  }

  renderModule() {
    throw new Error('load() should be implemented in child class');
  }

  renderContent(content: string) {
    dom.setHtmlContent(this.$element, content);
  }

  render(templateFunction, context) {
    let content = templateFunction(context);
    this.renderContent(content);
  }

}
