import {_} from 'vendor';
import RssFeedEntryModel from './RssFeedEntryModel';

export default class RssFeedsModel {

  constructor(feedSources) {
    this.feedSources = feedSources;
    this.init();
  }

  init() {
    this.feedsData = {};
    this.feedsDataErrors = {};
  }

  addFeedData(source: string, data: Array<RssFeedEntryModel>) {
    this.feedsData[source] = data;
  }

  addFeedDataError(source: string, errorMessage: string) {
    this.feedsDataErrors[source] = errorMessage;
  }

  isReady() {
    let numberOfGatheredData = _.keys(this.feedsData).length + _.keys(this.feedsDataErrors).length;
    return numberOfGatheredData === this.feedSources.length;
  }

  clear() {
    this.init();
  }
}
