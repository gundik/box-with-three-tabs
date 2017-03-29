import { _ } from 'vendor';
import './style/app.less';
import dom from './apis/dom';
import {FileInfoLoaderModule} from './modules/file-info-loader';
import RssFeedsModule from './modules/rss-feeds';
import FlickrApiPresenterModule from './modules/flickr-api-presenter';

const TAB_ACTIVE_CSS_CLASS_NAME = 'ko--active';

const tabContainerElment = dom.getElements('#appContainer .ko-tabs__container');

const fileInfoLoaderElement = dom.getElement('#appContainer .ko-tabs__content-container .ko-app__file-info-loader');
const rssFeedsElement = dom.getElement('#appContainer .ko-tabs__content-container .ko-app__rss-feeds');
const flicrApiPresenterElement = dom.getElement('#appContainer .ko-tabs__content-container' +
  ' .ko-app__flickr-api-presenter');

const modules = {
  fileInfoLoader: new FileInfoLoaderModule(fileInfoLoaderElement),
  rssFeeds: new RssFeedsModule(rssFeedsElement),
  flickrApiPresenter: new FlickrApiPresenterModule(flicrApiPresenterElement)
};

initModuleTab(1, 'fileInfoLoader');
initModuleTab(2, 'rssFeeds');
initModuleTab(3, 'flickrApiPresenter');

loadModule(1, 'fileInfoLoader')();

function initModuleTab(tabNo, moduleKey) {
  const tabElement = dom.getElement(`.ko-tabs__item:nth-child(${tabNo})`, tabContainerElment);
  dom.attachEvent(tabElement, 'click', loadModule(tabNo, moduleKey));
}

function loadModule(tabNo, moduleKey) {
  return () => {
    _.forEach(dom.getElements('.ko-tabs__item', tabContainerElment), (element) => {
      dom.removeClass(element, TAB_ACTIVE_CSS_CLASS_NAME);
    });
    _.forEach(modules, (module) => {
      dom.hide(module.getElement());
    });

    const module = modules[moduleKey];
    dom.addClass(dom.getElements(`.ko-tabs__item:nth-child(${tabNo})`, tabContainerElment), TAB_ACTIVE_CSS_CLASS_NAME);
    dom.show(module.getElement());
    module.load();
  };
}

