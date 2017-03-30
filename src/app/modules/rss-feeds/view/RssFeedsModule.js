import {_} from 'vendor';
import {Module} from '../../../apis/Module';
import ajax from '../../../apis/ajax';
import RssFormatParser from '../model/parsers/RssFormatParser';
import AtomFormatParser from '../model/parsers/AtomFormatParser';
import RssFeedSource from '../model/RssFeedSource';
import RssFeedsModel from '../model/RssFeedsModel';
import templateFunction from './rss-feeds.tpl';
import './rss-feeds.less';

const RSS_FEED_SOURCES = [
  new RssFeedSource('vg.no',
    'http://www.vg.no/rss/feed/?categories=1068,1069,1070&keywords=&limit=25&format=rss', RssFormatParser),
  new RssFeedSource('ArsTechnica', 'http://feeds.arstechnica.com/arstechnica/index?format=xml', RssFormatParser),
  new RssFeedSource('TheRegister', 'http://www.theregister.co.uk/headlines.atom', AtomFormatParser)
];

export default class RssFeedsModule extends Module {

  constructor(element) {
    super(element);
    _.bindAll(this, ['showError', 'processFeedData']);
    this.model = new RssFeedsModel(RSS_FEED_SOURCES);
  }

  loadModule() {
    this.model.clear();
    _.each(this.model.feedSources, (feedSource) => {
      this.loadRssData(feedSource);
    });
  }

  loadRssData(feedSource) {
    ajax.get({
      url: feedSource.getUrl(),
      accepts: {
        xml: 'application/rss+xml'
      },
      dataType: 'xml'
    })
      .then((data) => this.processFeedData(feedSource, data))
      .catch((error) => this.showError(feedSource, error));
  }

  showError(feedSource, error) {
    this.model.addFeedDataError(feedSource.key, error);
    this.renderRssDataWhenReady();
  }

  processFeedData(feedSource, data) {
    let results = feedSource.parse(data);
    this.model.addFeedData(feedSource.key, results);
    this.renderRssDataWhenReady();
  }

  renderRssDataWhenReady() {
    if (this.model.isReady()) {
      this.renderModule();
    }
  }

  renderModule() {
    let renderModel = this.prepareModelForRender();
    this.render(templateFunction, renderModel);
    this.loaded();
  }

  prepareModelForRender() {
    let viewModel = _(this.model.feedsData)
      .values()
      .flatten()
      .orderBy(['publicationDate'], ['desc'])
      .map((item) => item.toViewModel())
      .value();
    return viewModel;
  }
}
